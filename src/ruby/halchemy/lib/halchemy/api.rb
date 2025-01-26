# frozen_string_literal: true

require "cicphash"
require "httpx"
require "http_status_codes"

require_relative "requester"
require_relative "follower"
require_relative "error_handling"
require_relative "status_codes"
require_relative "resource"
require_relative "http_model"
require_relative "metadata"

module Halchemy
  # This is the Halchemy::Api class, that is the main class for interacting with HAL-based APIs
  class Api
    attr_accessor :base_url, :headers, :error_handling, :parameters_list_style

    def initialize(base_url, headers: {})
      @base_url = base_url
      configure

      @headers.merge!(headers)
    end

    def root
      using_endpoint("/", is_root: true)
    end

    def using_endpoint(target, is_root = false)
      if is_root
        ReadOnlyRequester.new(self, target)
      else
        Requester.new(self, target)
      end
    end

    # @param [Hash[string, string]] headers
    def add_headers(headers)
      @headers.merge!(headers)
    end

    # @param [Array[string] headers
    def remove_headers(header_keys)
      header_keys.map { |key| @headers.delete(key) }
    end

    def request(method, target, headers = nil, data = nil)
      url = build_url(target)

      request_headers = headers.nil? ? @headers : @headers.merge(headers)
      request = HttpModel::Request.new(method, url, data, request_headers)


      http = HTTPX.with(headers: request_headers)
      result = http.public_send(method, url, body: data)

      raise_for_errors(result)
      build_resource(request, result)
    end

    def follow(resource)
      Follower.new(self, resource)
    end

    def optimistic_concurrency_header(resource)
      etag = resource._halchemy.response.headers["Etag"] ? resource._halchemy.response.headers["Etag"] : resource[@etag_field]
      etag.nil? ? {} : { "If-Match" => etag }
    end

    private

    def configure
      @headers = CICPHash.new.merge!({
                                       "Authorization" => "Basic cm9vdDpwYXNzd29yZA==",
                                       "Content-type" => "application/json",
                                       "Accept" => "application/hal+json, application/json;q=0.9, */*;q=0.8"
                                     })
      @error_handling = ErrorHandling.new
      @parameters_list_style = "repeat_key"
      @etag_field = "_etag"
    end

    def build_url(target)
      if target.start_with?("http")
        target
      else
        [@base_url.chomp("/"), target.sub(%r{\A/+}, "")].join("/")
      end
    end

    def raise_for_errors(result)
      if @error_handling.raise_for_network_errors && result.error.instance_of?(StandardError)
        raise StandardError, result.error.message
      end

      if result.respond_to?(:status) && do_settings_include_status_code(@error_handling.raise_for_status_codes, result.status)
        raise StandardError, "status code matches #{@error_handling.raise_for_status_codes}"
      end
    end

    # @param [HttpModel::Request] request
    # @param [Object] result
    # @return [Halchemy::Resource | Halchemy::HalResource]
    def build_resource(request, result)
      # result.request.url, result.request.headers, result.request.body
      response = build_response(result)
      json = parse_body(result)

      resource = if json.nil?
                   Resource.new
                 elsif HalResource.hal?(json)
                   HalResource.new.merge! json
                 else
                   Resource.new.merge! json
                 end

      resource._halchemy = Metadata.new(request, response, result.error)

      resource
    end

    def parse_body(result)
      body = extract_body(result)
      return body if body.is_a?(Hash)

      begin
        json = JSON.parse(body) unless body.is_a?(Hash) || body.nil?
      rescue JSON::ParserError
        json = nil
      end
      json
    end

    def extract_body(result)
      begin
        body = result.json if result.respond_to?("json")
      rescue HTTPX::Error
        body = result.to_s # Return raw text if it fails
      end
      body
    end

    def build_response(result)
      status = result.respond_to?(:status) ? result.status : 0
      reason = status.positive? ? HTTPStatusCodes::MAP[status] : "Did not receive a response from the server"
      headers = result.headers if result.respond_to?(:headers)
      body = result.body if result.respond_to?(:body)

      HttpModel::Response.new(status, reason, headers, body)
    end

  end
end



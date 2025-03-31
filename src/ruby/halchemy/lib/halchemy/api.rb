# frozen_string_literal: true

require "cicphash"
require "httpx"
require "http_status_codes"

require_relative "configurator"
require_relative "error_handling"
require_relative "follower"
require_relative "http_model"
require_relative "metadata"
require_relative "requester"
require_relative "status_codes"
require_relative "resource"

module Halchemy
  # This is the Halchemy::Api class, that is the main class for interacting with HAL-based APIs
  class Api
    attr_accessor :base_url, :headers, :error_handling, :parameters_list_style

    def initialize(base_url = nil, headers: {})
      config = Configurator.new.config
      configure_base(config)
      configure_headers(config)
      configure_error_handling(config)

      @base_url = base_url unless base_url.nil?
      @headers.merge!(headers)
    end

    def home = using_endpoint("/", is_home: true)

    # root is deprecated and will be removed in an upcoming release, please use home instead
    def root = using_endpoint("/", is_home: true)

    def using_endpoint(target, is_home: false)
      if is_home
        ReadOnlyRequester.new(self, target)
      else
        Requester.new(self, target)
      end
    end

    # @param [Hash[String, string]] headers
    def add_headers(headers) = @headers.merge!(headers)

    # @param [Array[String] header_keys
    def remove_headers(header_keys)
      header_keys.each { |key| @headers.delete(key) }
    end

    def request(method, target, headers = nil, data = nil)
      url = build_url(target)

      request_headers = headers.nil? ? @headers : @headers.merge(headers)
      request = HttpModel::Request.new(method, url, data, request_headers)

      result = HTTPX.with(headers: request_headers).send(method, url, body: data)

      raise_for_errors(result)
      build_resource(request, result)
    end

    def follow(resource) = Follower.new(self, resource)

    def optimistic_concurrency_header(resource)
      etag = resource._halchemy.response.headers["Etag"] || resource[@etag_field]
      etag.nil? ? {} : { "If-Match" => etag }
    end

    private

    # @return [void]
    def configure_headers(config)
      @headers = CICPHash.new.merge!(config["headers"])
    end

    def configure_error_handling(config)
      @error_handling = ErrorHandling.new
      @error_handling.raise_for_status_codes = config["error_handling"]["raise_for_status_codes"]
      @error_handling.raise_for_network_errors = config["error_handling"]["raise_for_network_errors"]
    end

    def configure_base(config)
      @base_url = config["halchemy"]["base_url"] if @base_url.nil?
      @parameters_list_style = config["halchemy"]["parameters_list_style"]
      @etag_field = config["halchemy"]["etag_field"]
    end

    def build_url(target)
      return target if target.start_with?("http")

      [@base_url.chomp("/"), target.sub(%r{\A/+}, "")].join("/")
    end

    def raise_for_errors(result)
      if @error_handling.raise_for_network_errors && result.error.instance_of?(StandardError)
        raise HttpError, result.error.message
      end

      return unless result.respond_to?(:status)
      return unless settings_include_status_code?(@error_handling.raise_for_status_codes, result.status)

      raise HttpError, "Status code #{result.status} matches \"#{@error_handling.raise_for_status_codes}\""
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
                   HalResource.from_hash json
                 else
                   Resource.new.merge! json
                 end

      resource.tap { |r| r._halchemy = Metadata.new(request, response, result.error) }
    end

    def parse_body(result)
      body = extract_body(result)
      return body if body.is_a?(Hash)

      begin
        json = JSON.parse(body.to_s) unless body.is_a?(Hash) || body.nil?
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

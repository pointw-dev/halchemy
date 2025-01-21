# frozen_string_literal: true

require "httpx"
require "cicphash"
require_relative "read_only_requester"
require_relative "requester"
require_relative "error_handling"

module Halchemy
  # This is the Halchemy::Api class, that is the main class for interacting with HAL-based APIs
  class Api
    attr_accessor :base_url, :headers, :error_handling

    def initialize(base_url, headers: {})
      @base_url = base_url
      @headers = CICPHash.new
      {
        "Authorization" => "Basic cm9vdDpwYXNzd29yZA==",
        "Content-type" => "application/json",
        "Accept" => "application/hal+json, application/json;q=0.9, */*;q=0.8"
      }.each { |key, value| @headers[key] = value }
      @headers.merge!(headers)
      @error_handling = ErrorHandling.new
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

    def request(method, target, data = nil, headers = nil)
      if target.start_with?("http")
        url = target
      else
        url = URI(@base_url)
        url.path = [url.path.chomp("/"), target.sub(%r{^/}, "")].join("/")
      end
      http = HTTPX.with(headers: @headers)
      result = http.send(method, url.to_s)

      p @error_handling
      if @error_handling.raise_for_network_errors && result.error.instance_of?(StandardError)
        raise StandardError, result.error.message
      end

      result
    end
  end
end

# frozen_string_literal: true

require "uri_template"

module Halchemy
  # The results of a Follower#to is a Requester.  In the case of a GET for the home resource, the Requester is Read Only
  # Otherwise it is a full Requester.  Both requester types share much in common.  This is defined in BaseRequester
  class BaseRequester
    LIST_STYLE_HANDLERS = {
      "repeat_key" => ->(key, array) { array.map { |item| [key, URI.encode_www_form_component(item.to_s)] } },
      "bracket" => ->(key, array) { array.map { |item| ["#{key}[]", URI.encode_www_form_component(item.to_s)] } },
      "index" => lambda { |key, array|
        array.each_with_index.map do |item, index|
          ["#{key}[#{index}]", URI.encode_www_form_component(item.to_s)]
        end
      },
      "comma" => ->(key, array) { [[key, array.map { |item| URI.encode_www_form_component(item.to_s) }.join(",")]] },
      "pipe" => ->(key, array) { [[key, array.map { |item| URI.encode_www_form_component(item.to_s) }.join("|")]] }
    }.freeze

    # @param [Halchemy::Api] api
    # @param [String | Tuple[HalResource, String]] target
    # @return [void]
    def initialize(api, target)
      @api = api
      @_data = nil
      @_headers = CICPHash.new
      @_template_values = {}
      @_parameters = {}

      process_target(target)
    end

    def url
      rtn = @_url

      if @_is_templated
        tpl = URITemplate.new(rtn)
        rtn = tpl.expand(@_template_values)
      end

      rtn = add_parameters_to_url rtn unless @_parameters.empty?
      rtn
    end

    # @param [Hash] headers
    def with_headers(headers)
      @_headers.merge! headers
      self
    end

    # @param [Hash] values
    def with_template_values(values)
      @_template_values.merge! values
      self
    end

    # @param [Hash] parameters
    def with_parameters(parameters)
      @_parameters.merge! parameters
      self
    end

    def request(method)
      data = @_data.is_a?(Hash) ? @_data.to_json : @_data
      @api.request(method, url, @_headers, data)
    end

    private

    # @param [String | Tuple[HalResource, String]] target
    # @return [void]
    def process_target(target)
      if target.is_a?(String)
        @_url = target
      else
        resource, rel = target
        @_url = resource["_links"][rel]["href"]
        @_is_templated = resource["_links"][rel].fetch("templated", false)
        @resource = resource
      end
    end

    # Handle list-style parameters based on the list style configuration
    def handle_list(key, array)
      handler = LIST_STYLE_HANDLERS[@api.parameters_list_style]
      raise ArgumentError, "Unsupported parameters list style: #{@api.parameters_list_style}" unless handler

      handler.call(key, array)
    end

    # Recursively flatten parameters into a list of key-value pairs
    def flatten_parameters(prefix, parameters)
      flattened = []

      parameters.each do |key, value|
        full_key = prefix.nil? || prefix.empty? ? key.to_s : "#{prefix}.#{key}"

        case value
        when nil
          flattened << [full_key, nil]
        when Array
          flattened.concat(handle_list(full_key, value))
        when Hash
          flattened.concat(flatten_parameters(full_key, value))
        when TrueClass, FalseClass
          flattened << [full_key, value.to_s]
        else
          flattened << [full_key, URI.encode_www_form_component(value.to_s)]
        end
      end

      flattened
    end

    # Add the flattened parameters to the URL as a query string
    def add_parameters_to_url(url)
      query_params = flatten_parameters(nil, @_parameters)
      query_string = query_params.map { |key, value| value.nil? ? key : "#{key}=#{value}" }.join("&")

      if url.include?("?")
        "#{url}&#{query_string}"
      else
        "#{url}?#{query_string}"
      end
    end
  end

  # The result of GET on the home URL is a ReadOnlyRequester, i.e. only
  # GET, HEAD, and OPTIONS are permitted
  class ReadOnlyRequester < BaseRequester
    def get
      request :get
    end

    def head
      request :head
    end

    def options
      request :options
    end
  end

  # This provides a full-suite of HTTP methods, with handling of payload conversion and
  # optimistic concurrency.
  class Requester < ReadOnlyRequester
    def post(data = nil, content_type = nil)
      prepare_payload(content_type, data)
      request :post
    end

    def put(data = nil, content_type = nil)
      prepare_payload(content_type, data)
      prepare_modify_header
      request :put
    end

    def patch(data = nil, content_type = nil)
      prepare_payload(content_type, data)
      prepare_modify_header
      request :patch
    end

    def delete
      prepare_modify_header
      request :delete
    end

    private

    def prepare_payload(content_type, data)
      @_data = data
      @_headers["Content-Type"] = content_type unless content_type.nil?
    end

    def prepare_modify_header
      @_headers.merge!(@api.optimistic_concurrency_header(@resource)) if @resource.is_a?(HalResource)
    end
  end
end

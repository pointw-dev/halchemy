# frozen_string_literal: true
require "uri_template"

module Halchemy
  class BaseRequester
    def initialize(api, target)
      @api = api
      @_data = nil
      @_headers = CICPHash.new
      @_template_values = {}
      @_parameters = {}

      if target.instance_of?(String)
        @_url = target
        return
      end

      resource, rel = target
      @_url = resource["_links"][rel]["href"]
      @_is_templated = resource["_links"][rel].fetch("templated", false)
      @resource = resource
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

    # Handle list-style parameters based on the list style configuration
    def handle_list(key, array)
      list_style = @api.parameters_list_style
      case list_style
      when "repeat_key"
        array.map { |item| [key, URI.encode_www_form_component(item.to_s)] }
      when "bracket"
        array.map { |item| ["#{key}[]", URI.encode_www_form_component(item.to_s)] }
      when "index"
        array.each_with_index.map { |item, index| ["#{key}[#{index}]", URI.encode_www_form_component(item.to_s)] }
      when "comma"
        [[key, array.map { |item| URI.encode_www_form_component(item.to_s) }.join(",")]]
      when "pipe"
        [[key, array.map { |item| URI.encode_www_form_component(item.to_s) }.join("|")]]
      else
        raise ArgumentError, "Unsupported parameters list style: #{list_style}"
      end
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

      query_string_parts = query_params.map do |key, value|
        value.nil? ? key : "#{key}=#{value}"
      end

      query_string = query_string_parts.join("&")

      if url.include?("?") && !url.end_with?("?")
        "#{url}&#{query_string}"
      else
        "#{url}#{url.end_with?("?") ? "" : "?"}#{query_string}"
      end
    end

  end

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

  class Requester < ReadOnlyRequester
    def post(data = nil, content_type = nil)
      prepare_payload(content_type, data)
      request :post
    end

    def put(data = nil, content_type = nil)
      prepare_payload(content_type, data)
      @_headers.merge!(@api.optimistic_concurrency_header(@resource)) if @resource.is_a?(HalResource)
      request :put
    end

    def patch(data = nil, content_type = nil)
      prepare_payload(content_type, data)
      request :patch
    end

    def delete
      request :delete
    end


    private

    def prepare_payload(content_type, data)
      @_data = data
      @_headers["Content-Type"] = content_type unless content_type.nil?
    end

  end
end

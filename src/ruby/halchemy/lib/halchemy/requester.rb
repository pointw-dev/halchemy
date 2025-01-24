# frozen_string_literal: true

module Halchemy
  class BaseRequester
    def initialize(api, target)
      @api = api
      @_data = nil
      @_headers = CICPHash.new

      if target.instance_of?(String)
        @_url = target
        return
      end

      resource, rel = target
      @_url = resource['_links'][rel]['href']
      @resource = resource
    end

    def url
      @_url
    end

    def request(method)
      data = @_data.is_a?(Hash) ? @_data.to_json : @_data
      @api.request(method, url, @_headers, data)
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
      @_data = data
      @_headers["Content-Type"] = content_type if content_type
      request :post
    end

  end
end

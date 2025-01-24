# frozen_string_literal: true

module Halchemy
  class BaseRequester
    def initialize(api, target)
      @api = api
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
      @api.request(method, url)
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
  end
end

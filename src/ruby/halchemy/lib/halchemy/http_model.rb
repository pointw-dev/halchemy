# frozen_string_literal: true

module Halchemy
  module HttpModel
    # frozen_string_literal: true

    class Request
      attr_accessor :method, :url, :headers, :body

      def initialize(method, url, headers, body = nil)
        @method = method
        @url = url
        @headers = headers
        @body = body
      end
    end

    class Response
      attr_accessor :status, :reason, :headers, :body, :error

      def initialize(status_code, reason, headers, body = nil)
        @status_code = status_code
        @reason = reason
        @headers = headers
        @body = body
        @error = nil
      end
    end

  end
end

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

      def to_s
        "#{@method.to_s.upcase} #{@url}"
      end
    end

    class Response
      attr_accessor :status_code, :reason, :headers, :body, :error

      def initialize(status_code, reason, headers, body = nil)
        @status_code = status_code
        @reason = reason
        @headers = headers
        @body = body
      end

      def to_s
        "#{@status_code} #{@reason}"
      end
    end

  end
end

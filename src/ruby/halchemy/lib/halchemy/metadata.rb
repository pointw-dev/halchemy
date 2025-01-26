# frozen_string_literal: true

module Halchemy
  # Allows a Resource to act first as a Hash, by keeping all HTTP related info in resource._halchemy
  class Metadata
    attr_reader :request, :response, :error

    def initialize(request, response, error)
      @request = request
      @response = response
      @error = error
    end

    def raise_for_status_codes(settings = ">399")
      return unless settings_include_status_code?(settings, @response.status_code)

      raise HttpError, "Status code #{@response.status_code} matches \"#{settings}\""
    end
  end
end

# frozen_string_literal: true

module Halchemy
  class Metadata
    attr_reader :request, :response, :error

    def initialize(request, response, error)
      @request = request
      @response = response
      @error = error
    end

    def raise_for_status_codes(settings = ">399")
      return unless do_settings_include_status_code(settings, @response.status_code)

      raise StandardError # TODO: make it HTTP Error, with details
    end
  end
end

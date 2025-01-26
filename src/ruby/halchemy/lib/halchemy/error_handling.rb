# frozen_string_literal: true

module Halchemy
  # A container for the settings which govern how errors are handled.
  class ErrorHandling
    attr_accessor :raise_for_network_errors, :raise_for_status_codes

    def initialize
      @raise_for_network_errors = true
      @raise_for_status_codes = nil
    end
  end
end

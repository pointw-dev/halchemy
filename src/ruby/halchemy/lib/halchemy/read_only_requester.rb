# frozen_string_literal: true

require_relative "base_requester"

module Halchemy
  class ReadOnlyRequester < BaseRequester
    def get
      request :get
    end
  end
end

# frozen_string_literal: true

module Halchemy
  class BaseRequester
    def initialize(api, target)
      @api = api
      @target = target
    end

    def request(method)
      @api.request(method, @target)
    end
  end
end

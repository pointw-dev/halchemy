# frozen_string_literal: true

module Halchemy
  class Follower
    def initialize(api, resource)
      @api = api
      @resource = resource
    end

    # @param [string] rel
    def to(rel)
      unless @resource["_links"].key?(rel)
        raise KeyError, "#{@resource.class} does not have a link relation named #{rel}"
      end

      Requester.new(@api, [@resource, rel])
    end
  end
end

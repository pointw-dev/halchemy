# frozen_string_literal: true

module Halchemy
  # Provides the way to navigate from a resource by following to a link relation
  class Follower
    def initialize(api, resource)
      @api = api
      @resource = resource
    end

    # @param [String] rel
    def to(rel)
      unless @resource["_links"].key?(rel)
        raise KeyError, "#{@resource.class} does not have a link relation named #{rel}"
      end

      Requester.new(@api, [@resource, rel])
    end
  end
end

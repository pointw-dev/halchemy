# frozen_string_literal: true

module Halchemy
  # The Resource class extends a Hash to include a metadata object containing details
  # about the HTTP request and response.  This lets the metadata stay "out of the way" allowing
  # the client code to use the result of a request directly as a resource without losing access
  # to the request details, response details, and any error details.
  class Resource < Hash
    attr_accessor :_halchemy

    def to_s
      if keys.length > 0
        self.to_json
      else
        _halchemy.response.body.to_s
      end
    end
  end

  # The HalResource, like Resource, is also a Hash that adds functionality to work with the
  # link relations in a HAL Resource.
  class HalResource < Resource
    # @param [Hash] hash
    # @return [boolean]
    def self.hal?(hash)
      return false unless hash.is_a?(Hash)

      links = hash["_links"]
      embedded = hash["_embedded"]

      return false unless links.is_a?(Hash)
      return false unless links["self"].is_a?(Hash)
      return false unless links["self"]["href"].is_a?(String)
      return false if embedded && !embedded.is_a?(Hash)

      true
    end

    def links
      self["_links"].keys ||= []
    end
  end
end

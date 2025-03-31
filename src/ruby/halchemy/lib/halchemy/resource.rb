# frozen_string_literal: true

module Halchemy
  module Multiplicity
    ONE = :one
    MANY = :many
  end

  # The Resource class extends a Hash to include a metadata object containing details
  # about the HTTP request and response.  This lets the metadata stay "out of the way" allowing
  # the client code to use the result of a request directly as a resource without losing access
  # to the request details, response details, and any error details.
  class Resource < Hash
    attr_accessor :_halchemy

    def to_s
      if !keys.empty?
        to_json
      else
        _halchemy&.response&.body.to_s
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

    def initialize(*args)
      super
      raise ArgumentError, "Not a WELL-formed HAL resource" unless HalResource.hal?(self)
    end

    def self.from_hash(json)
      obj = allocate
      obj.merge!(json) if json.is_a?(Hash)
      raise ArgumentError, "Not a well-FORMED HAL resource" unless HalResource.hal?(obj)

      obj
    end

    def to_s
      "<HalResource href='#{dig("_links", "self", "href")}' >"
    end

    def rel?(rel_name)
      self["_links"].key?(rel_name)
    end

    def links
      self["_links"].keys ||= []
    end

    def embedded_rel?(rel_name)
      self["_embedded"].key?(rel_name)
    end

    def embedded_rels
      self["_embedded"]&.keys || []
    end

    def raise_for_syntax_error(field)
      unless keys.include?(field)
        raise KeyError, "Field '#{field}' does not exist, so cannot be iterated as a collection"
      end
      raise TypeError, "Field '#{field}' is not a collection" unless self[field].is_a?(Array)
    end

    def collection(field)
      raise_for_syntax_error(field)

      Enumerator.new do |y|
        self[field].each do |item|
          unless Halchemy::HalResource.hal?(item)
            raise TypeError, "The '#{field}' collection contains non-HAL formatted objects"
          end

          y.yield Halchemy::HalResource.from_hash(item)
        end
      end
    end

    # @param [string] rel_name
    # @param [Symbol, nil] expect
    # @return [Halchemy::HalResource, Array<Halchemy::HalResource>]
    def embedded(rel_name, expect: nil)
      val = dig("_embedded", rel_name)
      raise KeyError, "No embedded resource found for rel '#{rel_name}'" if val.nil?

      if expect == Multiplicity::MANY
        raise TypeError, "Expected array for rel '#{rel_name}', got #{val.class}" unless val.is_a?(Array)

        return val.map { |item| HalResource.from_hash(item) }
      elsif expect == Multiplicity::ONE
        raise TypeError, "Expected object for rel '#{rel_name}', got #{val.class}" unless val.is_a?(Hash)

        return HalResource.from_hash(val)
      end

      if val.is_a?(Array)
        val.map { |item| HalResource.from_hash(item) }
      elsif val.is_a?(Hash)
        HalResource.from_hash(val)
      else
        raise TypeError, "Invalid embedded value for rel '#{rel_name}': expected object or array, got #{val.class}"
      end
    end

    def embedded_many(rel_name)
      result = embedded(rel_name, expect: Multiplicity::MANY)
      raise TypeError, "Expected array for embedded '#{rel_name}', got #{result.class}" unless result.is_a?(Array)

      result
    end

    def embedded_one(rel_name)
      result = embedded(rel_name, expect: Multiplicity::ONE)
      raise TypeError, "Expected object for rel '#{rel_name}', got #{result.class}" unless result.is_a?(Hash)

      result
    end
  end
end

# frozen_string_literal: true

private

PATTERNS = [
  [/^(\d+)-(\d+)$/, ->(m) { { type: :range, start: m[1].to_i, end: m[2].to_i } }],
  [/^>=(\d+)$/, ->(m) { { type: :gte, value: m[1].to_i } }],
  [/^<=(\d+)$/, ->(m) { { type: :lte, value: m[1].to_i } }],
  [/^>(\d+)$/, ->(m) { { type: :gt, value: m[1].to_i } }],
  [/^<(\d+)$/, ->(m) { { type: :lt, value: m[1].to_i } }],
  [/^(\d+)$/, ->(m) { { type: :eq, value: m[1].to_i } }]
].freeze

MATCHERS = {
  range: ->(condition, status_code) { (condition[:start]..condition[:end]).include?(status_code) },
  gt: ->(condition, status_code) { status_code > condition[:value] },
  lt: ->(condition, status_code) { status_code < condition[:value] },
  gte: ->(condition, status_code) { status_code >= condition[:value] },
  lte: ->(condition, status_code) { status_code <= condition[:value] },
  eq: ->(condition, status_code) { status_code == condition[:value] }
}.freeze

def settings_include_status_code?(settings, status_code)
  return false if settings.nil? || settings.strip.empty?

  parse_status_code_settings(settings).any? do |condition|
    match_condition?(condition, status_code)
  end
end

# @return [Array[String]]
# @param [String] settings
def parse_status_code_settings(settings)
  settings.split(/,|\s+/).each_with_object([]) do |part, conditions|
    part.strip!
    conditions << parse_condition(part)
  end.compact
end

# Parses an individual condition string into a hash.
# @param [String] part The individual condition string.
# @return [Hash, nil] The parsed condition hash or nil for blank parts.
def parse_condition(part)
  return nil if part.match?(/^\s*$/)

  PATTERNS.each do |pattern, handler|
    if (match = part.match(pattern))
      return handler.call(match)
    end
  end

  raise SyntaxError, "Invalid status code settings string: '#{part}'"
end

# @param [Array[Hash]] condition
# @param [Integer] status_code
# @return [bool]
def match_condition?(condition, status_code)
  MATCHERS.fetch(condition[:type], ->(_, _) { false }).call(condition, status_code)
end

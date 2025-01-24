# frozen_string_literal: true

private

def do_settings_include_status_code(settings, status_code)
  return false if settings.nil? || settings.strip.empty?

  conditions = parse_status_code_setting(settings)
  conditions.any? { |condition| match_condition?(condition, status_code) }
end

# @return [Array[string]]
def parse_status_code_setting(settings)
  # Parses a status code setting string into an array of conditions.
  #
  # Returns an array of hashes in the form:
  # - { type: :range, start: start, end: end } for range conditions
  # - { type: :gt, value: value } for greater-than conditions
  # - { type: :lt, value: value } for less-than conditions
  # - { type: :gte, value: value } for greater-than-or-equal conditions
  # - { type: :lte, value: value } for less-than-or-equal conditions
  # - { type: :eq, value: value } for exact match conditions

  conditions = []
  settings.split(/,|\s+/).each do |part|
    part.strip!
    case part
    when /^(\d+)-(\d+)$/
      conditions << { type: :range, start: $1.to_i, end: $2.to_i }
    when /^>=(\d+)$/
      conditions << { type: :gte, value: $1.to_i }
    when /^<=(\d+)$/
      conditions << { type: :lte, value: $1.to_i }
    when /^>(\d+)$/
      conditions << { type: :gt, value: $1.to_i }
    when /^<(\d+)$/
      conditions << { type: :lt, value: $1.to_i }
    when /^(\d+)$/
      conditions << { type: :eq, value: $1.to_i }
    end
  end
  conditions
end

def match_condition?(condition, status_code)
  case condition[:type]
  when :range
    status_code >= condition[:start] && status_code <= condition[:end]
  when :gt
    status_code > condition[:value]
  when :lt
    status_code < condition[:value]
  when :gte
    status_code >= condition[:value]
  when :lte
    status_code <= condition[:value]
  when :eq
    status_code == condition[:value]
  else
    false
  end
end

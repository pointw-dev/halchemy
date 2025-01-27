# frozen_string_literal: true

require "iniparse"
require "pathname"

# provides default configuration values, which can be overridden by a config file in the home directory
# or the project directory
class Configurator
  DEFAULT_CONFIG = {
    "halchemy" => {
      "base_url" => "http://localhost:2112",
      "parameters_list_style" => "repeat_key",
      "etag_field" => "_etag"
    },
    "headers" => {
      "Content-type" => "application/json",
      "Accept" => "application/hal+json, application/json;q=0.9, */*;q=0.8",
      "Authorization" => "Basic cm9vdDpwYXNzd29yZA==" # root:password
    },
    "error_handling" => {
      "raise_for_network_errors" => true,
      "raise_for_status_codes" => nil
    }
  }.freeze

  attr_reader :config

  def initialize(filename = ".halchemy")
    @filename = filename
    @config = DEFAULT_CONFIG.dup
    load_config
  end

  private

  # Find the project root by searching for known indicators
  def find_project_root(current_dir = nil)
    current_dir ||= determine_current_dir
    return nil unless current_dir

    root_indicators = root_indicator_files

    traverse_to_root(current_dir, root_indicators)
  end

  def determine_current_dir
    caller_location = caller(1..1)&.first
    file_path = caller_location&.split(":")&.first
    file_path ? File.expand_path(File.dirname(file_path)) : nil
  end

  def root_indicator_files
    %w[.git Gemfile Gemfile.lock config.ru Rakefile .project .idea .vscode .halchemy]
  end

  def traverse_to_root(current_dir, root_indicators)
    while current_dir != File.dirname(current_dir) # Stop at filesystem root
      return current_dir if root_indicators.any? { |indicator| File.exist?(File.join(current_dir, indicator)) }

      current_dir = File.dirname(current_dir)
    end
    nil
  end

  # Parse an INI file into a nested hash
  def ini_to_hash(file_path)
    return {} unless File.exist?(file_path)

    IniParse.parse(File.read(file_path)).to_h
  rescue StandardError => e
    warn "Failed to parse INI file: #{file_path}\nError: #{e.message}"
    {}
  end

  # Load configuration from both the project root and home directory
  def load_config
    home_config = ini_to_hash(File.join(Dir.home, @filename))
    merge_config(home_config)

    project_root = find_project_root
    return unless project_root

    project_config = ini_to_hash(File.join(project_root, @filename))
    merge_config(project_config)
  end

  # Deep merge configurations
  def merge_config(new_config)
    @config.each_key do |section|
      next unless new_config[section]

      @config[section].merge!(new_config[section])
    end
  end
end

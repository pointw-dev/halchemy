# frozen_string_literal: true

BASE_URL = "http://example.org"

Before do
  WebMock::HttpLibAdapters::HttpxAdapter.enable!
  WebMock::Config.instance.query_values_notation = :flat_array
  WebMock.disable_net_connect!
  stub_request(:any, /.*/)
end

After do
  WebMock.reset!
end


ROOT_JSON = {
  _links: {
    self: { href: "/" },
    resource1: { href: "/path/to/resource1" },
    resource2: { href: "/path/to/resource2" },
  }
}.to_json

RESOURCE_JSON = {
  data: "some resource",
  _links: {
    self: { href: "/path/to/resource1" }
  },
  _etag: "from field"
}.to_json



Given(/^a HAL resource$/) do
  stub_for_hal_resource_scenarios
  @api = Halchemy::Api.new BASE_URL
  @root_resource = @api.root.get
end

# @return [void]
def stub_for_hal_resource_scenarios
  headers = {
    "Content-Type" => %w[application/json charset=UTF-8],
    "Etag" => "from header"
  }

  stub_request(:get, BASE_URL).to_return(body: ROOT_JSON, headers: headers)
  stub_request(:get, %r{\A#{BASE_URL}/path(/.*)?\z}).to_return(status: 200, body: RESOURCE_JSON, headers: headers)
end

def last_request
  executed_requests = WebMock::RequestRegistry.instance.requested_signatures.hash

  raise "No requests have been made" if executed_requests.empty?

  executed_requests.keys.last
end

def normalize_path(url)
  uri = URI.parse(url)

  # Sort query parameters
  if uri.query
    query_params = URI.decode_www_form(uri.query).sort
    uri.query = URI.encode_www_form(query_params)
  end

  # Return normalized path with query
  uri.path + (uri.query ? "?#{uri.query}" : "")
end

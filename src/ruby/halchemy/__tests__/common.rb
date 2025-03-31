# frozen_string_literal: true

BASE_URL = "http://example.org"

READ_METHODS = %i[get head options].freeze
MODIFY_METHODS = %i[put patch delete].freeze
PAYLOAD_METHODS = %i[post put patch].freeze
ALL_METHODS = READ_METHODS + MODIFY_METHODS + %i[post]


Before do
  WebMock::HttpLibAdapters::HttpxAdapter.enable!
  WebMock::Config.instance.query_values_notation = :flat_array
  WebMock.disable_net_connect!
  stub_request(:any, /.*/)
end

After do
  WebMock.reset!
end


HOME_JSON = {
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
  @home_resource = @api.home.get
end

# @return [void]
def stub_for_hal_resource_scenarios
  headers = {
    "Content-Type" => %w[application/json charset=UTF-8],
    "Etag" => "from header"
  }

  stub_request(:get, BASE_URL).to_return(body: HOME_JSON, headers: headers)
  stub_request(:get, %r{\A#{BASE_URL}/path(/.*)?\z}).to_return(status: 200, body: RESOURCE_JSON, headers: headers)
end

def last_request
  executed_requests = WebMock::RequestRegistry.instance.requested_signatures.hash

  raise "No requests have been made" if executed_requests.empty?

  executed_requests.keys.last
end

def clear_request_registry
  WebMock::RequestRegistry.instance.reset!
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

def make_requests(methods, requester, payload = nil, content_type = nil)
  requests = {}
  methods.each do |method|
    clear_request_registry

    if payload.nil?
      requester.public_send(method)
    else
      requester.public_send(method, payload, content_type)
    end

    requests[method] = last_request
  end
  requests
end

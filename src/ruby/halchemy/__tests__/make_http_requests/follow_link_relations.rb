# frozen_string_literal: true

Given(/^a HAL resource$/) do
  root_json = {
    _links: {
      self: { href: "/" },
      resource1: { href: "/path/to/resource1" },
      resource2: { href: "/path/to/resource2" },
    }
  }.to_json

  resource_json = {
    data: "some resource"
  }.to_json

  headers = { "Content-Type" => %w[application/json charset=UTF-8] }

  # stub_request(:get, /#{BASE_URL}.*/).to_return(body: { _links: { self: { href: "/" }, resource1: { href: "/path/to/resource1" }, resource2: { href: "/resource2/is/the/path" } } })
  # stub_request(:get, %r{#{BASE_URL}/.*}).to_return(body: resource_json, headers: headers)

  stub_request(:get, BASE_URL).to_return(body: root_json, headers: headers)
  stub_request(:get, %r{\A#{BASE_URL}/path(/.*)?\z}).to_return(status: 201, body: resource_json, headers: headers)
  # stub_request(:get, "#{BASE_URL}/resource2/is/the/path").to_return(body: resource_json, headers: headers)

  @api = Halchemy::Api.new BASE_URL
  @root_resource = @api.root.get
end

When(/^I make a request using its link relations$/) do
  @api.follow(@root_resource).to("resource1").get
end

Then(/^the href of the link is used for the request$/) do
  executed_requests = WebMock::RequestRegistry.instance.requested_signatures.hash

  raise "No requests have been made" if executed_requests.empty?

  last_request = executed_requests.keys.last
  expect(last_request.uri.to_s).to include('resource1')
end

When(/^I make a request to a link relation the resource does not have$/) do
  @api.follow(@root_resource).to("non-existent").get
rescue KeyError => e
  @error = e
end

Then(/^the request fails, informing me of the issue$/) do
  expect(@error).to be_a(KeyError)
  expect(@error.message).to include("does not have a link relation named non-existent")
end

When(/^I ask for the links it has$/) do
  @links = @root_resource.links
end

Then(/^I get a list of its relations$/) do
  expect(@links).to be_a(Array)
  expect(@links.length).to be 3
  expect(@links).to include("self", "resource1", "resource2")
end

# frozen_string_literal: true

def stub_for_hal_resource_scenarios
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
end

Given(/^a HAL resource$/) do
  stub_for_hal_resource_scenarios
  @api = Halchemy::Api.new BASE_URL
  @root_resource = @api.root.get
end

When(/^I make a request using its link relations$/) do
  @api.follow(@root_resource).to("resource1").get
end

Then(/^the href of the link is used for the request$/) do
  expect(last_request.uri.to_s).to include("resource1")
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

When(/^I ask if it has a link relation$/) do
  @true_if_exists = @root_resource.rel?("self")
  @false_if_not_exists = @root_resource.rel?("not-a-rel")
end

Then(/^it tells me whether it does or not$/) do
  expect(@true_if_exists).to be true
  expect(@false_if_not_exists).to be false
end

When(/^I use an object my language uses to represent JSON as the payload of a request$/) do
  data = {
    "key1" => "value1",
    "key2" => 2,
    "key3" => true,
    "key4" => nil,
    "key5" => [1, 2, 3],
    "key6" => { "subkey1" => "sub value", "subkey2" => 2 }
  }
  @payload = data.to_json
  @api.follow(@root_resource).to("resource1").post(data)
end

Then(/^the request body is properly formatted JSON$/) do
  request = last_request
  expect(request.headers["Content-Type"]).to eq("application/json")
  expect(request.body).to eq(@payload)
end

When(/^I use data type that is not an object but is valid as JSON, e\.g\. (.*)$/) do |data|
  @payload = data
  @api.follow(@root_resource).to("resource1").post(@payload)
end

When(/^the payload of a request is has (.*) of a different (.*)$/) do |data, content_type|
  @payload = data
  @api.follow(@root_resource).to("resource1").post(data, content_type)
end

Then(/^the request is made with the correct (.*) and (.*) header$/) do |data, content_type|
  request = last_request
  expect(request.headers["Content-Type"]).to eq(content_type)
  expect(request.body).to eq(data)
end

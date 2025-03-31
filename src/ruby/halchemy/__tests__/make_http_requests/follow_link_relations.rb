# frozen_string_literal: true

When(/^I make a request using its link relations$/) do
  @requests = make_requests(ALL_METHODS, @api.follow(@home_resource).to("resource1"))
end

Then(/^the href of the link is used for the request$/) do
  ALL_METHODS.each do |method|
    expect(@requests[method].uri.to_s).to include("resource1")
  end
end

When(/^I make a request to a link relation the resource does not have$/) do
  @error = {}
  ALL_METHODS.each do |method|
    @error[method] = nil
    @api.follow(@home_resource).to("non-existent").public_send(method)
  rescue KeyError => e
    @error[method] = e
  end
end

Then(/^the request fails, informing me of the issue$/) do
  ALL_METHODS.each do |method|
    expect(@error[method]).to be_a(KeyError)
    expect(@error[method].message).to include("does not have a link relation named non-existent")
  end
end

When(/^I ask for the links it has$/) do
  @links = @home_resource.links
end

Then(/^I get a list of its relations$/) do
  expect(@links).to be_a(Array)
  expect(@links.length).to be 3
  expect(@links).to include("self", "resource1", "resource2")
end

When(/^I ask if it has a link relation$/) do
  @true_if_exists = @home_resource.rel?("self")
  @false_if_not_exists = @home_resource.rel?("not-a-rel")
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
  @requests = make_requests(PAYLOAD_METHODS, @api.follow(@home_resource).to("resource1"), @payload)
end

Then(/^the request body is properly formatted JSON$/) do
  PAYLOAD_METHODS.each do |method|
    expect(@requests[method].headers["Content-Type"]).to eq("application/json")
    expect(@requests[method].body).to eq(@payload)
  end
end

When(/^I use data type that is not an object but is valid as JSON, e\.g\. (.*)$/) do |data|
  @payload = data
  @requests = make_requests(PAYLOAD_METHODS, @api.follow(@home_resource).to("resource1"), @payload)
end

When(/^the payload of a request is has (.*) of a different (.*)$/) do |data, content_type|
  @payload = data
  @requests = make_requests(PAYLOAD_METHODS, @api.follow(@home_resource).to("resource1"), data, content_type)
end

Then(/^the request is made with the correct (.*) and (.*) header$/) do |data, content_type|
  PAYLOAD_METHODS.each do |method|
    expect(@requests[method].headers["Content-Type"]).to eq(content_type)
    expect(@requests[method].body).to eq(data)
  end
end

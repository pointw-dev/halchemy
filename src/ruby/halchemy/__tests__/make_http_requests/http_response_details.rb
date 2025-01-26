# frozen_string_literal: true

When(/^I make a request$/) do
  @resource = {}
  ALL_METHODS.each do |method|
    @resource[method] = @api.follow(@root_resource).to("resource1").public_send(method)
  end
end

Then(/^the HTTP request and response details are available to me$/) do
  ALL_METHODS.each do |method|
    resource = @resource[method]
    expect(resource).not_to be_nil
    request = resource._halchemy.request
    response = resource._halchemy.response
    error = resource._halchemy.error

    expect(request).not_to be_nil
    expect(response).not_to be_nil

    expect(request.method).to eq(method)
    expect(request.url).to end_with("/path/to/resource1")

    expect(response.status_code).to eq(200)
    expect(response.reason).to eq("OK")

    expect(error).to be_nil
  end
end

When(/^the request I made fails: (.*)$/) do |failure|
  @api.error_handling.raise_for_network_errors = false

  server = stub_request(:any, %r{\A#{BASE_URL}/path(/.*)?\z})
  if failure.start_with?("status_code:")
    server.to_return(status: failure.sub("status_code:", "").to_i, body: { error: "error" }.to_json)
  else
    server.to_raise(failure)
  end
  @expected_failure = failure

  @resource = {}
  ALL_METHODS.each do |method|
    @resource[method] = @api.follow(@root_resource).to("resource1").public_send(method)
  end
end

Then(/^I can access the error details$/) do
  ALL_METHODS.each do |method|
    response = @resource[method]._halchemy.response
    error = @resource[method]._halchemy.error
    expect(error).not_to be_nil

    if @expected_failure.start_with?("status_code:")
      expect(response.status_code).to eq(@expected_failure.sub("status_code:", "").to_i)
    else
      expect(error.message).to be @expected_failure
    end
  end
end

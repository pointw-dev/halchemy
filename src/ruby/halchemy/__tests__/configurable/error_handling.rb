# frozen_string_literal: true

Given(/^an Api with default error handling configuration$/) do
  @api = Halchemy::Api.new BASE_URL
end

Given(/^an Api configured to not throw on network error$/) do
  @api = Halchemy::Api.new BASE_URL
  @api.error_handling.raise_for_network_errors = false
end

Given(/^an Api configured to throw on status codes >399$/) do
  @api = Halchemy::Api.new BASE_URL
  @api.error_handling.raise_for_status_codes = ">399"
end

Given(/^an Api configured to throw on status codes >399, except 404$/) do
  @api = Halchemy::Api.new BASE_URL
  @api.error_handling.raise_for_status_codes = "400-403 >404"
end

When(/^a request has this result (.*)$/) do |result|
  server = stub_request(:any, BASE_URL)
  if result.start_with?("status_code:")
    server.to_return(status: result.sub("status_code:", "").to_i, body: { error: "error" }.to_json)
  else
    server.to_raise(result)
  end

  @exception_thrown = {}
  ALL_METHODS.each do |method|
    @exception_thrown[method] = false
    @api.using_endpoint("/").public_send(method)
  rescue Halchemy::HttpError
    @exception_thrown[method] = true
  end
end

Then(/^an exception (.*) thrown$/) do |is_or_is_not|
  ALL_METHODS.each do |method|
    expect(@exception_thrown[method]).to be(is_or_is_not == "is")
  end
end

When(/^a request results in a status code of 401$/) do
  stub_request(:any, BASE_URL).to_return(status: 401)
  @resource = {}
  ALL_METHODS.each do |method|
    @resource[method] = @api.using_endpoint("/").public_send(method)
  end
end

And(/^the code asks to throw an exception for non-successful status codes$/) do
  @raise_method = {}
  ALL_METHODS.each do |method|
    @raise_method[method] = @resource[method]._halchemy.method(:raise_for_status_codes)
  end
end

Then(/^based on the override settings (.*) an exception (.*) thrown$/) do |settings, is_or_is_not|
  ALL_METHODS.each do |method|
    exception_thrown = false
    begin
      if settings == "empty"
        @raise_method[method].call
      else
        @raise_method[method].call(settings)
      end
    rescue Halchemy::HttpError
      exception_thrown = true
    end

    expect(exception_thrown).to be(is_or_is_not == "is")
  end
end

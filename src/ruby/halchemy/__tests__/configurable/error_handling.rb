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
    server.to_return(status: result.sub("status_code:", "").to_i, body: {error: "error"}.to_json)
  else
    server.to_raise(result)
  end

  begin
    @exception_thrown = false
    @api.using_endpoint("/").get
  rescue StandardError
    @exception_thrown = true
  end

end

Then(/^an exception (.*) thrown$/) do |is_or_is_not|
  expect(@exception_thrown).to be(is_or_is_not == "is")
end


When(/^a request results in a status code of 401$/) do
  stub_request(:any, BASE_URL).to_return(status: 401)
end

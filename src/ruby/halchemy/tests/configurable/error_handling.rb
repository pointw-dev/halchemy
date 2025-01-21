# frozen_string_literal: true

Given(/^an Api with default error handling configuration$/) do
  @api = Halchemy::Api.new("http://example.org")
end

Given(/^an Api configured to not throw on network error$/) do
  @api = Halchemy::Api.new("http://example.org")
  @api.error_handling.raise_for_network_errors = false
end


When(/^a request has this result (.*)$/) do |result|
  server = stub_request(:any, "http://example.org/result")
  @server = if result.start_with?("status_code:")
              server.to_return(status: result.sub("status_code:", "").to_i)
            else
              server.to_raise(result)
            end

  begin
    @exception_thrown = false
    @api.using_endpoint("/result").get
  rescue StandardError
    @exception_thrown = true
  end

end

Then(/^an exception (.*) thrown$/) do |is_or_is_not|
  expect(@exception_thrown).to be(is_or_is_not == "is")
end


# frozen_string_literal: true

When(/^I specify additional headers for a request$/) do
  requester = @api.follow(@home_resource).to("resource1").with_headers({ "X-CustomHeader" => "custom value" })
  @requests = make_requests(ALL_METHODS, requester)
end

Then(/^the request is made with those headers$/) do
  ALL_METHODS.each do |method|
    headers = @requests[method].headers
    expect(headers.keys.map(&:downcase)).to include("x-customheader")
    expect(headers["X-Customheader"]).to eq("custom value") # this case sensitivity is from WebMock, not halchemy
  end
end

Given(/^I have made a request with additional headers$/) do
  stub_for_hal_resource_scenarios
  @api = Halchemy::Api.new BASE_URL
  @home_resource = @api.home.get
  @api.follow(@home_resource).to("resource1").with_headers({ "X-CustomHeader" => "custom value" }).get
end

When(/^I make a new request without headers$/) do
  @requests = make_requests(ALL_METHODS, @api.follow(@home_resource).to("resource1"))
end

Then(/^the previous request's headers are not included$/) do
  ALL_METHODS.each do |method|
    headers = @requests[method].headers
    expect(headers.keys.map(&:downcase)).not_to include("x-customheader")
  end
end

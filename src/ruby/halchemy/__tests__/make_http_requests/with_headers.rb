When(/^I specify additional headers for a request$/) do
  @api.follow(@root_resource).to("resource1").with_headers({ "X-CustomHeader" => "custom value" }).get
end

Then(/^the request is made with those headers$/) do
  headers = last_request.headers
  expect(headers.keys.map(&:downcase)).to include("x-customheader")
  expect(headers["X-Customheader"]).to eq("custom value") # this case sensitivity is a product of WebMock, not halchemy
end

Given(/^I have made a request with additional headers$/) do
  stub_for_hal_resource_scenarios
  @api = Halchemy::Api.new BASE_URL
  @root_resource = @api.root.get
  @api.follow(@root_resource).to("resource1").with_headers({ "X-CustomHeader" => "custom value" }).get
end

When(/^I make a new request without headers$/) do
  @api.follow(@root_resource).to("resource1").get
end

Then(/^the previous request's headers are not included$/) do
  headers = last_request.headers
  expect(headers.keys.map(&:downcase)).not_to include("x-customheader")
end

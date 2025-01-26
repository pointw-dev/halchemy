# frozen_string_literal: true

When(/^I supply (.*)$/) do |parameters|
  requester = @api.follow(@root_resource).to("resource1").with_parameters(JSON.parse(parameters))
  @requests = make_requests(ALL_METHODS, requester)
end

Then(/^the parameters are added to the URL as a RFC 3986 compliant (.*)$/) do |query_string|
  ALL_METHODS.each do |method|
    request_path = normalize_path(@requests[method].uri.to_s)
    correct_query_string = normalize_path("/path?#{query_string}")[5..]
    expect(request_path).to end_with(correct_query_string)
  end
end

Given(/^an endpoint at (.*)$/) do |url|
  @api = Halchemy::Api.new(BASE_URL)
  @endpoint = @api.using_endpoint(url)
end

When(/^I provide (.*)$/) do |parameters|
  parameters = JSON.parse(parameters)
  @url = @endpoint.with_parameters(parameters).url
end

Then(/^the result is a (.*)$/) do |correct_url|
  expect(@url).to end_with(correct_url)
end

And(/^I choose a parameters (.*)$/) do |list_style|
  @api.parameters_list_style = list_style
end

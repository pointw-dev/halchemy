# frozen_string_literal: true

When(/^I supply (.*)$/) do |parameters|
  @api.follow(@root_resource).to("resource1").with_parameters(JSON.parse(parameters)).get
end

Then(/^the parameters are added to the URL as a RFC 3986 compliant (.*)$/) do |query_string|
  request_path = normalize_path(last_request.uri.to_s)
  correct_query_string = normalize_path("/path?#{query_string}")[5..]
  expect(request_path).to end_with(correct_query_string)
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
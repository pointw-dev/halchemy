# frozen_string_literal: true

require "webmock"
require "webmock/cucumber"
require "httpx/adapters/webmock"
require "rspec/expectations"
require "halchemy"

Given(/^the Api is created with a (.*)$/) do |base_url|
  @api = Halchemy::Api.new(base_url)
end

And(/^is later changed to a (.*)$/) do |new_base_url|
  @api.base_url = new_base_url
end

When(/^I GET the root resource$/) do
  @methods_used = [:get]
  @api.root.get
end

When(/^a request is given a (.*)$/) do |relative_url|
  @methods_used = ALL_METHODS
  @methods_used.each do |method|
    @api.using_endpoint(relative_url).public_send(method)
  end
end

Then(/^the request is made to the (.*)$/) do |expected_url|
  @methods_used.each do |method|
    expect(a_request(method, expected_url)).to have_been_made.at_least_once
  end
end

When(/^the request is given an (.*)$/) do |absolute_url|
  @methods_used = ALL_METHODS
  @methods_used.each do |method|
    @api.using_endpoint(absolute_url).public_send(method)
  end
end

Then(/^the request is made to that (.*)$/) do |absolute_url|
  ALL_METHODS.each do |method|
    expect(a_request(method, absolute_url)).to have_been_made.at_least_once
  end
end

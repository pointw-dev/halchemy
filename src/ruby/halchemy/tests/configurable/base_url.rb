# frozen_string_literal: true

require "webmock"
require "webmock/cucumber"
require "httpx/adapters/webmock"
require "rspec/expectations"
require "halchemy"

Before do
  WebMock::HttpLibAdapters::HttpxAdapter.enable!
  WebMock.disable_net_connect!
  @server = stub_request(:any, /.*/)
end

After do
  WebMock.reset!
end


Given(/^the Api is created with a (.*)$/) do |base_url|
  @api = Halchemy::Api.new(base_url)
end

And(/^is later changed to a (.*)$/) do |new_base_url|
  @api.base_url = new_base_url
end


When(/^I GET the root resource$/) do
  @result = @api.root.get
end

When(/^a request is given a (.*)$/) do |relative_url|
  @result = @api.using_endpoint(relative_url).get
end

Then(/^the request is made to the (.*)$/) do |expected_url|
  expect(a_request(:get, expected_url)).to have_been_made.at_least_once
end


When(/^the request is given an (.*)$/) do |absolute_url|
  @result = @api.using_endpoint(absolute_url).get
end

Then(/^the request is made to that (.*)$/) do |absolute_url|
  expect(a_request(:get, absolute_url)).to have_been_made.at_least_once
end


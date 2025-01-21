HEADERS = {
  "Cache-control" => "no-cache",
  "Connection" => "close",
  "User-agent" => "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36"
}.freeze

REMOVE_HEADERS = %w[Cache-control Authorization].freeze


Given(/^the Api is created with no headers$/) do
  @api = Halchemy::Api.new("http://example.org")
end

And(/^later is given new a new (.*) with its (.*)$/) do |header, value|
  headers = { header => value }
  @api.add_headers(headers)
end

When(/^a request is sent$/) do
  @api.using_endpoint("/path").get
end

Then(/^the request contains each (.*) with its (.*) for all sensible ones for the (.*)$/) do |header, value, method_type|
  # TODO: handle different method types having different headers - for now all headers are in
  expect(a_request(:get, "http://example.org/path").with(headers: { header => value })).to have_been_made.at_least_once
end



Given(/^the Api is created with headers$/) do
  @api = Halchemy::Api.new("http://example.org", headers: HEADERS)
end

And(/^later some headers are removed$/) do
  @api.remove_headers(REMOVE_HEADERS)
end

Then(/^the request does not contain the removed headers$/) do
  executed_requests = WebMock::RequestRegistry.instance.requested_signatures.hash

  raise "No requests have been made" if executed_requests.empty?

  last_request = executed_requests.keys.last
  headers = last_request.headers

  headers_remain = REMOVE_HEADERS.reduce(false) { |result, header| result ||= headers.has_key?(header) }
  expect(headers_remain).to be(false), "the request was made with headers that were removed"
end


Then(/^the request contains the headers and their values$/) do
  expect(a_request(:get, "http://example.org/path").with(headers: HEADERS)).to have_been_made.at_least_once
end

Given(/^an Api is created with a different (.*) for an out\-of\-the\-box (.*)$/) do |value, header|
  headers = { header => value }
  @api = Halchemy::Api.new("http://example.org", headers: headers)
end

Then(/^the request contains the (.*) with the new (.*)$/) do |header, value|
  expect(a_request(:get, "http://example.org/path").with(headers: { header => value })).to have_been_made.at_least_once
end

Then(/^the request contains each new (.*) with its (.*)$/) do |header, value|
  expect(a_request(:get, "http://example.org/path").with(headers: { header => value })).to have_been_made.at_least_once
end

When(/^I set a new value to a previously added header but with a different case$/) do
  upper = HEADERS.each_with_object(Hash.new(0)) do |item, result|
    key, value = item
    result[key.upcase] = value
  end
  @api.add_headers(upper)

  lower = HEADERS.each_with_object(Hash.new(0)) do |item, result|
    key, value = item
    result[key.downcase] = value
  end
  @api.add_headers(lower)
  @api.using_endpoint("/path").get
end

Then(/^the header is changed not added$/) do
  executed_requests = WebMock::RequestRegistry.instance.requested_signatures.hash

  raise "No requests have been made" if executed_requests.empty?

  last_request = executed_requests.keys.last
  headers = last_request.headers

  api_has_duplicate_headers = @api.headers.keys.map(&:downcase).uniq.size != @api.headers.keys.size
  request_has_duplicate_headers = headers.keys.map(&:downcase).uniq.size != headers.keys.size

  expect(request_has_duplicate_headers).to be(false), "request has duplicate headers"
  expect(api_has_duplicate_headers).to be(false), "api has duplicate headers"
end

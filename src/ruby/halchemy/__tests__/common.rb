# frozen_string_literal: true

BASE_URL = "http://example.org"

Before do
  WebMock::HttpLibAdapters::HttpxAdapter.enable!
  WebMock.disable_net_connect!
  stub_request(:any, /.*/)
end

After do
  WebMock.reset!
end


def last_request
  executed_requests = WebMock::RequestRegistry.instance.requested_signatures.hash

  raise "No requests have been made" if executed_requests.empty?

  executed_requests.keys.last
end

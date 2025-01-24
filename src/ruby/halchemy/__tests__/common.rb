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

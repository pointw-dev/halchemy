# frozen_string_literal: true

Given(/^a HAL resource with a link that is an RFC 6570 compliant (.*)$/) do |templated_href|
  resource1_json = {
    data: "some resource",
    _links: {
      self: { href: "/path/to/resource1" },
      next: {
        href: templated_href,
        templated: true
      }
    }
  }.to_json
  stub_request(:any, /.*/).to_return(body: resource1_json, status: 200)
  @api = Halchemy::Api.new BASE_URL
  # @hal_resource = Halchemy::HalResource.new.merge! JSON.parse(resource1_json)
  @hal_resource = @api.using_endpoint("/resource1").get
end

When(/^I follow that link and provide (.*)$/) do |template_values|
  requester = @api.follow(@hal_resource).to("next").with_template_values(JSON.parse(template_values))
  @requests = make_requests(ALL_METHODS, requester)
end

Then(/^the requested URL ends with the (.*)$/) do |correct_path|
  ALL_METHODS.each do |method|
    request_path = normalize_path(@requests[method].uri.to_s)
    correct_path = normalize_path(correct_path)
    expect(request_path).to eq(correct_path)
  end
end

When(/^the (.*) provided are missing one or more values$/) do |template_values|
  requester = @api.follow(@hal_resource).to("next")
  requester = requester.with_template_values(JSON.parse(template_values)) unless template_values == "-omit-"
  @requests = make_requests(ALL_METHODS, requester)
end

Then(/^the constructed URL ends with the (.*)$/) do |correct_path|
  ALL_METHODS.each do |method|
    request_path = normalize_path(@requests[method].uri.to_s)
    correct_path = normalize_path(correct_path)
    expect(request_path).to eq(correct_path)
  end
end

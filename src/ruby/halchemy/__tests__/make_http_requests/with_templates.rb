Given(/^a HAL resource with a link that is an RFC (\d+) compliant (.*)$/) do |arg, templated_href|
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
  stub_request(:any, /.*/)
  @hal_resource = Halchemy::HalResource.new.merge! JSON.parse(resource1_json)
  @api = Halchemy::Api.new BASE_URL
end

When(/^I follow that link and provide (.*)$/) do |template_values|
  @api.follow(@hal_resource).to("next").with_template_values(JSON.parse(template_values)).get
end

Then(/^the requested URL ends with the (.*)$/) do |correct_path|
  request_path = normalize_path(last_request.uri.to_s)
  correct_path = normalize_path(correct_path)
  expect(request_path).to eq(correct_path)
end

When(/^the (.*) provided are missing one or more values$/) do |template_values|
  if template_values == "-omit-"
    @api.follow(@hal_resource).to("next").get
  else
    @api.follow(@hal_resource).to("next").with_template_values(JSON.parse(template_values)).get
  end
end

Then(/^the constructed URL ends with the (.*)$/) do |correct_path|
  request_path = normalize_path(last_request.uri.to_s)
  correct_path = normalize_path(correct_path)
  expect(request_path).to eq(correct_path)
end
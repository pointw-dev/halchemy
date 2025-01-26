# frozen_string_literal: true

Given(/^a modifiable HAL resource$/) do
  stub_for_hal_resource_scenarios
  @api = Halchemy::Api.new BASE_URL
  root_resource = @api.root.get
  @resource = @api.follow(root_resource).to("resource1").get
end

When(/^I request a change to the resource$/) do
  @requests = make_requests(MODIFY_METHODS, @api.follow(@resource).to("self"))
end

Then(/^the If-Match header uses the resource's Etag header$/) do
  MODIFY_METHODS.each do |method|
    expect(@requests[method].headers["If-Match"]).to eq("from header")
  end
end

And(/^the response does not have an Etag header$/) do
  @resource._halchemy&.response&.headers&.delete("Etag")
end

Then(/^the If-Match header uses the resource's _etag field$/) do
  MODIFY_METHODS.each do |method|
    expect(@requests[method].headers["If-Match"]).to eq("from field")
  end
end

And(/^the resource does not have an _etag field$/) do
  @resource.delete("_etag")
end

Then(/^the request is made without an If-Match header$/) do
  MODIFY_METHODS.each do |method|
    expect(@requests[method].headers.keys).not_to include("If-Match")
  end
end

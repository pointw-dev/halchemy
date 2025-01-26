# frozen_string_literal: true

Given(/^a HAL resource that has a field which is a collection of objects in HAL format$/) do
  @resource = Halchemy::HalResource.new.merge!(JSON.parse({
    _items: [
      {
        field: "alpha",
        _links: { self: { href: "/resource/alpha" } }
      },
      {
        field: "beta",
        _links: { self: { href: "/resource/beta" } }
      },
      {
        field: "delta",
        _links: { self: { href: "/resource/delta" } }
      }
    ],
    _links: { self: { href: "/resource" } }
  }.to_json))
end

When(/^I iterate the items in that field's collection$/) do
  @iterator = @resource.collection("_items")
  @all_hal = @resource.collection("_items").reduce(false) do |all_hal, item|
    all_hal || item.is_a?(Halchemy::HalResource)
  end
end

Then(/^each item is a HAL resource$/) do
  expect(@all_hal).to be true
end

When(/^I try to iterate as a collection a field in the resource that does not exist$/) do
  @root_resource.collection("_items").reduce(false) { |all_hal, item| all_hal || item.is_a?(Halchemy::HalResource) }
rescue KeyError => e
  @error = e
end

Then(/^it throws an exception telling me that the field does not exist$/) do
  expect(@error).to be_a(KeyError)
  expect(@error.message).to include("does not exist")
end

Given(/^a HAL resource with a non-collection field$/) do
  @resource = Halchemy::HalResource.new.merge!(JSON.parse({
    _id: "3a834-34f9f03-39b843",
    _links: { self: { href: "/resource" } }
  }.to_json))
end

When(/^I try to iterate as a collection a field that is not a collection$/) do
  @resource.collection("_id").reduce(false) { |all_hal, item| all_hal || item.is_a?(Halchemy::HalResource) }
rescue TypeError => e
  @error = e
end

Then(/^it throws an exception telling me that the field is not a collection$/) do
  expect(@error).to be_a(TypeError)
  expect(@error.message).to include("is not a collection")
end

Given(/^a HAL resource that has a field which is a collection, but not of HAL formatted objects$/) do
  @resource = Halchemy::HalResource.new.merge!(JSON.parse({
    _items: [
      {
        make: "Ford Mustang"
      },
      {
        make: "Chrysler 300"
      },
      {
        make: "RAM 1500"
      }
    ],
    _links: { self: { href: "/resource" } }
  }.to_json))
end

When(/^I try to iterate the items in that field's collection$/) do
  @resource.collection("_items").reduce(false) { |all_hal, item| all_hal || item.is_a?(Halchemy::HalResource) }
rescue TypeError => e
  @error = e
end

Then(/^it throws an exception telling me collection contains non-HAL formatted objects$/) do
  expect(@error).to be_a(TypeError)
  expect(@error.message).to include("non-HAL")
end

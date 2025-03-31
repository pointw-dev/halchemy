# frozen_string_literal: true

Given(/^a HalResource with an embedded property containing both a single resource and a resource collection$/) do
  @resource = Halchemy::HalResource.from_hash( JSON.parse({
     _id: "39402",
     memberName: "Pat Doe",
     address: "123 Main St.",
     _links: {
       self: { href: "/members/39402" },
       library: { href: "/libraries/2389" },
       books: { href: "/members/39402/books" }
     },
     _embedded: {
       library: {
         name: "Essex County Library",
         _links: {
           self: { href: "/libraries/2389" }
         }
       },
       book: [
         {
           title: "Stephen's Kingdom",
           edition: "1st",
           _links: {
             self: { href: "/books/3845" }
           }
         },
         {
           title: "Nature Valley",
           edition: "paperback",
           _links: {
             self: { href: "/books/8842" }
           }
         }
       ]
     }
  }.to_json))
end


When(/^I retrieve the embedded resource with the (.*) rel$/) do |rel|
  @fetched = @resource.embedded(rel)
rescue KeyError => e
  @exception = e
end


Then(/^I should receive a single HalResource instance$/) do
  expect(@fetched).to be_a Halchemy::HalResource
end


And(/^the resource should contain the expected data for the library$/) do
  expect(@fetched["name"]).to eq("Essex County Library")
end


Then(/^I should receive a collection of HalResource instances$/) do
  expect(@fetched).to be_a Array
  expect(@fetched).to all(be_a(Halchemy::HalResource))
end


And(/^the resource should contain the expected book data$/) do
  titles = ["Stephen's Kingdom", "Nature Valley"]
  titles.each_with_index do |title, index|
    expect(title).to eq @fetched[index]["title"]
  end
end


When(/^I retrieve the embedded resource with rel (.*) and expect (.*)$/) do |rel, multiplicity|
  @fetched = @resource.embedded(
    rel,
    expect: multiplicity == "many" ? Halchemy::Multiplicity::MANY : Halchemy::Multiplicity::ONE
  )
rescue TypeError => e
  @exception = e
end


When(/^I call embedded_one with rel library$/) do
  @fetched = @resource.embedded_one("library")
end


When(/^I call embedded_many with rel book$/) do
  @fetched = @resource.embedded_many("book")
end


Then(/^an error should be raised indicating a type mismatch$/) do
  expect(@exception).to be_a(TypeError)
end

Then(/^an error should be raised indicating the resource is not found$/) do
  expect(@exception).to be_a(KeyError)
end

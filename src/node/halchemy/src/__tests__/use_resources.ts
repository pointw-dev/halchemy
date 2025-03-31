import {Given, Then, When} from '@cucumber/cucumber'
import assert from "assert"; // https://nodejs.org/api/assert.html
import {enhanceHalResource} from "../lib/hal_helpers";


/*
Scenario: Iterate a collection of HAL formatted objects, each as a HAL resource
    Given a HAL resource that has a field which is a collection of objects in HAL format
    When I iterate the items in that field's collection
    Then each item is a HAL resource
 */

Given('a HAL resource that has a field which is a collection of objects in HAL format',
    function () {
        const resource = {
            _items: [
                {
                    field: 'alpha',
                    _links: {self: {href: '/resource/alpha'}}
                },
                {
                    field: 'beta',
                    _links: {self: {href: '/resource/beta'}}
                },
                {
                    field: 'delta',
                    _links: {self: {href: '/resource/delta'}}
                },
            ],
            _links: {self: {href: '/resource'}}
        }
        enhanceHalResource(resource)
        this.resource = resource
    })

When('I iterate the items in that field\'s collection',
    function () {
        this.errorOccurred = false
        this.allHal = true
        try {
            for (const item of this.resource.collection('_items')) {
                if (!item.hasOwnProperty('hasRel')) {
                    this.allHal = false
                    break
                }
            }
        } catch (e) {
            this.errorOccurred = true
        }
    })

Then('each item is a HAL resource',
    function () {
        assert.ok(!this.errorOccurred)
        assert.ok(this.allHal)
    })


/*
Scenario: Handle incorrectly using the iterator on a non-existent field
    Given a HAL resource
    When I try to iterate as a collection a field in the resource that does not exist
    Then it throws an exception telling me that the field does not exist
*/

// Given a HAL resource

When('I try to iterate as a collection a field in the resource that does not exist',
    function () {
        this.errorOccurred = false
        try {
            for (const item of this.home.collection('non_existent')) {
                // do nothing
            }
        } catch (e: Error | any) {
            this.errorOccurred = true
            this.message = e.message
        }
    })

Then('it throws an exception telling me that the field does not exist',
    function () {
        assert.ok(this.errorOccurred)
        assert.equal(this.message, "Field 'non_existent' does not exist, so cannot be iterated as a collection")
    })





/*
Scenario: Handle using the iterator on a field that is not a collection
    Given a HAL resource with a non-collection field
    When I try to iterate as a collection a field that is not a collection
    Then it throws an exception telling me that the field is not a collection
 */

Given('a HAL resource with a non-collection field',
    function () {
        const resource = {
            field: 'alpha',
            _links: {self: {href: '/resource'}}
        }
        enhanceHalResource(resource)
        this.resource = resource
    })

When('I try to iterate as a collection a field that is not a collection',
    function () {
        this.errorOccurred = false
        try {
            for (const item of this.resource.collection('field')) {
                // do nothing
            }
        } catch (e: Error | any) {
            this.errorOccurred = true
            this.message = e.message
        }
    })

Then('it throws an exception telling me that the field is not a collection',
    function () {
        assert.ok(this.errorOccurred)
        assert.equal(this.message, "Field 'field' is not a collection")
    })


/*
Scenario: Handle using the iterator on a field that is a collection but not of HAL format objects
    Given a HAL resource that has a field which is a collection, but not of HAL formatted objects
    When I try to iterate the items in that field's collection
    Then I get a meaningful error message
*/

Given('a HAL resource that has a field which is a collection, but not of HAL formatted objects',
    function () {
        const resource = {
            _items: [
                'alpha',
                'beta',
                'delta',
            ],
            _links: {self: {href: '/resource'}}
        }
        enhanceHalResource(resource)
        this.resource = resource
    })

When('I try to iterate the items in that field\'s collection',
    function () {
        this.errorOccurred = false
        try {
            for (const item of this.resource.collection('_items')) {
                // do nothing
            }
        } catch (e: Error | any) {
            this.errorOccurred = true
            this.message = e.message
        }
    })

Then('it throws an exception telling me collection contains non-HAL formatted objects',
    function () {
        assert.ok(this.errorOccurred)
        assert.equal(this.message, "The '_items' collection contains non-HAL formatted objects")
    })



/*
Background:
    Given a HalResource with an embedded property containing both a single resource and a resource collection
*/

Given(/^a HalResource with an embedded property containing both a single resource and a resource collection$/,
    function () {
        const resource = {
            "_id": "39402",
            "memberName": "Pat Doe",
            "address": "123 Main St.",
            "_links": {
                "self": { "href": "/members/39402" },
                "library": { "href": "/libraries/2389" },
                "books": { "href": "/members/39402/books" }
            },
            "_embedded": {
                "library": {
                    "name": "Essex County Library",
                    "_links": {
                        "self": { "href": "/libraries/2389" }
                    }
                },
                "book": [
                    {
                        "title": "Stephen's Kingdom",
                        "edition": "1st",
                        "_links": {
                            "self": { "href": "/books/3845" }
                        }
                    },
                    {
                        "title": "Nature Valley",
                        "edition": "paperback",
                        "_links": {
                            "self": { "href": "/books/8842" }
                        }
                    }
                ]
            }
        }
        enhanceHalResource(resource)
        this.resource = resource
    })



/*
Scenario: Accessing a single embedded resource with no expectation
    When I retrieve the embedded resource with the library rel
    Then I should receive a single HalResource instance
    And the resource should contain the expected data for the library
 */

When(/^I retrieve the embedded resource with the (?<rel>.*) rel$/, function (rel: string) {
    try {
        this.fetched = this.resource.embedded(rel)
    } catch (error) {
        this.exception = error
    }
});

Then(/^I should receive a single HalResource instance$/, function () {
    assert.equal(this.fetched.links.length, 1)
});

Then(/^the resource should contain the expected data for the library$/, function () {
    assert.equal(this.fetched.name, 'Essex County Library')
});



/*
Scenario: Accessing an embedded collection resource with no expectation
    When I retrieve the embedded resource with the book rel
    Then I should receive a collection of HalResource instances
    And the resource should contain the expected book data
 */

// When I retrieve the embedded resource with the book rel

Then(/^I should receive a collection of HalResource instances$/, function () {
    assert.equal(Array.isArray(this.fetched), true)
    assert.equal(this.fetched[0].links.length, 1)
});

Then(/^the resource should contain the expected book data$/, function () {
    const titles = ["Stephen's Kingdom", "Nature Valley"];
    titles.forEach((title, index) => {
        assert.equal(this.fetched[index].title, title)
    });
});


/*
Scenario: Accessing an embedded resource with expect set to one
    When I retrieve the embedded resource with rel library and expect one
    Then I should receive a single HalResource instance
    And the resource should contain the expected data for the library

 */

When(/^I retrieve the embedded resource with rel (?<rel>.*) and expect (?<multiplicity>.*)$/, function (rel: string, multiplicity: string) {
    try {
        this.fetched = this.resource.embedded(rel, {expect: multiplicity})
    } catch (error) {
        this.exception = error
    }
});

// Then I should receive a single HalResource instance
// And the resource should contain the expected data for the library


/*
Scenario: Accessing an embedded resource with expect set to many
    When I retrieve the embedded resource with rel book and expect many
    Then I should receive a collection of HalResource instances
    And the resource should contain the expected book data
 */


/*
Scenario: Using the embedded_one method
    When I call embedded_one with rel library
    Then I should receive a single HalResource instance
 */

When(/^I call embedded_one with rel library$/, function () {
    this.fetched = this.resource.embeddedOne('library');
});

// Then I should receive a single HalResource instance



/*
Scenario: Using the embedded_many method
    When I call embedded_many with rel book
    Then I should receive a collection of HalResource instances
 */

When(/^I call embedded_many with rel book$/, function () {
    this.fetched = this.resource.embeddedMany('book');
});

//Then I should receive a collection of HalResource instances


/*
Scenario: Expecting many but the resource is a single object
    When I retrieve the embedded resource with rel library and expect many
    Then an error should be raised indicating a type mismatch
 */

// When I retrieve the embedded resource with rel library and expect many

Then(/^an error should be raised indicating a type mismatch$/, function () {
    assert.equal(this.exception instanceof TypeError, true);
});


/*
Scenario: Expecting one but the resource is a collection
    When I retrieve the embedded resource with rel book and expect one
    Then an error should be raised indicating a type mismatch
 */


// When I retrieve the embedded resource with rel book and expect one
// Then an error should be raised indicating a type mismatch


/*
Scenario: Accessing a non-existent embedded resource
    When I retrieve the embedded resource with the non-existent rel
    Then an error should be raised indicating the resource is not found
 */

// When I retrieve the embedded resource with the non-existent rel
Then(/^an error should be raised indicating the resource is not found$/, function () {
    assert.equal(this.exception instanceof Error, true)
    assert.equal(this.exception.message.startsWith('No embedded resource found for rel '), true)
});
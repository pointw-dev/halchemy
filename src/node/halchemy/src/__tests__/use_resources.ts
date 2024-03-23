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
            for (const item of this.root.collection('non_existent')) {
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

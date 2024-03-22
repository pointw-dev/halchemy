import {Given, Then, When} from '@cucumber/cucumber'
import assert from "assert"; // https://nodejs.org/api/assert.html
import {enhanceHalResource} from "../lib/hal_helpers";
import {type HalResource} from "hal-types";

/*
Scenario: Iterate an array of HAL formatted objects, each as a HAL resource
    Given a HAL resource that has a field which is an array of objects in HAL format
    When I iterate the items in that field's array
    Then each item is a HAL resource
 */

Given('a HAL resource that has a field which is an array of objects in HAL format',
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


When('I iterate the items in that field\'s array',
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

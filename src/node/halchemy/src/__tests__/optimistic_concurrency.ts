import {http, HttpResponse} from 'msw'
import {Given, Then, When} from '@cucumber/cucumber'
import assert from "assert"; // https://nodejs.org/api/assert.html
import {BeforeFeature, ModifyMethods, RequestContext, server} from "./_setup_teardown";
import {Api} from '../lib'


let requestContext: RequestContext = {
    urls: {},
    headers: {}
}


BeforeFeature('Makes using optimistic concurrency easier.',
    function () {
        requestContext.urls = {}
        requestContext.headers = {}

        const resource = {
            '_links': {
                'self': {'href': '/modifiable'}
            },
            '_etag': 'from field'
        }
        const headers = {
            'Etag': 'from header'
        }
        server.use(
            http.all('http://example.org/modifiable', async ({request}) => {
                const method = request.method
                requestContext.urls[method] = request.url
                requestContext.headers[method] = request.headers
                return HttpResponse.json(resource, {headers})
            })
        )

    })


/*
Scenario: Out-of-the-box (AUTO_ETAG) uses Etag header
    Given a modifiable HAL resource
    When I request a change to the resource
    Then the If-Match header uses the resource's Etag header
*/

Given('a modifiable HAL resource',
    async function () {
        this.api = new Api('http://example.org')
        this.resource = await this.api.usingEndpoint('/modifiable').get()
    })

When('I request a change to the resource',
    async function () {
        for (const method of ModifyMethods) {
            await this.api.follow(this.resource).to('self')[method.toLowerCase()]()
        }
    })

Then("the If-Match header uses the resource's Etag header",
    function () {
        type requestKey = keyof typeof requestContext.headers

        for (const method of ModifyMethods) {
            const requestHeaders = requestContext.headers[method as requestKey] as Headers
            assert(requestHeaders.has('If-Match'), 'If-Match header exists')
            assert.equal(requestHeaders.get('If-Match'), 'from header', 'If-Match header used the Etag header')
        }
    })


/*
Scenario: Out-of-the-box (AUTO_ETAG) uses _etag field if Etag header is missing
    Given a modifiable HAL resource
    And the response does not have an Etag header
    When I request a change to the resource
    Then the If-Match header uses the resource's _etag field
*/

// Given a modifiable HAL resource

Given('the response does not have an Etag header',
    function () {
        this.resource._halchemy.response.headers.delete('Etag')
    })

Then("the If-Match header uses the resource's _etag field",
    function () {
        type requestKey = keyof typeof requestContext.headers

        for (const method of ModifyMethods) {
            const requestHeaders = requestContext.headers[method as requestKey] as Headers
            assert(requestHeaders.has('If-Match'), 'If-Match header exists')
            assert.equal(requestHeaders.get('If-Match'), 'from field', 'If-Match header used the _etag field')
        }
    })


/*
Scenario: Out-of-the-box (AUTO_ETAG) _etag field and Etag header is missing
    Given a modifiable HAL resource
    And the response does not have an Etag header
    And the resource does not have an _etag field
    When I request a change to the resource
    Then the request is made without an If-Match header
 */

// Given a modifiable HAL resource

// And the response does not have an Etag header

Given('the resource does not have an _etag field',
    function () {
        delete this.resource._etag
    })

Then("the request is made without an If-Match header",
    function () {
        type requestKey = keyof typeof requestContext.headers

        for (const method of ModifyMethods) {
            const requestHeaders = requestContext.headers[method as requestKey] as Headers
            assert(!requestHeaders.has('If-Match'), 'If-Match header does not exist')
        }
    })

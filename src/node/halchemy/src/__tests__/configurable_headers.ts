import { http, HttpResponse } from 'msw'
import { Given, When, Then } from '@cucumber/cucumber'
import assert from 'assert'     // https://nodejs.org/api/assert.html
import {AllMethods, BeforeFeature, server, RequestContext} from "./_setup_teardown";
import { Api } from '../lib'


let requestContext: RequestContext = {
    urls: {},
    headers: {}
}


const headers = {
    'Cache-control': 'no-cache',
    'Connection': 'close',
    'User-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36'
}
const removeHeaders = ['Cache-control', 'Authorization']


BeforeFeature('Configuring the default headers causes requests to include them.',
    function () {
        requestContext.urls = {}
        requestContext.headers = {}

        server.resetHandlers()
        server.use(
            http.all('*', async ({request}) => {
                const method = request.method
                requestContext.urls[method] = request.url
                requestContext.headers[method] = request.headers
                return new HttpResponse("kadiddlehopper", {status: 200})
            })
        )
})

/*
Scenario Outline:  Has sensible out-of-the-box headers
    Given the Api is created with no headers
    When a request is sent
    Then the request contains each <header> with its <value> for all sensible ones for the <method_type>
    # And the request does not contain the <header> if its method is not of the corresponding <method_type>
 */


Given('the Api is created with no headers',
    function () {
        this.api = new Api('http://example.org')
    })

When('a request is sent',
    async function () {
        const relativeUrl = '/foo/bar'
        await Promise.all(
            AllMethods.map(async (method) => {
                await this.api.usingEndpoint(relativeUrl)[method.toLowerCase()]()
            })
        )
    })

Then(/the request contains each (?<header>[^ ]+) with its (?<value>.+) for all sensible ones for the (?<methodType>\w+)/,
    function (header: keyof typeof requestContext.headers, value: string, methodType: string) {
        type requestKey = keyof typeof requestContext.headers
        AllMethods.forEach((method) => {
            const requestHeaders = requestContext.headers[method as requestKey] as Headers
            assert.ok(requestHeaders.has(header))
            assert.equal(requestHeaders.get(header), value)
        })
    })

Then(/the request does not contain the (?<header>[^ ]+) if its method is not of the corresponding (?<methodType>\w+)/,
    function (header: string, methodType: string) {
        throw new Error('Not implemented')
    })


/*
Scenario: Can add or modify default headers
    Given the Api is created with headers
    When a request is sent
    Then the request contains the headers and their values
 */

Given('the Api is created with headers',
    function () {
        this.api = new Api('http://example.org', headers)
    })

// When a request is sent

Then('the request contains the headers and their values',
    function () {
        type requestKey = keyof typeof requestContext.headers
        AllMethods.forEach((method) => {
            const requestHeaders = requestContext.headers[method as requestKey] as Headers
            for (const [header, value] of Object.entries(headers)) {
                assert.ok(requestHeaders.has(header))
                assert.equal(requestHeaders.get(header), value)
            }
        })
    })


/*
Scenario Outline: Can override out of the box headers
    Given an Api is created with a different <value> for an out-of-the-box <header>
    When a request is sent
    Then the request contains the <header> with the new <value>
 */

Given(/an Api is created with a different (?<value>.+) for an out-of-the-box (?<header>[^ ]+)/,
    function (value: string, header: string) {
        const headers: Record<string, string> = {}
        headers[header] = value
        this.api = new Api('http://example.org', headers)
    })

// When a request is sent

Then(/the request contains the (?<header>.+) with the new (?<value>.+)/,
    function (header: keyof typeof requestContext.headers, value: string) {
        type requestKey = keyof typeof requestContext.headers
        AllMethods.forEach((method) => {
            const requestHeaders = requestContext.headers[method as requestKey] as Headers
            assert.ok(requestHeaders.has(header))
            assert.equal(requestHeaders.get(header), value)
        })
    })


/*
Scenario Outline:  Can add or override headers after creation
    Given the Api is created with no headers
    And later is given new a new <header> with its <value>
    When a request is sent
    Then the request contains each new <header> with its <value>
 */

// Given the Api is created with no headers

// And...
Given(/later is given new a new (?<header>.+) with its (?<value>.+)/,
    function (header: string, value: string) {
        this.api.addHeaders({[header]: value})
    })

// When a request is sent

Then(/the request contains each new (?<header>.+) with its (?<value>.+)/,
    function (header: keyof typeof requestContext.headers, value: string) {
        type requestKey = keyof typeof requestContext.headers
        AllMethods.forEach((method) => {
            const requestHeaders = requestContext.headers[method as requestKey] as Headers
            assert.ok(requestHeaders.has(header))
            assert.equal(requestHeaders.get(header), value)
        })
    })


/*
Scenario: Can remove headers after creation
    Given the Api is created with headers
    And later some headers are removed
    When a request is sent
    Then the request does not contain the removed headers
 */

// Given the Api is created with headers

// And...
Given('later some headers are removed',
    function () {
        this.api.removeHeaders(removeHeaders)
    })

// When a request is sent

Then('the request does not contain the removed headers',
    function () {
        type requestKey = keyof typeof requestContext.headers
        AllMethods.forEach((method) => {
            removeHeaders.forEach((removedHeader) => {
                const requestHeaders = requestContext.headers[method as requestKey] as Headers
                assert.ok(!requestHeaders.has(removedHeader))
            })
        })
    })


/*
Scenario: Header changes are case-insensitive
    Given the Api is created with headers
    When I set a new value to a previously added header but with a different case
    Then the header is changed not added
*/


// Given the Api is created with headers


When('I set a new value to a previously added header but with a different case',
    async function () {
        const upper: Record<string, string> = {}
        for (const [header, value] of Object.entries(headers)) {
            upper[header.toUpperCase()] = value + ' changed'
        }
        this.api.addHeaders(upper)

        const lower: Record<string, string> = {}
        for (const [header, value] of Object.entries(headers)) {
            lower[header.toLowerCase()] = value + ' changed again'
        }
        await Promise.all(
            AllMethods.map(async (method) => {
                await this.api.usingEndpoint('/foobar').withHeaders(lower)[method.toLowerCase()]()
            })
        )
    })


Then('the header is changed not added',
    function () {
        type requestKey = keyof typeof requestContext.headers
        AllMethods.forEach((method) => {
            const sentHeaders = requestContext.headers[method as requestKey] as Headers
            for (const [header, value] of Object.entries(headers)) {
                const numberOfHeaders = Array.from(sentHeaders.keys()).filter(i => i.toLowerCase() === header.toLowerCase()).length
                assert.equal(numberOfHeaders, 1)
                assert.equal(sentHeaders.get(header), value + ' changed again')
            }
        })
    })

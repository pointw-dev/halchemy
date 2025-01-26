import { http, HttpResponse } from 'msw'
import { Given, When, Then } from '@cucumber/cucumber'
import assert from 'assert'     // https://nodejs.org/api/assert.html
import {AllMethods, BeforeFeature, server, RequestContext} from "./_setup_teardown";
import { Api } from '../lib'
import {HalchemyMetadata} from "../lib/metadata";


BeforeFeature('You can configure how halchemy responds to errors.',
    function () {
        server.resetHandlers()
        server.use(
            http.all('*', async ({request}) => {
                const method = request.method
                return new HttpResponse("kadiddlehopper", {status: 200})
            })
        )
    })


/*
Scenario Outline: Out-of-box error handling configuration
    Given an Api with default error handling configuration
    When sending a request with this result <result>
    Then an exception <is_or_is_not> thrown
 */

Given('an Api with default error handling configuration',
    function () {
        this.api = new Api('http://example.org')
    })

When(/a request has this result (?<result>.*)/,
    async function (result) {
        const url = 'http://example.org/error'
        if (result.startsWith('status_code')) {
            const statusCode = parseInt(result.split(':')[1])
            server.use(
                http.all(url, async () => {
                    return new HttpResponse(result, {status: statusCode})
                })
            )
        } else if (result == 'network error') {
            server.use(
                http.all(url , async () => {
                    return HttpResponse.error()
                })
            )
        } else if (result.startsWith('timeout')) {
            server.use(
                http.all(url, async () => {
                    return HttpResponse.error()  // cannot find how to simulate a timeout with msw
                })
            )
        }

        this.resources = {}
        this.exceptions = {}
        for (const method of AllMethods) {
            this.exceptions[method] = null
            try {
                this.resources[method] = await this.api.usingEndpoint(url)[method.toLowerCase()]()
            } catch (e) {
                this.exceptions[method] = e
            }

        }
    })

Then(/^an exception (?<is_or_is_not>.*) thrown$/,
    function (is_or_is_not) {
        for (const method of AllMethods) {
            if (is_or_is_not == 'is') {
                assert.notEqual(this.exceptions[method], null)
            } else if (is_or_is_not == 'is not') {
                assert.equal(this.exceptions[method], null)
            }
        }
    })


/*
Scenario Outline: Error handling configured with network throws disabled
    Given an Api configured to not throw on network error
    When sending a request with this result <result>
    Then an exception <is_or_is_not> thrown
 */

Given('an Api configured to not throw on network error',
    function () {
        this.api = new Api('http://example.org')
        this.api.errorHandling.raiseForNetworkError = false
    })

// When sending a request with this result <result>

// Then an exception <is_or_is_not> thrown


/*
Scenario Outline: Error handling configured to throw >399
    Given an Api configured to throw on status codes >399
    When sending a request with this result <result>
    Then an exception <is_or_is_not> thrown
 */

Given('an Api configured to throw on status codes >399',
    function () {
        this.api = new Api('http://example.org')
        this.api.errorHandling.raiseForStatusCodes = '>399'
    })

// When sending a request with this result <result>

// Then an exception <is_or_is_not> thrown


/*
Scenario Outline: Error handling configured to throw >399, except 404
    Given an Api configured to throw on status codes >399, except 404
    When sending a request with this result <result>
    Then an exception <is_or_is_not> thrown
 */

Given('an Api configured to throw on status codes >399, except 404',
    function () {
        this.api = new Api('http://example.org')
        this.api.errorHandling.raiseForStatusCodes = '400-403 >404 '
    })

// When sending a request with this result <result>

// Then an exception <is_or_is_not> thrown


/*
Scenario: Can override error handling configuration per request
    Given an Api with default error handling configuration
    When a request results in a non-successful status code
    And the code asks to throw an exception for non-successful status codes
    Then based on the override settings <settings> an exception <is_or_is_not> thrown
 */

// Given an Api with default error handling configuration

When('a request results in a status code of 401',
    async function () {
        const url = 'http://example.org/error'
        server.use(
            http.all(url, async () => {
                return new HttpResponse("error", {status: 401})
            })
        )
        this.resources = {}
        for (const method of AllMethods) {
            this.resources[method] = await this.api.usingEndpoint(url)[method.toLowerCase()]()
        }
    })

When('the code asks to throw an exception for non-successful status codes',
    function () {
        for (const method of AllMethods) {
            assert.ok(this.resources[method]._halchemy.raiseForStatusCodes,'raiseForStatusCodes should be defined')
        }
    })

Then(/based on the override settings (?<settings>.*) an exception (?<is_or_is_not>.*) thrown/,
    function (settings, is_or_is_not) {
        const expected = is_or_is_not == 'is'
        for (const method of AllMethods) {
            let exceptionThrown = !expected  // i.e. will fail unless successfully changed
            try {
                if (settings == 'empty') {
                    this.resources[method]._halchemy.raiseForStatusCodes()
                } else {
                    this.resources[method]._halchemy.raiseForStatusCodes(settings)
                }
                exceptionThrown = false
            } catch (e) {
                const halchemy = e as HalchemyMetadata
                exceptionThrown = halchemy.hasOwnProperty('response') && halchemy.response.statusCode == 401
            }
            assert.equal(exceptionThrown, expected, `using ${settings} it was expected that an exception ${is_or_is_not} thrown, but ${exceptionThrown? 'was' : 'was not'}`)
        }
    })

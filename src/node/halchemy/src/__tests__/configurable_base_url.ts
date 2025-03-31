import { http, HttpResponse } from 'msw'
import {Given, When, Then, Before} from '@cucumber/cucumber'
import assert from 'assert'     // https://nodejs.org/api/assert.html
import {AllMethods, BeforeFeature, RequestContext, server} from "./_setup_teardown";
import { Api } from '../lib'

let requestContext: RequestContext = {
    urls: {},
    headers: {}
}

let isHome: boolean = false

BeforeFeature('Configuring the base URL influences requests to relative urls but not absolute urls.',
    function ()  {
    server.resetHandlers()
    server.use(
        http.all('*', async ({request}) => {
            requestContext.urls[request.method] = request.url
            return new HttpResponse(null, {status: 200})
        })
    )
})

Before(() =>{
    isHome = false
})


/*
Scenario Outline:  Request the home resource
    Given the Api is created with a <base_url>
    When I GET the home resource
    Then the request is made to the <expected_url>
 */

Given(/the Api is created with a (?<baseUrl>.*)/,
    function (baseUrl: string) {
        this.api = new Api(baseUrl)
    })

When('I GET the home resource',
    async function () {
        isHome = true
        await this.api.home.get()
    })

Then(/the request is made to the (?<expectedUrl>.*)/,
    function (expectedUrl: string) {
        AllMethods.forEach((method) => {
            if (isHome && method == 'GET' || !isHome) {
                assert.equal(requestContext.urls[method], expectedUrl)
            }
        })
    })


/*
Scenario Outline:  Make requests using urls which are relative to the configured base URL
    Given the Api is created with a <base_url>
    When a request is given a <relative_url>
    Then the request is made to the <expected_url>
 */

// Given the Api is created with a <base_url>

When(/a request is given a (?<relativeUrl>.*)/,
    async function (relativeUrl: string) {
        // await Promise.all(
        //     AllMethods.map(async (method) => {
        //         await this.api.usingEndpoint(relativeHref)[method.toLowerCase()]()
        //     })
        // )
        // spelling these out here so the IDE usage count for each is at least one
        await this.api.usingEndpoint(relativeUrl).get()
        await this.api.usingEndpoint(relativeUrl).post()
        await this.api.usingEndpoint(relativeUrl).put()
        await this.api.usingEndpoint(relativeUrl).patch()
        await this.api.usingEndpoint(relativeUrl).delete()
        await this.api.usingEndpoint(relativeUrl).head()
        await this.api.usingEndpoint(relativeUrl).options()
    })

// Then the request is made to the <expected_url>


/*
Scenario Outline: Make requests with an absolute url which ignores the configured base URL
    Given the Api is created with a <base_url>
    When the request is given an <absolute_url>
    Then the request is made to that <absolute_url>
 */

// Given the Api is created with a <base_url>

When(/the request is given an (?<absoluteUrl>.*)/,
    async function (absoluteUrl: string) {
        await Promise.all(
            AllMethods.map(async (method) => {
                await this.api.usingEndpoint(absoluteUrl)[method.toLowerCase()]()
            })
        )
    })

Then(/the request is made to that (?<absoluteUrl>.*)/,
    function (absoluteUrl) {
        AllMethods.forEach((method) => {
            assert.equal(requestContext.urls[method].replace(/\/$/, ''), absoluteUrl)
        })
    })


/*
Scenario Outline:  Can change the base URL
    Given the Api is created with a <base_url>
    And is later changed to a <new_base_url>
    When a request is given a <relative_url>
    Then the request is made to the <expected_url>
 */

// Given the Api is created with a <base_url>

Given(/is later changed to a (?<newBaseUrl>.*)/,
    function (newBaseUrl: string) {
        this.api.baseUrl = newBaseUrl
    })

// When a request is given a <relative_url>

// Then the request is made to the <expected_url>

import {http, HttpResponse} from 'msw'
import {Given, Then, When} from '@cucumber/cucumber'
import assert from "assert";  // https://nodejs.org/api/assert.html
import {AllMethods, BeforeFeature, RequestContext, PayloadMethods, server} from "./_setup_teardown";
import {Api} from '../lib'
import {compareJsonStrings} from "./compare_json_strings";


let requestContext: RequestContext = {
    urls: {},
    headers: {}
}


BeforeFeature('Follows link relations provided by a HAL resource.',
    function () {
        requestContext.urls = {}
        requestContext.headers = {}

        server.resetHandlers()
        server.use(
            http.all('http://example.org/', async () => {
                return HttpResponse.json({
                    _links: {
                        self: {href: '/'},
                        resource1: {href: '/path/to/resource1'},
                        resource2: {href: '/resource2/is/the/path'}
                    }
                })
            }),
            http.all('*', async ({request}) => {
                const method = request.method
                let url = request.url
                if (url.includes('find')) {
                    url = url + '#results'  // TODO: yuck, total hack, but whattaya gonna do?
                }

                requestContext.urls[method] = url
                requestContext.headers[method] = request.headers
                return HttpResponse.json({url: url})
            })
        )
    })


/*
Scenario: Make requests using links provided by a resource
    Given a HAL resource
    When I make a request using its link relations
    Then the href of the link is used for the request
 */

Given('a HAL resource',
    async function () {
        this.api = new Api('http://example.org')
        this.home = await this.api.home.get()
    })

When('I make a request using its link relations',
    async function () {
        this.calls = {}
        for (const [rel] of Object.entries(this.home._links)) {
            if (rel == 'self') continue
            await Promise.all(
                AllMethods.map(async (method) => {
                    this.calls[method] = this.calls[method] || {}
                    this.calls[method][rel] = await this.api.follow(this.home).to(rel)[method.toLowerCase()]()
                })
            )
        }
    })

Then('the href of the link is used for the request',
    function () {
        AllMethods.forEach((method) => {
            for (const [rel, result] of Object.entries(this.calls[method])) {
                const actualUrl = (result as { _halchemy: any })._halchemy.response.body.url
                const expectedUrl = this.home._links[rel].href
                assert.ok(actualUrl.endsWith(expectedUrl))
            }
        })
    })


/*
Scenario: Make request to non-existent link relation
    Given a HAL resource
    When I make a request to a link relation the resource does not have
    Then the request fails, informing me of the issue
*/

// Given a HAL resource

When('I make a request to a link relation the resource does not have',
    async function () {
        try {
            await this.api.follow(this.home).to('non-existent').get()
            this.error = null
        } catch (e) {
            this.error = e
        }
    })

Then('the request fails, informing me of the issue',
    function () {
        assert.ok(this.error)
        assert.equal(this.error.message, "This resource does not have a link relation named 'non-existent'")
    })


/*
Scenario: Inspect links
    Given a HAL resource
    When I ask for the links it has
    Then I get a list of its relations
*/

// Given a HAL resource

When('I ask for the links it has',
    function () {
        this.links = this.home.links
    })

Then('I get a list of its relations',
    function () {
        const expected = Object.keys(this.home._links)
        assert.deepEqual(this.links, expected)
    })


/*
Scenario: Has link relation
    Given a HAL resource
    When I ask if it has a link relation
    Then it tells me whether it does or not
 */

// Given a HAL resource

When('I ask if it has a link relation',
    function () {
        this.hasRel = (rel: string) => this.home.hasRel(rel)
    })

Then('it tells me whether it does or not',
    function () {
        assert.ok(this.hasRel('self'))
        assert.ok(this.hasRel('resource1'))
        assert.ok(this.hasRel('resource2'))
        assert.ok(!this.hasRel('non-existent'))
    })


/*
Scenario: Make requests with additional headers
    Given a HAL resource
    When I specify additional headers for a request
    Then the request is made with those headers
*/

// Given a HAL resource

When('I specify additional headers for a request',
    async function () {
        this.headers = {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
            'Cache-control': 'no-cache',
            'Connection': 'close',
            'User-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36'
        }
        for (const method of AllMethods) {
            this.response = await this.api.follow(this.home).to('resource1').withHeaders(this.headers)[method.toLowerCase()]()
        }
    })

Then('the request is made with those headers',
    function () {
        type requestKey = keyof typeof requestContext.headers
        for (const header in this.headers) {
            const value = this.headers[header]
            AllMethods.forEach((method) => {
                const requestHeaders = requestContext.headers[method as requestKey] as Headers
                assert.ok(requestHeaders.has(header))
                assert.equal(requestHeaders.get(header), value)
            })
        }
    })


/*
Scenario: Request headers are only for that request
    Given I have made a request with additional headers
    When I make a new request without headers
    Then the previous request's headers are not included
 */

Given('I have made a request with additional headers',
    async function () {
        this.headers = {
            'Cache-control': 'no-cache'
        }
        this.api = new Api('http://example.org')
        this.home = await this.api.home.get()
        for (const method of AllMethods) {
            await this.api.follow(this.home).to('resource1').withHeaders(this.headers)[method.toLowerCase()]()
        }
    })

When('I make a new request without headers',
    async function () {
        for (const method of AllMethods) {
            this.response = await this.api.follow(this.home).to('resource1')[method.toLowerCase()]()
        }
    })

Then("the previous request's headers are not included",
    function () {
        type requestKey = keyof typeof requestContext.headers
        for (const header in this.headers) {
            AllMethods.forEach((method) => {
                const requestHeaders = requestContext.headers[method as requestKey] as Headers
                assert.ok(!requestHeaders.has(header))
            })
        }
    })


/*
Scenario Outline: Make requests with query string / parameters
    Given a HAL resource
    When I supply <parameters>
    Then the parameters are added to the URL as an RFC 3986 compliant <query_string>
 */

// Given a HAL resource

When(/I supply (?<parameters>.*)/,
    async function (parameters: string) {
        for (const method of AllMethods) {
            const params = JSON.parse(parameters)
            await this.api.follow(this.home).to('resource1').withParameters(params)[method.toLowerCase()]()
        }
    })

Then(/the parameters are added to the URL as an RFC 3986 compliant (?<queryString>.*)/,
    async function (queryString: string) {
        type requestKey = keyof typeof requestContext.headers
        AllMethods.forEach((method) => {
            const calledQueryString = requestContext.urls[method as requestKey].split('?')[1]
            assert.equal(calledQueryString, queryString)
        })
    })


/*
Scenario Outline:  Adding parameters to URL forms correct URLs in all cases
   Given an endpoint at <url>
   When I supply <parameters>
   Then the result is a <correct_url>
 */

Given(/an endpoint at (?<url>.*)/,
    function (url: string) {
        this.api = new Api(url)
        this.endpoint = this.api.usingEndpoint(url)
    })

When(/I provide (?<parameters>.*)/,
    function (parameters: string) {
        const params = JSON.parse(parameters)
        this.url = this.endpoint.withParameters(params).url
    })

Then(/the result is a (?<correctUrl>.*)/,
    function (correctUrl: string) {
        assert.ok(this.url.endsWith(correctUrl))
    })


/*
Scenario Outline: Can change how lists are serialized to query string
    Given a HAL resource
    And I choose a parameters <list_style>
    When I supply <parameters>
    Then the parameters are added to the URL as an RFC 3986 compliant <query_string>
 */

// Given a HAL resource

Given(/I choose a parameters (?<listStyle>.*)/,
    function (listStyle: string) {
        this.api.parametersListStyle = listStyle
    })

// When I supply <parameters>

// Then the parameters are added to the URL as an RFC 3986 compliant <query_string>


/*
Scenario Outline: Make requests to templated URLs
    Given a HAL resource with a link that is a <templated_href>
    When I follow that link and provide <template_values>
    Then the requested URL ends with the <correct_path>
 */

Given(/a HAL resource with a link that is an RFC 6570 compliant (?<templatedHref>.*)/,
    async function (templatedHref: string) {
        this.api = new Api('http://example.org')
        this.home = await this.api.home.get()
        this.resource = {
            '_links': {
                'self': {'href': '/resource1'},
                'next': {
                    'href': templatedHref,
                    'templated': true
                }
            }
        }
    })

When(/I follow that link and provide (?<templateValues>.*)/,
    async function (templateValues: string) {
        this.templateValues = JSON.parse(templateValues)
        for (const method of AllMethods) {
            this.response = await this.api.follow(this.resource).to('next').withTemplateValues(this.templateValues)[method.toLowerCase()]()
        }
    })

Then(/the requested URL ends with the (?<correctUrl>.*)/,
    async function (correctUrl: string) {
        type requestKey = keyof typeof requestContext.headers
        AllMethods.forEach((method) => {
            const calledUrl = requestContext.urls[method as requestKey]
            assert.ok(calledUrl.endsWith(correctUrl), `The called URL "${calledUrl}" should end with the correct url "${correctUrl}" but does not`)
        })
    })


/*
Scenario Outline: Using templated URLs handles missing values
    Given a HAL resource with a link that is a <templated_href>
    When the <template_values> provided are missing one or more values
    Then the constructed URL ends with the <correct_path>
 */

// Given a resource with a HAL style <templated_href>

When(/the (?<templateValues>.*) provided are missing one or more values/,
    function (templateValues: string) {
        const values = templateValues == '-omit-' ? {} : JSON.parse(templateValues)
        try {
            this.constructedUrl = this.api.follow(this.resource).to('next').withTemplateValues(values).url
            this.error = null
        } catch (e) {
            this.error = e
        }
    })

Then(/the constructed URL ends with the (?<correctUrl>.*)/,
    function (correctUrl: string) {
        assert.ok(!this.error, 'An exception should not be thrown but was')
        assert.ok(this.constructedUrl.endsWith(correctUrl), `The constructed URL "${this.constructedUrl}" should end with the correct url "${correctUrl}" but does not`)
    })


/*
Scenario Outline: HTTP response details available after a successful request
    Given a HAL resource
    When I make a request
    Then the HTTP response details are available to me
 */

// Given a HAL resource

When('I make a request',
    async function () {
        this.resources = {}
        for (const method of AllMethods) {
            this.resources[method] = await this.api.usingEndpoint('https://google.ca:2112/some/path?this=that')[method.toLowerCase()]()
        }
    })

Then('the HTTP request and response details are available to me',
    function () {
        AllMethods.forEach((method) => {
            const response = this.resources[method]._halchemy.response
            const request = this.resources[method]._halchemy.request
            assert(Object.entries(response).length > 0, 'the response is populated')
            assert.equal(request.method, method, 'method is correct: ' + method)
            assert.equal(request.url, requestContext.urls[method], 'url is correct')
            assert.equal(response.statusCode, 200, 'statusCode is correct')
            assert.equal(response.reason, 'OK', 'reason is correct')
            // TODO: check response.headers
            assert.equal(response.body.url, requestContext.urls[method], 'body is correct')
            assert.equal(this.resources[method]._halchemy.error, null, 'error is null')
        })
    })


/*
Scenario Outline: Error details available after a failed request
    Given a HAL resource
    When the request I made fails: <failure>
    Then I can access the error details
 */

// Given a HAL resource

When(/the request I made fails: (?<failure>.*)/,
    async function (failure) {
        const url = 'http://example.org/error'
        if (failure.startsWith('status_code')) {
            const statusCode = parseInt(failure.split(':')[1])
            server.use(
                http.all(url, async () => {
                    return new HttpResponse(failure, {status: statusCode})
                })
            )
        } else if (failure == 'network error') {
            server.use(
                http.all(url, async () => {
                    return HttpResponse.error()
                })
            )
        } else if (failure.startsWith('timeout')) {
            server.use(
                http.all(url, async () => {
                    return HttpResponse.error()  // cannot find how to simulate a timeout with msw
                })
            )
        }

        this.resources = {}
        this.failures = {}
        for (const method of AllMethods) {
            this.failures[method] = failure
            try {
                this.resources[method] = await this.api.usingEndpoint(url)[method.toLowerCase()]()
            } catch (resource) {
                this.resources[method] = resource
            }
        }
    })

Then('I can access the error details',
    function () {
        AllMethods.forEach((method) => {
            const failure = this.failures[method]
            const response = this.resources[method]._halchemy.response
            const error = this.resources[method]._halchemy.error
            if (failure.startsWith('status_code')) {
                const statusCode = parseInt(failure.split(':')[1])
                assert.equal(response.statusCode, statusCode, `statusCode is ${statusCode}`)
            } else {
                assert.equal(response.statusCode, 0, `statusCode is 0 if no response`)
                assert.equal(response.reason, 'Did not receive a response from the server', 'default reason if no response')
                assert.equal(Object.entries(response.body), 0, 'no body if no response')
            }
            assert(error, 'error is present')
        })
    })


/*
Scenario: I can pass a native-language object representation of a JSON body
    Given a HAL resource
    When I use an object my language uses to represent JSON as the payload of a request
    Then the request body is properly formatted JSON
 */

// Given a HAL resource

When('I use an object my language uses to represent JSON as the payload of a request',
    async function () {
        this.data = {
            'key1': 'value1',
            'key2': 'value2',
            'key3': 3,
            'key4': true,
            'key5': false,
            'key6': null,
            'key7': [1, 2, 3],
            'key8': {'nested': 'object'}
        }
        this.resources = {}
        this.contentTypes = {}
        this.bodies = {}
        for (const method of PayloadMethods) {
            const resource = await this.api.usingEndpoint('http://example.org/payload')[method.toLowerCase()](this.data)
            this.contentTypes[method] = resource._halchemy.request.headers.get('Content-type')
            this.bodies[method] = resource._halchemy.request.body
            this.resources[method] = resource
        }
    })

Then('the request body is properly formatted JSON',
    function () {
        PayloadMethods.forEach((method) => {
            const expectedJsonString = JSON.stringify(this.data)
            const response = this.resources[method]._halchemy.response
            assert.ok(response.statusCode >= 200 && response.statusCode < 300, `response.statusCode should be 2xx`)
            assert.equal(this.contentTypes[method], 'application/json', 'Content-type should be application/json')
            assert.ok(compareJsonStrings(this.bodies[method], expectedJsonString), 'response body should be the same as the payload')
        })
    })


/*
Scenario Outline: I can pass a native-language non-object representation of a JSON body
    Given a HAL resource
    When I use data type that is not an object but is valid as JSON, e.g. <data>
    Then the request body is properly formatted JSON
 */

// Given a HAL resource

When(/I use data type that is not an object but is valid as JSON, e.g. (?<data>.*)/,
    async function (data: string) {
        this.bodies = {}
        this.resources = {}
        this.contentTypes = {}
        if (data == '"true"' || data == '"false"') {
            this.data = data.includes('true') ? 'true' : 'false'
        } else if (data == 'null') {
            this.data = null
        } else if (data == '{}') {
            this.data = {}
        } else {
            this.data = eval(data)
        }
        for (const method of PayloadMethods) {
            const resource = await this.api.follow(this.home).to('resource1')[method.toLowerCase()](this.data)
            this.bodies[method] = resource._halchemy.request.body
            this.contentTypes[method] = resource._halchemy.request.headers.get('Content-type')
            this.resources[method] = resource
        }
    })

// Then the request body is properly formatted JSON


/*
Scenario Outline: I can pass non-JSON data and set its content-type
    Given a HAL resource
    When the payload of a request is has <data> of a different <content_type>
    Then the request is made with the correct <data> and <content_type> header
 */

// Given a HAL resource

When(/the payload of a request is has (?<data>.*) of a different (?<contentType>.*)/,
    async function (data: string, contentType: string) {
        this.statusCodes = {}
        this.contentTypes = {}
        this.bodies = {}
        this.data = data.startsWith('object:') ? JSON.parse(data.split('=>')[0].substring(7)) : data
        for (const method of PayloadMethods) {
            const resource = await this.api.follow(this.home).to('resource1')[method.toLowerCase()](this.data, contentType)
            this.statusCodes[method] = resource._halchemy.response.statusCode
            this.contentTypes[method] = resource._halchemy.request.headers.get('Content-Type')
            this.bodies[method] = resource._halchemy.request.body
        }
    })

Then(/the request is made with the correct (?<data>.*) and (?<contentType>.*) header/,
    function (data: string, contentType: string) {
        PayloadMethods.forEach((method) => {
            const statusCode = this.statusCodes[method]
            assert.ok(statusCode >= 200 && statusCode < 300, `response ${statusCode} should be 2xx`)
            if (data.startsWith('object:')) {
                data = data.split('=>')[1]
            }
            assert.equal(this.contentTypes[method], contentType, 'Content-type should be ' + contentType)
            assert.equal(this.bodies[method], data, 'request body has the correct data')
        })
    })


When('I make a request that returns JSON in the body',
    async function () {
        const url = 'http://example.org/error'
        const response_body = {
            _status: "ERR",
            _error: {
                code: 404,
                message: "The requested URL was not found on the server. " +
                    "If you entered the URL manually please check your spelling and try again."
            }
        }
        server.use(
            http.all(url, async () => {
                return HttpResponse.json(response_body, {status: 404})
            })
        )

        this.resources = {}
        for (const method of AllMethods) {
            try {
                this.resources[method] = await this.api.usingEndpoint(url)[method.toLowerCase()]()
            } catch (resource) {
                this.resources[method] = resource
            }
        }
    })

Then('I can use the body in the way my language supports JSON',
    function () {
        AllMethods.forEach((method) => {
            const body = this.resources[method]._halchemy.response.body
            assert.equal(typeof body, 'object')
        })
    })

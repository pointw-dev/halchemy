Feature: HTTP details are available, but separate from resource representation.

    Halchemy features a resource first approach to HTTP requests.  That is to say,
    unlike traditionally http libraries which return a response object full of http
    details that you mine to get at the data, when you request a resource with halchemy,
    you receive that resource directly.  If you want to see the http details from the
    last response (e.g. status code, response headers, etc.) they are still available
    even though they are not in the object returned by the request.

    Scenario: HTTP response details available after a successful request
        Given a HAL resource
        When I make a request
        Then the HTTP request and response details are available to me


    Scenario Outline: Error details available after a failed request
        Given a HAL resource
        When the request I made fails: <failure>
        Then I can access the error details

        Examples:
        | failure         |
        | status_code:401 |
        | status_code:500 |
        | network error   |
        | timeout         |

    Scenario: _halchemy.response.body is my languages representation of JSON when that is what was returned
        Given a HAL resource
        When I make a request that returns JSON in the body
        Then I can use the body in the way my language supports JSON

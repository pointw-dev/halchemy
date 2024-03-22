Feature: Add or modify headers on a per request basis.

    Each request will use the default headers you configured with the Api object.
    You can also provide headers that apply just for a given request.

    Scenario: Make requests with additional headers
        Given a HAL resource
        When I specify additional headers for a request
        Then the request is made with those headers

    Scenario: Request headers are only for that request
        Given I have made a request with additional headers
        When I make a new request without headers
        Then the previous request's headers are not included

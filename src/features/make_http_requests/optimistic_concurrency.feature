Feature: Makes using optimistic concurrency easier.

    Optimistic concurrency means assuming that if you have a resource and you want
    to modify or delete it, that between when you got it and when you change it no
    one else has pushed a change into the API.  If your assumption is correct, your
    change is made.  If not, the API responds with an error - letting you re-fetch the
    resource, merge your changes, override the other changes, put the choice to the 
    user, or whatever handle the situation however makes sense in your application.
    
    Halchemy makes handling optimistic concurrency easy by inferring, out of the box,
    which headers are necessary in a request to change a resource, and letting you 
    configure how halchemy does so.
    
    A server that supports optimistic concurrency will respond to a PUT, POST, or PATCH
      with a status code of 428 if the request does not have an If-Match 
        or If-Unmodified-Since header
      with a status code of  412 if the If-Match header's value is different than the
        etag the server has, or the resource was modified after the If-Unmodified-Since date


    Scenario: Out-of-the-box (AUTO_ETAG) uses Etag header
        Given a modifiable HAL resource
        When I request a change to the resource
        Then the If-Match header uses the resource's Etag header        

    Scenario: Out-of-the-box (AUTO_ETAG) uses _etag field if Etag header is missing
        Given a modifiable HAL resource
        And the response does not have an Etag header
        When I request a change to the resource
        Then the If-Match header uses the resource's _etag field

    Scenario: Out-of-the-box (AUTO_ETAG) _etag field and Etag header is missing
        Given a modifiable HAL resource
        And the response does not have an Etag header
        And the resource does not have an _etag field
        When I request a change to the resource
        Then the request is made without an If-Match header

Feature: Configuring the default headers causes requests to include them.

    You can create an Api object without specifying headers.  It will have headers
    that make sense for a HAL-based API.  You can also add more default headers, change
    the value of the out-of-the-box headers, or remove any of the above.  Finally, even after
    creating the Api object with or without additional headers, you can reset default headers
    that will be used on all subsequent calls.

    Note: the first scenario has reference to method_type, but is ignored for now.  This is
          a roadmap item that will be added in the future, and when it does either new scenarios
          will be added or these ones modified with the option to specify method and/or method_type.


    Scenario Outline:  Has sensible out-of-the-box headers
        Given the Api is created with no headers
        When a request is sent
        Then the request contains each <header> with its <value> for all sensible ones for the <method_type>
        # And the request does not contain the <header> if its method is not of the corresponding <method_type>

        Examples:
        | method_type | header        | value                                                   |
        | all         | Authorization | Basic cm9vdDpwYXNzd29yZA==                              |
        | write       | Content-type  | application/json                                        |
        | read        | Accept        | application/hal+json, application/json;q=0.9, */*;q=0.8 |


    Scenario: Can add or modify default headers
        Given the Api is created with headers
        When a request is sent
        Then the request contains the headers and their values


    Scenario Outline: Can override out of the box headers
        Given an Api is created with a different <value> for an out-of-the-box <header>
        When a request is sent
        Then the request contains the <header> with the new <value>

        Examples:
            | header        | value                                                                                              |
            | Authorization | Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwiaWF0IjoyfQ.nMoAK-oiZTdVT0CcGhgS5yCscaNSf49BYFR3DiGT3tM |
            | Content-type  | application/xml                                                                                    |
            | Accept        | application/xml                                                                                    |


    Scenario Outline:  Can add or override headers after creation
        Given the Api is created with no headers
        And later is given new a new <header> with its <value>
        When a request is sent
        Then the request contains each new <header> with its <value>

        Examples:
        | header        | value                                                                                                                                                              |
        | Authorization | Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c |
        | Content-type  | application/xml                                                                                                                                                    |
        | Accept        | application/json                                                                                                                                                   |
        | Cache-control | no-cache                                                                                                                                                           |
        # Connection is set to keep-alive by the underlying library, not halchemy - testing here that even such headers are overriden:
        | Connection    | close                                                                                                                                                         |
        | User-agent    | Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36                                           |


    Scenario: Header changes are case-insensitive
        Given the Api is created with headers
        When I set a new value to a previously added header but with a different case
        Then the header is changed not added


    Scenario: Can remove headers after creation
        Given the Api is created with headers
        And later some headers are removed
        When a request is sent
        Then the request does not contain the removed headers

    # NOTE: the underlying http library may add back headers that were removed, e.g. Connection, User-agent


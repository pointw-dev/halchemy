Feature: You can configure how halchemy responds to errors.
    Every time you make a request to the API, something could go wrong.  There are two kinds of wrong occurrences:
    * the request was not successfully sent
    * the response was not what you were expecting

    How your application reacts to these occurrences is up to you.  Out of the box, halchemy throws exceptions in the first
    case (e.g. a network error or timeout), and considers the request a success in the second - that is the request
    was successfully made and a response was successfully received.  This means if an exception is not thrown, your
    code can decide what to do with the response.


    Scenario Outline: Out-of-box error handling configuration
        Given an Api with default error handling configuration
        When a request has this result <result>
        Then an exception <is_or_is_not> thrown

        Examples:
        | result          | is_or_is_not |
        | status_code:100 | is_not       |
        | status_code:200 | is_not       |
        | status_code:204 | is_not       |
        | status_code:301 | is_not       |
        | status_code:400 | is_not       |
        | status_code:401 | is_not       |
        | status_code:404 | is_not       |
        | status_code:500 | is_not       |
        | status_code:502 | is_not       |
        | network error   | is           |
        | timeout         | is           |


    Scenario Outline: Error handling configured with network throws disabled
        Given an Api configured to not throw on network error
        When a request has this result <result>
        Then an exception <is_or_is_not> thrown

        Examples:
        | result          | is_or_is_not |
        | status_code:100 | is_not       |
        | status_code:200 | is_not       |
        | status_code:204 | is_not       |
        | status_code:301 | is_not       |
        | status_code:400 | is_not       |
        | status_code:401 | is_not       |
        | status_code:404 | is_not       |
        | status_code:500 | is_not       |
        | status_code:502 | is_not       |
        | network error   | is_not       |
        | timeout         | is_not       |


    Scenario Outline: Error handling configured to throw >399
        Given an Api configured to throw on status codes >399
        When a request has this result <result>
        Then an exception <is_or_is_not> thrown

        Examples:
        | result          | is_or_is_not |
        | status_code:100 | is_not       |
        | status_code:200 | is_not       |
        | status_code:204 | is_not       |
        | status_code:301 | is_not       |
        | status_code:399 | is_not       |
        | status_code:400 | is           |
        | status_code:401 | is           |
        | status_code:404 | is           |
        | status_code:500 | is           |
        | status_code:502 | is           |
        | network error   | is           |
        | timeout         | is           |


    Scenario Outline: Error handling configured to throw >399, except 404
        Given an Api configured to throw on status codes >399, except 404
        When a request has this result <result>
        Then an exception <is_or_is_not> thrown

        Examples:
            | result          | is_or_is_not |
            | status_code:100 | is_not       |
            | status_code:200 | is_not       |
            | status_code:204 | is_not       |
            | status_code:301 | is_not       |
            | status_code:400 | is           |
            | status_code:401 | is           |
            | status_code:404 | is_not       |
            | status_code:500 | is           |
            | status_code:502 | is           |
            | network error   | is           |
            | timeout         | is           |


    Scenario Outline: Can override error handling configuration
        Given an Api with default error handling configuration
        When a request results in a status code of 401
        And the code asks to throw an exception for non-successful status codes
        Then based on the override settings <settings> an exception <is_or_is_not> thrown

        Examples:
            | settings      | is_or_is_not |
            | empty         | is           |
            | >=400         | is           |
            | 400-403, >404 | is           |
            | 404           | is_not       |
            | 400 >401      | is_not       |

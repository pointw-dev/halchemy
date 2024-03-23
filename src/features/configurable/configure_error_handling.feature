Feature: You can configure how halchemy responds to errors.
  Every time you make a request to the API, something could go wrong.  There are two kinds of wrong occurrences:
  * the request was not successfully sent
  * the response was not what you were expecting

  How your application reacts to these occurrences is up to you.  Out of the box, halchemy throws exceptions in the first
  case (e.g. a network error or timeout), and considers the request a success in the second - that is the request
  was successfully made and a response was successfully received.  This means if an exception is not thrown, your
  code can decide what to do with the response.

  Scenario: Out-of-box error handling configuration
    Given an Api with default error handling configuration
    When I make the request that fails due to a network error
    Then an exception is thrown
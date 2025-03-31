Feature: Can make use of embedded data in HAL resources
    A HAL resource may contain representations of other resources.  HAL makes this other data
    available using a property called _embedded.

    There are two main categories of embedded resources:
    * a parent/child or child/parent
      * e.g. GET /author and it contains a list of book resources written by that author
      * GET /books/{id} and it contains the author resource of that book
    * a collection/items
      * e.g. GET /accounts, which is a collection resource, and it contains a list of each account resource)

    Halchemy makes it easy to process the _embedded resource(s), and ensures each embedded resource
    is a dictionary/object enriched with additional functionality.

    The scenarios below will operate on the following HAL representation of a library membership
    * a membership is for a single library
    * a membership can have a number of books currently on-loan

    {
        "_id": "39402",
        "memberName": "Pat Doe",
        "address": "123 Main St.",
        "_links": {
            "self": { "href": "/members/39402" },
            "library": { "href": "/libraries/2389" },
            "books": { "href": "/members/39402/books" }
        },
        "_embedded": {
            "library": {
                "name": "Essex County Library",
                "_links": {
                    "self": { "href": "/libraries/2389" }
                }
            },
            "book": [
                {
                    "title": "Stephen's Kingdom",
                    "edition": "1st",
                    "_links": {
                        "self": { "href": "/books/3845" }
                    }
                },
                {
                    "title": "Nature Valley",
                    "edition": "paperback",
                    "_links": {
                        "self": { "href": "/books/8842" }
                    }
                }
            ]
        }
    }


    Background:
        Given a HalResource with an embedded property containing both a single resource and a resource collection

    Scenario: Accessing a single embedded resource with no expectation
        When I retrieve the embedded resource with the library rel
        Then I should receive a single HalResource instance
        And the resource should contain the expected data for the library

    Scenario: Accessing an embedded collection resource with no expectation
        When I retrieve the embedded resource with the book rel
        Then I should receive a collection of HalResource instances
        And the resource should contain the expected book data

    Scenario: Accessing an embedded resource with expect set to one
        When I retrieve the embedded resource with rel library and expect one
        Then I should receive a single HalResource instance
        And the resource should contain the expected data for the library

    Scenario: Accessing an embedded resource with expect set to many
        When I retrieve the embedded resource with rel book and expect many
        Then I should receive a collection of HalResource instances
        And the resource should contain the expected book data

    Scenario: Using the embedded_one method
        When I call embedded_one with rel library
        Then I should receive a single HalResource instance

    Scenario: Using the embedded_many method
        When I call embedded_many with rel book
        Then I should receive a collection of HalResource instances

    Scenario: Expecting many but the resource is a single object
        When I retrieve the embedded resource with rel library and expect many
        Then an error should be raised indicating a type mismatch

    Scenario: Expecting one but the resource is a collection
        When I retrieve the embedded resource with rel book and expect one
        Then an error should be raised indicating a type mismatch

    Scenario: Accessing a non-existent embedded resource
        When I retrieve the embedded resource with the non-existent rel
        Then an error should be raised indicating the resource is not found

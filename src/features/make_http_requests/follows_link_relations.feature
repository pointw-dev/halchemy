Feature: Follows link relations provided by a HAL resource.

    This is main point of of this library.  Given a HAL resource you can follow its links
    and make requests to the targets of those links.  This saves your client code from having
    to manage or memorize multiple endpoints.  You never have to store or build
    any other URL than the base URL.  Create the Api object with the base URL of
    the service and you have full access to all of its capabilities and data by way of
    the affordances provided by the resources you fetch.

    If you make a request with a JSON body (Content-type: application/json), you can pass an
    object type appropriate for your language (e.g. a dict in Python, Newtonsoft.Json in C#, etc).
    Halchemy will convert to a stringified JSON for you.


    Scenario: Make requests using links provided by a resource
        Given a HAL resource
        When I make a request using its link relations
        Then the href of the link is used for the request


    Scenario: Make request to non-existent link relation
        Given a HAL resource
        When I make a request to a link relation the resource does not have
        Then the request fails, informing me of the issue


    Scenario: Inspect links
        Given a HAL resource
        When I ask for the links it has
        Then I get a list of its relations


    Scenario: Has link relation
        Given a HAL resource
        When I ask if it has a link relation
        Then it tells me whether it does or not


    Scenario: I can pass a native-language object representation of a JSON body
        Given a HAL resource
        When I use an object my language uses to represent JSON as the payload of a request
        Then the request body is properly formatted JSON


    Scenario Outline: I can pass a native-language non-object representation of a JSON body
        Given a HAL resource
        When I use data type that is not an object but is valid as JSON, e.g. <data>
        Then the request body is properly formatted JSON

        Examples:
            | data                                                               |
            | 50                                                                 |
            | -12                                                                |
            | 3.141592653                                                        |
            | "a simple string"                                                  |
            | true                                                               |
            | false                                                              |
            | "true"                                                             |
            | "false"                                                            |
            | null                                                               |
            | ""                                                                 |
            | []                                                                 |
            | {}                                                                 |
            | [1,2,3]                                                            |
            | ["apple", "banana", "cherry"]                                      |
            | [{"name":"John Doe","age":50}, {"name": "Jane Smith", "age": 30 }] |


    Scenario Outline: I can pass non-JSON data and set its content-type
        Given a HAL resource
        When the payload of a request is has <data> of a different <content_type>
        Then the request is made with the correct <data> and <content_type> header

        Examples:
        | data                                                      | content_type                      |
        | name=John+Doe&age=50                                      | application/x-www-form-urlencoded |
        | object:{"name":"John Doe","age":50}=>name=John+Doe&age=50 | application/x-www-form-urlencoded |
        | <person><name>John Doe</name><age>50</age></person>       | application/xml                   |
        | My name is John Doe.  I am 50 years old.                  | text/plain                        |


    @skip
    Scenario:  I can upload a file
        Given a HAL resource
        When I upload a file and its content-type
        Then the file is fully and accurately sent

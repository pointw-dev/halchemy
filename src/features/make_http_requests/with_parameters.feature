#noinspection NonAsciiCharacters
Feature: Easily add complex query strings by way of a parameter object

    You can provide parameters which will be serialized as a query string.  You can provide
    headers that apply to just the request you are making.  If a resource has templated links,
    you can supply the values to fill the template (i.e. you do not have to manipulate the
    templated href yourself).


    Scenario Outline: Make requests with query string / parameters
        Given a HAL resource
        When I supply <parameters>
        Then the parameters are added to the URL as a RFC 3986 compliant <query_string>

        Examples:
            | parameters                                                           | query_string                                               |
            | {"name":"John"}                                                      | name=John                                                  |
            | {"age": 50}                                                          | age=50                                                     |
            | {"name":"John Doe"}                                                  | name=John+Doe                                              |
            | {"name":"John","address":"123 Main St","age":50}                     | name=John&address=123+Main+St&age=50                       |
            | {"pretty":null}                                                      | pretty                                                     |
            | {"pretty":true}                                                      | pretty=true                                                |
            | {"list":["a","b","c"]}                                               | list=a&list=b&list=c                                       |
            | {"name":"John","address":{"street":"123 Main","city":"Springfield"}} | name=John&address.street=123+Main&address.city=Springfield |
            | {"where":"{\"account\":\"1234\"}"}                                   | where=%7B%22account%22%3A%221234%22%7D                     |
            | {"percent":"100%"}                                                   | percent=100%25                                             |
            | {"special":"$&+,/:;=?@"}                                             | special=%24%26%2B%2C%2F%3A%3B%3D%3F%40                     |
            | {"emoji":"😀", "chinese":"中文"}                                       | emoji=%F0%9F%98%80&chinese=%E4%B8%AD%E6%96%87              |


   Scenario Outline:  Adding parameters to URL forms correct URLs in all cases
       Given an endpoint at <url>
       When I provide <parameters>
       Then the result is a <correct_url>

       Examples:
           | parameters      | url          | correct_url            |
           | {"name":"John"} | /test        | /test?name=John        |
           | {"age": 50}     | /test/       | /test/?age=50          |
           | {"name":"John"} | /test?age=50 | /test?age=50&name=John |


    Scenario Outline: Can change how lists are serialized to query string
        Given a HAL resource
        And I choose a parameters <list_style>
        When I supply <parameters>
        Then the parameters are added to the URL as a RFC 3986 compliant <query_string>

        Examples:
        | list_style | parameters             | query_string                  |
        | repeat_key | {"list":["a","b","c"]} | list=a&list=b&list=c          |
        | bracket    | {"list":["a","b","c"]} | list[]=a&list[]=b&list[]=c    |
        | index      | {"list":["a","b","c"]} | list[0]=a&list[1]=b&list[2]=c |
        | comma      | {"list":["a","b","c"]} | list=a,b,c                    |
        | pipe       | {"list":["a","b","c"]} | list=a\|b\|c                  |



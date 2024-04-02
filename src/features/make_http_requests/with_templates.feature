Feature: Easily populate templated URLs with a template object

    You can provide template values which are used to populate templated link relations.

    @only
    Scenario Outline: Make requests to templated URLs
        Given a HAL resource with a link that is an RFC 6570 compliant <templated_href>
        When I follow that link and provide <template_values>
        Then the requested URL ends with the <correct_path>

        Examples:
            | templated_href                             | template_values                                                           | correct_path                                   |
            | /path/{foo}                                | {"foo":"321"}                                                             | /path/321                                      |
            | /has/{foo}/multiples/{bar}                 | {"foo":"value","bar":"value"}                                             | /has/value/multiples/value                     |
            | /orders{?id}                               | {"id":"123"}                                                              | /orders?id=123                                 |
            | /search{?query,type}                       | {"query":"hal","type":"specification"}                                    | /search?query=hal&type=specification           |
            | /items/{itemId}{?lang,format}              | {"itemId":"42","lang":"en","format":"json"}                               | /items/42?lang=en&format=json                  |
            | /country/{countryCode}/cities{?page,limit} | {"countryCode":"US","page":"1","limit":"10"}                              | /country/US/cities?page=1&limit=10             |
            | /profile/{userId}{?fields}                 | {"userId":"789","fields":"name,age"}                                      | /profile/789?fields=name%2Cage                 |
            | /search{?keys*}                            | {"keys": {"role": "admin", "status": "active"}}                           | /search?role=admin&status=active               |
            | /find{#section}                            | {"section":"results"}                                                     | /find#results                                  |
            | /browse/{.format}                          | {"format":"json"}                                                         | /browse/.json                                  |
            | /location/{country}/{city}/{?coords*}      | {"country":"Canada","city":"Toronto","coords":{"lat":43.7,"long":-79.42}} | /location/Canada/Toronto/?lat=43.7&long=-79.42 |
            | /files{/year,month,day,filename}           | {"year":"2023","month":"04","day":"01","filename":"report.pdf"}           | /files/2023/04/01/report.pdf                   |
            | /tags{?list*}                              | {"list":["api","hal","rfc6570"]}                                          | /tags?list=api&list=hal&list=rfc6570           |
            | /users/{userId}/posts{/postId}{?comments}  | {"userId":"100","postId":"200","comments":"all"}                          | /users/100/posts/200?comments=all              |
            | /path?fixedParam=value{&foo}               | {"foo":"bar"}                                                             | /path?fixedParam=value&foo=bar                 |


    Scenario Outline: Using templated URLs handles missing values
        Given a HAL resource with a link that is an RFC 6570 compliant <templated_href>
        When the <template_values> provided are missing one or more values
        Then the constructed URL ends with the <correct_path>

        Examples:
            | templated_href                             | template_values                       | correct_path              |
            | /path/{foo}                                | -omit-                                | /path/                    |
            | /has/{foo}/multiples/{bar}                 | {"foo":"value"}                       | /has/value/multiples/     |
            | /orders{?id}                               | -omit-                                | /orders                   |
            | /search{?query,type}                       | {"query":"hal"}                       | /search?query=hal         |
            | /items/{itemId}{?lang,format}              | {"itemId":"42"}                       | /items/42                 |
            | /country/{countryCode}/cities{?page,limit} | {"countryCode":"US"}                  | /country/US/cities        |
            | /profile/{userId}{?fields}                 | -omit-                                | /profile/                 |
            | /search{?keys*}                            | {}                                    | /search                   |
            | /find{#section}                            | -omit-                                | /find                     |
            | /browse/{.format}                          | {}                                    | /browse/                  |
            | /location/{country}/{city}/{?coords*}      | {"country":"Canada","city":"Toronto"} | /location/Canada/Toronto/ |
            | /files{/year,month,day,filename}           | {"year":"2023"}                       | /files/2023               |
            | /tags{?list*}                              | {"list":["api"]}                      | /tags?list=api            |
            | /users/{userId}/posts{/postId}{?comments}  | {"userId":"100"}                      | /users/100/posts          |
            | /path?fixedParam=value{&foo}               | {"wrong":"values"}                    | /path?fixedParam=value    |

Feature: Configuring the base URL influences requests to relative urls but not absolute urls.

    To create an Api object there is only one mandatory parameter: the base URL of the service.
    The main purpose of this base URL is to say "The API that I am using is this one".  This serves
    two functional purposes
        - the client will usually GET the root resource as its first action - this base URL is the
          location of the root resource

        - all relative urls are considered to be relative to this base URL, e.g. if the base URL
          is http://example.org/this/that  and a request is given a relative path /other  then the
          request is made to http://example.org/this/that/other

    Once the client has the root resource, normally it will navigate links provided by following its links.
    For flexibility you can also request urls directly.  If the url is a path only, the Api object treats
    that as a relative path of the base url.  If the url is absolute, the request is made to that URL.

    Finally (though I'm not sure when this will be useful), you can change the base URL at any time.


    Scenario Outline:  Request the root resource
        Given the Api is created with a <base_url>
        When I GET the root resource
        Then the request is made to the <expected_url>

        Examples:
        | base_url            | expected_url         |
        | http://example.org  | http://example.org/  |


    Scenario Outline:  Make requests using urls which are relative to the configured base URL
        Given the Api is created with a <base_url>
        When a request is given a <relative_url>
        Then the request is made to the <expected_url>

        Examples:
        | base_url                 | relative_url       | expected_url                              |
        | http://example.org       | /                  | http://example.org/                       |
        | http://example.org       | /path              | http://example.org/path                   |
        | http://example.org/      | /path              | http://example.org/path                   |
        | https://example.org      | /path              | https://example.org/path                  |
        | https://example.org/     | /path              | https://example.org/path                  |
        | http://example.org       | /path/             | http://example.org/path/                  |
        | http://example.org/      | /path/             | http://example.org/path/                  |
        | https://example.org      | /path/             | https://example.org/path/                 |
        | https://example.org/     | /path/             | https://example.org/path/                 |

        | http://example.org/api   | /                  | http://example.org/api/                   |
        | http://example.org/api   | /path              | http://example.org/api/path               |
        | http://example.org/api/  | /path              | http://example.org/api/path               |
        | https://example.org/api  | /path              | https://example.org/api/path              |
        | https://example.org/api/ | /path              | https://example.org/api/path              |
        | http://example.org/api   | /path/             | http://example.org/api/path/              |
        | http://example.org/api/  | /path/             | http://example.org/api/path/              |
        | https://example.org/api  | /path/             | https://example.org/api/path/             |
        | https://example.org/api/ | /path/             | https://example.org/api/path/             |

        | http://example.org/api   | /path/to/resource  | http://example.org/api/path/to/resource   |
        | http://example.org/api/  | /path/to/resource  | http://example.org/api/path/to/resource   |
        | https://example.org/api  | /path/to/resource  | https://example.org/api/path/to/resource  |
        | https://example.org/api/ | /path/to/resource  | https://example.org/api/path/to/resource  |
        | http://example.org/api   | /path/to/resource/ | http://example.org/api/path/to/resource/  |
        | http://example.org/api/  | /path/to/resource/ | http://example.org/api/path/to/resource/  |
        | https://example.org/api  | /path/to/resource/ | https://example.org/api/path/to/resource/ |
        | https://example.org/api/ | /path/to/resource/ | https://example.org/api/path/to/resource/ |


    Scenario Outline: Make requests with an absolute url which ignores the configured base URL
        Given the Api is created with a <base_url>
        When the request is given an <absolute_url>
        Then the request is made to that <absolute_url>

        Examples:
        | base_url            | absolute_url                           |
        | http://example.org  | http://api-base.com                     |
        | https://example.org | https://other-domain.net                |
        | http://example.org  | https://api-base.com/some/path          |
        | https://example.org | http://other-domain.net/some/other/path |


    Scenario Outline:  Can change the base URL
        Given the Api is created with a <base_url>
        And is later changed to a <new_base_url>
        When a request is given a <relative_url>
        Then the request is made to the <expected_url>

        Examples:
        | base_url            | new_base_url                | relative_url  | expected_url                     |
        | http://example.org  | http://new.example.org      | /             | http://new.example.org/          |
        | http://example.org  | http://new.example.org/api  | /             | http://new.example.org/api/      |
        | https://example.org | https://new.example.org/api | /path         | https://new.example.org/api/path |

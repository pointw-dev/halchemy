Feature: Easily populate templated URLs with a template object

    You can provide template values which are used to populate templated link relations.

    Scenario Outline: Make requests to templated URLs
        Given a resource with a HAL style <templated_href>
        When I provide <template_values>
        Then the requested URL ends with the <correct_path>

        Examples:
        | templated_href             | template_values               | correct_path               |
        | /path/{foo}                | {"foo":"321"}                 | /path/321                  |
        | /has/{foo}/multiples/{bar} | {"foo":"value","bar":"value"} | /has/value/multiples/value |


    Scenario Outline: Using templated URLs handles errors
        Given a resource with a HAL style <templated_href>
        When the <template_values> provided are incorrect
        Then the request fails with useful <details>

        Examples:
        | templated_href             | template_values    | details                          |
        | /path/{foo}                | {"wrong":"321"}    | foo                              |
        | /path/{foo}/multiple/{bar} | {"foo":"value"}    | bar                              |
        | /path/{foo}/multiple/{bar} | {"wrong":"values"} | foo, bar                         |
        | /path/{foo}                | -omit-             | no template values were provided |
        | /path/{foo}                | -omit-             | foo                              |



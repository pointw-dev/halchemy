"""
    Scenario: _halchemy.response.body is my languages representation of JSON when that's what was returned
        Given a HAL resource
        When I make a request that returns JSON in the body
        Then I can use the body in the way my language supports JSON

"""

from pytest_bdd import scenario
from __tests__.make_http_requests.http_response_details import FEATURE
from __tests__.make_http_requests.shared_step_definitions import *


@scenario(FEATURE, '_halchemy.response.body is my languages representation of JSON when that is what was returned')
def test_response_uses_json():
    pass


# Given a HAL resource


@when('I make a request that returns JSON in the body')
def request_returns_json():
    url = 'http://example.org/error'
    response_body = {
        "_status": "ERR",
        "_error": {
            "code": 404,
            "message": "The requested URL was not found on the server. If you entered the URL manually please check your spelling and try again."
        }
    }
    with requests_mock.Mocker() as m:
        m.register_uri(requests_mock.ANY, url, json=response_body, status_code=404)

        context.resources = {}
        for method in ALL_METHODS:
            context.resources[method] = getattr(context.api.using_endpoint(url), method.lower())()

@then('I can use the body in the way my language supports JSON')
def response_body_is_native_json_representation():
    for method in ALL_METHODS:
        resource = context.resources[method]
        error = resource._halchemy.error
        response = resource._halchemy.response
        assert_that(error).is_not_none()
        assert_that(type(response.body)).is_equal_to(dict)

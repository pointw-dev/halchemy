import requests
from pytest_bdd import scenario
from halchemy.__tests__.make_http_requests.http_response_details import FEATURE
from halchemy.__tests__.make_http_requests.shared_step_definitions import *


@scenario(FEATURE, 'Error details available after a failed request')
def test_response_with_errors():
    pass


# Given a HAL resource


@when(parsers.parse('the request I made fails: {failure}'))
def call_with_each_method(failure):
    url = 'http://example.org/error'
    with requests_mock.Mocker() as m:
        if failure.startswith('status_code'):
            status_code = int(failure.split(':')[1])
            m.register_uri(requests_mock.ANY, url, text=failure, status_code=status_code)
        elif failure == 'network error':
            m.register_uri(requests_mock.ANY, url, exc=requests.exceptions.ConnectionError)
        elif failure.startswith('timeout'):
            m.register_uri(requests_mock.ANY, url, exc=requests.exceptions.ConnectTimeout)

        context.resources = {}
        context.failures = {}
        for method in ALL_METHODS:
            context.failures[method] = failure
            context.resources[method] = getattr(context.api.using_endpoint(url), method.lower())()


@then('I can access the error details')
def verify_requests():
    for method in ALL_METHODS:
        failure = context.failures[method]
        resource = context.resources[method]
        error = resource._halchemy.error
        response = resource._halchemy.response
        assert_that(error).is_not_none()
        if failure.startswith('status_code'):
            status_code = int(failure.split(':')[1])
            assert_that(response.status_code).is_equal_to(status_code)
        else:
            assert_that(response.status_code).is_equal_to(0)
            assert_that(response.reason).is_equal_to('Did not receive a response from the server')
            assert_that(response.body).is_false()

from pytest_bdd import scenario
from halchemy.__tests__ import make_requests
from halchemy.__tests__.make_http_requests.http_response_details import FEATURE
from halchemy.__tests__.make_http_requests.shared_step_definitions import *


@scenario(FEATURE, 'HTTP response details available after a successful request')
def test_http_response_details():
    pass


# Given a HAL resource


@when('I make a request')
def call_with_each_method():
    make_requests(context, '/some/path')


@then('the HTTP response details are available to me')
def verify_requests():
    for method in ALL_METHODS:
        resource = context.resources[method]
        request = resource._halchemy.request
        response = resource._halchemy.response
        error = resource._halchemy.error
        assert_that(resource).is_not_none()
        assert_that(request).is_not_none()
        assert_that(response).is_not_none()
        assert_that(request.method).is_equal_to(method)
        assert_that(request.url).is_equal_to(context.request_urls[method])
        assert_that(response.status_code).is_equal_to(200)
        assert_that(response.reason).is_equal_to('OK')
        assert_that(response.body).is_equal_to('resp')
        assert_that(error).is_none()

import requests_mock
from assertpy import assert_that
from pytest_bdd import scenario, given, when, then, parsers
from __tests__.make_http_requests import add_root_to_context
from __tests__.configurable.error_handling import FEATURE, ALL_METHODS
from lib.api import Api, HTTPError


@scenario(FEATURE, 'Can override error handling configuration')
def test_override_error_handling_configuration():
    pass


@given('an Api with default error handling configuration', target_fixture='context')
def context():
    context.api = Api('http://example.org')
    add_root_to_context(context)
    return context


@when('a request results in a status code of 401')
def request_with_error_status_code():
    context.resources = {}
    with requests_mock.Mocker() as m:
        m.register_uri(requests_mock.ANY, '/error', status_code=401)
        for method in ALL_METHODS:
            context.resources[method] = getattr(context.api.using_endpoint('/error'), method.lower())()


@when('the code asks to throw an exception for non-successful status codes')
def call_raise_for_status():
    context.raise_methods = {}
    for method in ALL_METHODS:
        context.raise_methods[method] = context.resources[method]._halchemy.raise_for_status_codes


@then(parsers.parse('based on the override settings {settings} an exception {is_or_is_not} thrown'))
def verify_exception_is_thrown(settings, is_or_is_not):
    expected = is_or_is_not == 'is'
    for method in ALL_METHODS:
        exception_thrown = not expected  # i.e. will fail unless successfully changed
        raise_method = context.raise_methods[method]
        try:
            if settings == 'empty':
                raise_method()
            else:
                raise_method(settings)
            exception_thrown = False
        except HTTPError:
            exception_thrown = True

        assert_that(exception_thrown).is_equal_to(expected)

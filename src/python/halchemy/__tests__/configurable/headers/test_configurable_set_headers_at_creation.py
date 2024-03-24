from pytest_bdd import scenario, given, when, then
from assertpy import assert_that  # https://github.com/assertpy/assertpy
from __tests__ import ALL_METHODS, make_requests
from __tests__.configurable.headers import FEATURE, HEADERS
from lib.api import Api


@scenario(FEATURE, 'Can add or modify default headers')
def test_configurable_set_headers_at_creation():
    pass


@given('the Api is created with headers', target_fixture='context')
def context():
    context.api = Api('http://example.org', headers=HEADERS)
    return context


@when('a request is sent')
def call_with_each_method(context):
    make_requests(context, '/path')


@then('the request contains the headers and their values')
def verify_requests(context):
    for method in ALL_METHODS:
        for header, value in HEADERS.items():
            request_headers = context.request_headers[method]
            assert_that(request_headers).described_as(method).contains_key(header)
            assert_that(value).described_as(method).is_equal_to(request_headers[header])

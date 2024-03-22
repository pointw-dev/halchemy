from pytest_bdd import scenario, given, when, then, parsers
from assertpy import assert_that  # https://github.com/assertpy/assertpy
from halchemy.__tests__ import ALL_METHODS, make_requests
from halchemy.__tests__.configurable.headers import FEATURE
from lib.api import Api


@scenario(FEATURE, 'Can add or override headers after creation')
def test_configurable_update_headers_after_creation():
    pass


@given('the Api is created with no headers', target_fixture='context')
def context():
    context.api = Api('http://example.org')
    return context


@given(parsers.parse('later is given new a new {header} with its {value}'))
def add_header(context, header, value):
    context.api.add_headers({header: value})


@when('a request is sent')
def call_with_each_method(context):
    make_requests(context, '/path')


@then(parsers.parse('the request contains each new {header} with its {value}'))
def verify_requests(context, header, value):
    for method in ALL_METHODS:
        request_headers = context.request_headers[method]
        assert_that(request_headers).described_as(method).contains_key(header)
        assert_that(value).described_as(method).is_equal_to(request_headers[header])

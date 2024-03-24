from pytest_bdd import scenario, given, when, then
from assertpy import assert_that  # https://github.com/assertpy/assertpy
from __tests__ import ALL_METHODS, make_requests
from __tests__.configurable.headers import FEATURE, HEADERS
from lib.api import Api


REMOVE_HEADERS = ['Cache-control', 'Authorization']


@scenario(FEATURE, 'Can remove headers after creation')
def test_configurable_remove_default_headers():
    pass


@given('the Api is created with headers', target_fixture='context')
def context():
    context.api = Api('http://example.org', headers=HEADERS)
    return context


@given('later some headers are removed')
def remove_headers(context):
    context.api.remove_headers(REMOVE_HEADERS)


@when('a request is sent')
def call_with_each_method(context):
    make_requests(context, '/path')


@then('the request does not contain the removed headers')
def verify_requests(context):
    for method in ALL_METHODS:
        for removed_header in REMOVE_HEADERS:
            request_headers = context.request_headers[method]
            assert_that(request_headers).described_as(method).does_not_contain_key(removed_header)

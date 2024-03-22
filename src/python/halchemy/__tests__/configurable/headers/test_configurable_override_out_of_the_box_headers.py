from pytest_bdd import scenario, given, when, then, parsers
from assertpy import assert_that  # https://github.com/assertpy/assertpy
from halchemy.__tests__ import ALL_METHODS, make_requests
from halchemy.__tests__.configurable.headers import FEATURE
from lib.api import Api


@scenario(FEATURE, 'Can override out of the box headers')
def test_configurable_override_out_of_the_box_headers():
    pass


@given(parsers.parse('an Api is created with a different {value} for an out-of-the-box {header}'),
       target_fixture='context')
def context(value, header):
    headers = {header: value}
    context.api = Api('http://example.org', headers=headers)
    return context


@when('a request is sent')
def call_with_each_method(context):
    make_requests(context, '/path')


@then(parsers.parse('the request contains the {header} with the new {value}'))
def verify_requests(context, header, value):
    for method in ALL_METHODS:
        request_headers = context.request_headers[method]
        assert_that(request_headers).described_as(method).contains_key(header)
        assert_that(value).described_as(method).is_equal_to(request_headers[header])

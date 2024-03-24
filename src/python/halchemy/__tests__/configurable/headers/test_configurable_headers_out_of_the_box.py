from pytest_bdd import scenario, given, when, then, parsers
from assertpy import assert_that  # https://github.com/assertpy/assertpy
from __tests__ import READ_METHODS, MODIFY_METHODS, ALL_METHODS, make_requests
from __tests__.configurable.headers import FEATURE
from lib.api import Api


@scenario(FEATURE, 'Has sensible out-of-the-box headers')
def test_configurable_headers_out_of_the_box():
    pass


@given('the Api is created with no headers', target_fixture='context')
def context():
    context.api = Api('http://example.org')
    return context


@when('a request is sent')
def call_with_each_method(context):
    make_requests(context, '/path')


@then(parsers.parse('the request contains each {header} with its {value} for all sensible ones for the {method_type}'))
def verify_requests(context, header, value, method_type):
    for method in ALL_METHODS:
        request_headers = context.request_headers[method]

        if (method_type == 'all'
                or method_type == 'read' and method in READ_METHODS
                or method_type == 'write' and method in MODIFY_METHODS):
            assert_that(request_headers).described_as(method).contains_key(header)
            assert_that(value).described_as(method).is_equal_to(request_headers[header])


@then(
    parsers.parse('the request does not contain the {header} if its method is not of the corresponding {method_type}'))
def verify_no_inappropriate_headers(context, header, method_type):
    for method in ALL_METHODS:
        headers = context.request_headers[method]

        if method_type == 'all':
            return

        try:
            if method_type == 'read' and method not in READ_METHODS:
                assert_that(headers).described_as(method).does_not_contain_key(header)
            elif method_type == 'write' and method not in MODIFY_METHODS:
                assert_that(headers).described_as(method).does_not_contain_key(header)
        except AssertionError:
            raise AssertionError(f'[{method}]: expected headers not to contain {header}, but did.\nheaders: {headers}')

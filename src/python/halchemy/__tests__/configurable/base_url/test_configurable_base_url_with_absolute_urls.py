from pytest_bdd import scenario, given, when, then, parsers
from assertpy import assert_that  # https://github.com/assertpy/assertpy
from __tests__ import ALL_METHODS, make_requests
from __tests__.configurable.base_url import FEATURE
from lib.api import Api


@scenario(FEATURE, 'Make requests with an absolute url which ignores the configured base URL')
def test_configurable_base_url_with_absolute_urls():
    pass


@given(parsers.parse('the Api is created with a {base_url}'), target_fixture='context')
def context(base_url):
    context.api = Api(base_url)
    return context


@when(parsers.parse('the request is given an {absolute_url}'))
def call_with_each_method(context, absolute_url):
    make_requests(context, absolute_url)


@then(parsers.parse('the request is made to that {absolute_url}'))
def verify_requests(context, absolute_url):
    for method in ALL_METHODS:
        assert_that(context.request_urls[method].rstrip('/')).is_equal_to(absolute_url)

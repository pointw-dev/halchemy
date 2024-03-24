from pytest_bdd import scenario, given, when, then, parsers
from assertpy import assert_that  # https://github.com/assertpy/assertpy
from __tests__ import ALL_METHODS, make_requests
from __tests__.configurable.base_url import FEATURE
from lib.api import Api


@scenario(FEATURE, 'Can change the base URL')
def test_configurable_change_base_url():
    pass


@given(parsers.parse('the Api is created with a {base_url}'), target_fixture='context')
def context(base_url):
    context.api = Api(base_url)
    return context


@given(parsers.parse('is later changed to a {new_base_url}'))
def change_base_url(context, new_base_url):
    context.api.base_url = new_base_url


@when(parsers.parse('a request is given a {relative_url}'))
def call_with_each_method(context, relative_url):
    make_requests(context, relative_url)


@then(parsers.parse('the request is made to the {expected_url}'))
def verify_requests(context, expected_url):
    for method in ALL_METHODS:
        assert_that(context.request_urls[method]).is_equal_to(expected_url)

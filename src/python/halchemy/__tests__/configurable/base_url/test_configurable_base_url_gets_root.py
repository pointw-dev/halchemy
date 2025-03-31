import requests_mock
from pytest_bdd import scenario, given, when, then, parsers
from assertpy import assert_that  # https://github.com/assertpy/assertpy
from __tests__.configurable.base_url import FEATURE
from lib.api import Api


@scenario(FEATURE, 'Request the home resource')
def test_configurable_base_url_gets_home():
    pass


@given(parsers.parse('the Api is created with a {base_url}'), target_fixture='context')
def context(base_url):
    context.api = Api(base_url)
    return context


@when('I GET the home resource')
def get_home_resource(context):
    with requests_mock.Mocker() as m:
        context.request_urls = {}
        m.register_uri(requests_mock.ANY, requests_mock.ANY, text='resp')
        context.api.home.get()
        context.request_urls['GET'] = m.last_request.url


@then(parsers.parse('the request is made to the {expected_url}'))
def verify_get_request(context, expected_url):
    assert_that(context.request_urls['GET']).is_equal_to(expected_url)

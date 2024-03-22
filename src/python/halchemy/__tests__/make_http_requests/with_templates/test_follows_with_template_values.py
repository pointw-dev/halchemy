import json

import requests_mock
from pytest_bdd import scenario, given, when, then, parsers
from assertpy import assert_that
from halchemy.__tests__ import ALL_METHODS
from halchemy.__tests__.make_http_requests import add_root_to_context
from halchemy.__tests__.make_http_requests.with_templates import FEATURE
from lib.api import Api


@scenario(FEATURE, 'Make requests to templated URLs')
def test_follows_with_template_values():
    pass


@given(parsers.parse('a resource with a HAL style {template_href}'), target_fixture='context')
def context(template_href):
    context.api = Api('http://example.org')
    add_root_to_context(context)
    context.resource = {
        '_links': {
            'self': {'href': '/resource1'},
            'next': {
                'href': template_href,
                'templated': True
            }
        }
    }
    return context


@when(parsers.parse('I provide {template_values}'))
def fill_template_then_make_request(context, template_values):
    context.urls = {}
    template_values = json.loads(template_values)
    with requests_mock.Mocker() as m:
        m.register_uri(requests_mock.ANY, requests_mock.ANY, text='resp')
        for method in ALL_METHODS:
            getattr(context.api.follow(context.resource).to('next').with_template_values(template_values),
                    method.lower())()
            context.urls[method] = m.last_request.url


@then(parsers.parse('the requested URL ends with the {correct_href}'))
def verify_requests(context, correct_href):
    for method in ALL_METHODS:
        url = context.urls[method]
        assert_that(url).described_as(method).ends_with(correct_href)

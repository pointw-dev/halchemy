import json

import requests_mock
from lib.resource import HalResource
from pytest_bdd import scenario, given, when, then, parsers
from assertpy import assert_that
from __tests__ import ALL_METHODS
from __tests__.make_http_requests import add_home_to_context
from __tests__.make_http_requests.with_templates import FEATURE
from lib.api import Api


@scenario(FEATURE, 'Using templated URLs handles missing values')
def test_follows_with_missing_template_values():
    pass


@given(parsers.parse('a HAL resource with a link that is an RFC 6570 compliant {template_href}'), target_fixture='context')
def context(template_href):
    context.api = Api('http://example.org')
    add_home_to_context(context)
    context.resource = HalResource({
        '_links': {
            'self': {'href': '/resource1'},
            'next': {
                'href': template_href,
                'templated': True
            }
        }
    })
    return context


@when(parsers.parse('the {template_values} provided are missing one or more values'))
def fill_template_then_make_request(context, template_values):
    context.exceptions = {}
    context.urls = {}
    template_values = {} if template_values == '-omit-' else json.loads(template_values)
    with requests_mock.Mocker() as m:
        m.register_uri(requests_mock.ANY, requests_mock.ANY, text='resp')
        for method in ALL_METHODS:
            context.exceptions[method] = None
            try:
                if template_values:
                    getattr(context.api.follow(context.resource).to('next').with_template_values(template_values),
                            method.lower())()
                else:
                    getattr(context.api.follow(context.resource).to('next'), method.lower())()
            except ValueError as e:
                context.exceptions[method] = e
            finally:
                context.urls[method] = m.last_request.url


@then(parsers.parse('the constructed URL ends with the {correct_href}'))
def verify_requests(context, correct_href):
    for method in ALL_METHODS:
        url = context.urls[method]
        assert_that(url).described_as(method).ends_with(correct_href)
        assert_that(context.exceptions[method]).is_none()

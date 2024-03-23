import json

import requests_mock
from lib.resource import HalResource
from pytest_bdd import scenario, given, when, then, parsers
from assertpy import assert_that
from halchemy.__tests__ import ALL_METHODS
from halchemy.__tests__.make_http_requests import add_root_to_context
from halchemy.__tests__.make_http_requests.with_templates import FEATURE
from lib.api import Api


@scenario(FEATURE, 'Using templated URLs handles errors')
def test_follows_with_template_values():
    pass


@given(parsers.parse('a resource with a HAL style {template_href}'), target_fixture='context')
def context(template_href):
    context.api = Api('http://example.org')
    add_root_to_context(context)
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


@when(parsers.parse('the {template_values} provided are incorrect'))
def fill_template_then_make_request(context, template_values):
    context.exceptions = {}
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


@then(parsers.parse('the request fails with useful {details}'))
def verify_requests(context, details):
    for method in ALL_METHODS:
        exception = context.exceptions[method]
        assert_that(exception).described_as(method).is_not_none()
        assert_that(exception).described_as(method).is_instance_of(ValueError)
        assert_that(str(exception)).described_as(method).contains(details)

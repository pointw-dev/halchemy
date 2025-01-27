import json
import requests_mock
from assertpy import assert_that
from pytest_bdd import given, when, then, parsers
from __tests__ import ALL_METHODS, MODIFY_METHODS
from __tests__.make_http_requests import add_root_to_context, are_query_strings_equal
from lib.api import Api


@given('a HAL resource', target_fixture='context')
def context():
    context.api = Api('http://example.org')
    add_root_to_context(context)
    return context


@when(parsers.parse('I supply {parameters}'))
def handle_parameters(context, parameters):
    context.qs = {}
    parameters = json.loads(parameters)
    with requests_mock.Mocker() as m:
        m.register_uri(requests_mock.ANY, requests_mock.ANY, text='resp')
        for method in ALL_METHODS:
            getattr(context.api.follow(context.root).to('self').with_parameters(parameters), method.lower())()
            context.qs[method] = m.last_request.url.split('?', 1)[1] if '?' in m.last_request.url else ''


@then(parsers.parse('the parameters are added to the URL as an RFC 3986 compliant {query_string}'))
def verify_requests(context, query_string):
    for method in ALL_METHODS:
        assert_that(are_query_strings_equal(context.qs[method], query_string)).is_true()


@given('a modifiable HAL resource', target_fixture='context')
def context():
    context.api = Api('http://example.org')
    add_root_to_context(context)
    resource = {
        '_links': {
            'self': {'href': '/path/to/resource1'}
        },
        '_etag': 'from field'
    }
    headers = {
        'Etag': 'from header'
    }
    with requests_mock.Mocker() as m:
        m.register_uri(requests_mock.ANY, requests_mock.ANY, json=resource, headers=headers)
        context.resource = context.api.follow(context.root).to('resource1').get()
    return context


@given('the response does not have an Etag header')
def remove_etag_header():
    context.resource._halchemy.response.headers.pop('Etag', None)


@when('I request a change to the resource')
def request_change():
    context.request_headers = {}
    with requests_mock.Mocker() as m:
        m.register_uri(requests_mock.ANY, requests_mock.ANY)
        for method in MODIFY_METHODS:
            getattr(context.api.follow(context.resource).to('self'), method.lower())()
            context.request_headers[method] = m.last_request.headers




import requests_mock
from pytest_bdd import scenario, given, when, then
from assertpy import assert_that
from halchemy.__tests__ import ALL_METHODS
from halchemy.__tests__.make_http_requests import add_root_to_context
from halchemy.__tests__.make_http_requests.with_headers import FEATURE
from lib.api import Api

HEADERS = {
    'Cache-control': 'no-cache'
}


@scenario(FEATURE, 'Request headers are only for that request')
def test_follows_with_headers_are_per_call_only():
    pass


@given('I have made a request with additional headers', target_fixture='context')
def context():
    context.api = Api('http://example.org')
    add_root_to_context(context)
    context.api.follow(context.root).to('resource1').with_headers(HEADERS).get()
    return context


@when('I make a new request without headers')
def follow_link_rels(context):
    context.headers = {}
    with requests_mock.Mocker() as m:
        m.register_uri(requests_mock.ANY, requests_mock.ANY, text='resp')
        for method in ALL_METHODS:
            getattr(context.api.follow(context.root).to('resource1'), method.lower())()
            context.headers[method] = m.last_request.headers


@then("the previous request's headers are not included")
def verify_requests(context):
    for method in ALL_METHODS:
        request_headers = context.headers[method]
        for header, value in HEADERS.items():
            assert_that(request_headers).described_as(method).does_not_contain_key(header)

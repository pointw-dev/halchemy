from pytest_bdd import scenario
from halchemy.__tests__.make_http_requests.with_headers import FEATURE
from halchemy.__tests__.make_http_requests.shared_step_definitions import *

HEADERS = {
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'
                     '.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ'
                     '.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
    'Cache-control': 'no-cache',
    'Connection': 'close',
    'User-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) '
                  'Chrome/67.0.3396.99 Safari/537.36'
}


@scenario(FEATURE, 'Make requests with additional headers')
def test_follows_rels_from_a_resource_with_headers():
    pass


# Given a HAL resource


@when('I specify additional headers for a request')
def follow_link_rels():
    context.headers = {}
    with requests_mock.Mocker() as m:
        m.register_uri(requests_mock.ANY, requests_mock.ANY, text='resp')
        for method in ALL_METHODS:
            getattr(context.api.follow(context.root).to('self').with_headers(HEADERS), method.lower())()
            context.headers[method] = m.last_request.headers


@then('the request is made with those headers')
def verify_requests():
    for method in ALL_METHODS:
        request_headers = context.headers[method]
        for header, value in HEADERS.items():
            assert_that(request_headers).described_as(method).contains_key(header)
            assert_that(value).described_as(method).is_equal_to(request_headers[header])

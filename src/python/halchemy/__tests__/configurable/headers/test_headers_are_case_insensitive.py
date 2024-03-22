import requests_mock
from requests.structures import CaseInsensitiveDict
from pytest_bdd import scenario, given, when, then
from assertpy import assert_that  # https://github.com/assertpy/assertpy
from halchemy.__tests__ import ALL_METHODS
from halchemy.__tests__.configurable.headers import FEATURE, HEADERS
from lib.api import Api


@scenario(FEATURE, 'Header changes are case-insensitive')
def test_headers_are_case_insensitive():
    pass


@given('the Api is created with headers', target_fixture='context')
def context():
    context.api = Api('http://example.org', headers=HEADERS)
    return context


@when('I set a new value to a previously added header but with a different case')
def change_existing_header(context):
    upper = {
        **HEADERS
    }
    for header, value in HEADERS.items():
        upper[header.upper()] = value + ' changed'
    context.api.add_headers(upper)

    lower = {
        **HEADERS
    }
    for header, value in HEADERS.items():
        lower[header.lower()] = value + ' changed again'
    context.foobar = context.api.using_endpoint('/foobar').with_headers(lower)


@then('the header is changed not added')
def verify_requests(context):
    with requests_mock.Mocker() as m:
        m.register_uri(requests_mock.ANY, requests_mock.ANY, text='resp')
        for method in ALL_METHODS:
            getattr(context.foobar, method.lower())()
            sent_headers = CaseInsensitiveDict({
                **m.last_request.headers
            })
            for header, value in HEADERS.items():
                number_of_headers = len([i for i in sent_headers.keys() if i.lower() == header.lower()])
                assert_that(number_of_headers).is_equal_to(1)
                assert_that(sent_headers.get(header)).is_equal_to(value + ' changed again')

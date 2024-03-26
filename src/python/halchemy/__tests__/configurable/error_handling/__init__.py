from pytest_bdd import scenario, given, when, then, parsers
import requests
import requests_mock
from assertpy import assert_that
from __tests__ import ALL_METHODS

FEATURE = 'configurable/configure_error_handling.feature'


@when(parsers.parse("a request has this result {result}"))
def request_with_error(context, result):
    url = 'http://example.org/error'
    with requests_mock.Mocker() as m:
        if result.startswith('status_code'):
            status_code = int(result.split(':')[1])
            m.register_uri(requests_mock.ANY, url, text=result, status_code=status_code)
        elif result == 'network error':
            m.register_uri(requests_mock.ANY, url, exc=requests.exceptions.ConnectionError)
        elif result.startswith('timeout'):
            m.register_uri(requests_mock.ANY, url, exc=requests.exceptions.ConnectTimeout)

        context.exceptions = {}
        for method in ALL_METHODS:
            context.exceptions[method] = None
            try:
                getattr(context.api.using_endpoint(url), method.lower())()
            except Exception as e:
                context.exceptions[method] = e


@then(parsers.parse('an exception {is_or_is_not} thrown'))
def verify_requests(context, is_or_is_not):
    for method in ALL_METHODS:
        if is_or_is_not == 'is_not':
            assert_that(context.exceptions[method]).is_none()
        else:
            assert_that(context.exceptions[method]).is_not_none()

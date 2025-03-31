from pytest_bdd import scenario, given, when, then, parsers
from __tests__.make_http_requests import add_home_to_context
from __tests__.configurable.error_handling import *
from lib.api import Api


@scenario(FEATURE, 'Error handling configured with network throws disabled')
def test_error_handling_configuration_no_network_raises():
    pass


@given('an Api configured to not throw on network error', target_fixture='context')
def context():
    context.api = Api('http://example.org')
    add_home_to_context(context)
    context.api.error_handling.raise_for_network_error = False
    return context

# When a request has this result <result>

# Then an exception <is_or_is_not> thrown

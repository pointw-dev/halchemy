from pytest_bdd import scenario, given, when, then, parsers
from __tests__.make_http_requests import add_home_to_context
from __tests__.configurable.error_handling import *
from lib.api import Api


@scenario(FEATURE, 'Out-of-box error handling configuration')
def test_default_error_handling_configuration():
    pass


@given('an Api with default error handling configuration', target_fixture='context')
def context():
    context.api = Api('http://example.org')
    add_home_to_context(context)
    return context

# When a request has this result <result>

# Then an exception <is_or_is_not> thrown

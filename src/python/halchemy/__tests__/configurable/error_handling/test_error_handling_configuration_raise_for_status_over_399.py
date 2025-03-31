from pytest_bdd import scenario, given, when, then, parsers
from __tests__.make_http_requests import add_home_to_context
from __tests__.configurable.error_handling import *
from lib.api import Api


@scenario(FEATURE, 'Error handling configured to throw >399')
def test_error_handling_configuration_raise_for_status_over_399():
    pass


@given('an Api configured to throw on status codes >399', target_fixture='context')
def context():
    context.api = None
    context.api = Api('http://example.org')
    add_home_to_context(context)
    context.api.error_handling.raise_for_status_codes = '>399'
    return context

# When a request has this result <result>

# Then an exception <is_or_is_not> thrown

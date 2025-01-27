from pytest_bdd import scenario
from __tests__.make_http_requests.with_parameters import FEATURE
from __tests__.make_http_requests.shared_step_definitions import *


@scenario(FEATURE, 'Can change how lists are serialized to query string')
def test_follows_with_parameters_list_styles():
    pass


# Given a HAL resource

# and...
@given(parsers.parse('I choose a parameters {list_style}'))
def set_list_style(list_style):
    context.api.parameters_list_style = list_style

# When I supply <parameters>

# Then the parameters are added to the URL as an RFC 3986 compliant <query_string>

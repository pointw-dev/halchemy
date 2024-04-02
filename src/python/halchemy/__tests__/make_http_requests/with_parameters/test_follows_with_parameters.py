from pytest_bdd import scenario
from __tests__.make_http_requests.with_parameters import FEATURE
from __tests__.make_http_requests.shared_step_definitions import *


@scenario(FEATURE, 'Make requests with query string / parameters')
def test_follows_with_parameters():
    pass


# Given a HAL resource

# When I supply <parameters>

# Then the parameters are added to the URL as a RFC 3986 compliant <query_string>

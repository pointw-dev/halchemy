from pytest_bdd import scenario
from halchemy.__tests__.make_http_requests.optimistic_concurrency import FEATURE
from halchemy.__tests__.make_http_requests.shared_step_definitions import *


@scenario(FEATURE, 'Out-of-the-box (AUTO_ETAG) uses _etag field if Etag header is missing')
def test_auto_etag_uses_etag_field():
    pass


# Given a modifiable HAL resource


# And the response does not have an Etag header


# When I request a change to the resource


@then("the If-Match header uses the resource's _etag field")
def verify_request():
    for method in MODIFY_METHODS:
        assert_that(context.request_headers[method]).contains('If-Match')
        assert_that(context.request_headers[method]['If-Match']).is_equal_to('from field')

from pytest_bdd import scenario
from halchemy.__tests__.make_http_requests.optimistic_concurrency import FEATURE
from halchemy.__tests__.make_http_requests.shared_step_definitions import *


@scenario(FEATURE, 'Out-of-the-box (AUTO_ETAG) _etag field and Etag header is missing')
def test_auto_etag_has_no_etag():
    pass


# Given a modifiable HAL resource


# And the response does not have an Etag header


@given('the resource does not have an _etag field')
def remove_etag_field():
    context.resource.pop('_etag', None)


# When I request a change to the resource


@then("the request is made without an If-Match header")
def verify_request():
    for method in MODIFY_METHODS:
        assert_that(context.request_headers[method]).does_not_contain_key('If-Match')

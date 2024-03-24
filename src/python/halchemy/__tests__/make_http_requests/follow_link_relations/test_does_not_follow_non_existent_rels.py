from pytest_bdd import scenario
from __tests__.make_http_requests.follow_link_relations import FEATURE
from __tests__.make_http_requests.shared_step_definitions import *


@scenario(FEATURE, 'Make request to non-existent link relation')
def test_does_not_follow_non_existent_rels():
    pass


# Given a HAL resource


@when('I make a request to a link relation the resource does not have')
def follow_link_rels():
    context.error = None
    with requests_mock.Mocker() as m:
        m.register_uri(requests_mock.ANY, requests_mock.ANY, text='resp')
        try:
            context.api.follow(context.root).to('non-existent').get()
        except KeyError as e:
            context.error = e


@then('the request fails, informing me of the issue')
def verify_requests():
    assert_that(context.error).is_not_none()
    assert_that(context.error).is_instance_of(KeyError)
    assert_that(str(context.error)).is_equal_to("\"This resource does not have a link relation named 'non-existent'\"")

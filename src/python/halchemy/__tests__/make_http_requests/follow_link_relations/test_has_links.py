from pytest_bdd import scenario
from __tests__.make_http_requests.follow_link_relations import FEATURE
from __tests__.make_http_requests.shared_step_definitions import *


@scenario(FEATURE, 'Has link relation')
def test_has_links():
    pass


# Given a HAL resource

@when('I ask if it has a link relation')
def follow_link_rels():
    context.true_if_exists = context.root.has_rel('self')
    context.false_if_not_exists = context.root.has_rel('not-a-rel')


@then('it tells me whether it does or not')
def verify_requests():
    assert_that(context.true_if_exists).is_true()
    assert_that(context.false_if_not_exists).is_false()

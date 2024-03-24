from pytest_bdd import scenario
from __tests__.make_http_requests.follow_link_relations import FEATURE
from __tests__.make_http_requests.shared_step_definitions import *


@scenario(FEATURE, 'Inspect links')
def test_inspect_links():
    pass


# Given a HAL resource


@when('I ask for the links it has')
def follow_link_rels():
    context.links = context.root.links


@then('I get a list of its relations')
def verify_requests():
    for rel in context.root['_links']:
        assert_that(context.links).contains(rel)

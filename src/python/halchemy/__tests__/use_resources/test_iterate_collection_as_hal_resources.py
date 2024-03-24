from assertpy import assert_that
from pytest_bdd import scenario, given, when, then
from __tests__.use_resources import FEATURE
# from __tests__.make_http_requests.shared_step_definitions import *
from lib.resource import HalResource


@scenario(FEATURE, 'Iterate a collection of HAL formatted objects, each as a HAL resource')
def test_iterate_collection_as_hal_resources():
    pass


@given('a HAL resource that has a field which is a collection of objects in HAL format', target_fixture='context')
def context():
    context.resource = HalResource({
        '_items': [
            {
                'field': 'alpha',
                '_links': {'self': {'href': '/resource/alpha'}}
            },
            {
                'field': 'beta',
                '_links': {'self': {'href': '/resource/beta'}}
            },
            {
                'field': 'delta',
                '_links': {'self': {'href': '/resource/delta'}}
            },
        ],
        '_links': {'self': {'href': '/resource'}}
    })
    return context


@when("I iterate the items in that field's collection")
def iterate_resources(context):
    context.error_occurred = False
    context.all_hal = True
    try:
        for item in context.resource.collection('_items'):
            if type(item) is not HalResource:
                context.all_hal = False
    except:
        context.error_occurred = True


@then('each item is a HAL resource')
def verify_requests(context):
    assert_that(context.error_occurred).is_false()
    assert_that(context.all_hal).is_true()

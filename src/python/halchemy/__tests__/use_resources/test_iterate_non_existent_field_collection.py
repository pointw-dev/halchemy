from pytest_bdd import scenario, given, when, then
from halchemy.__tests__.use_resources import FEATURE
from halchemy.__tests__.make_http_requests.shared_step_definitions import *
from halchemy.lib.resource import HalResource


@scenario(FEATURE, 'Handle incorrectly using the iterator on a non-existent field')
def test_iterate_non_existent_field_collection():
    pass


# Given a HAL Resource


@when('I try to iterate as a collection a field in the resource that does not exist')
def iterate_missing_resources():
    context.error_occurred = False
    context.all_hal = True
    try:
        for item in context.root.collection('_items'):
            if type(item) is not HalResource:
                context.all_hal = False
    except Exception as e:
        context.error_occurred = True
        context.message = str(e)


@then('it throws an exception telling me that the field does not exist')
def verify_requests():
    assert_that(context.error_occurred).is_true()
    assert_that(context.message).is_equal_to("Field '_items' does not exist, so cannot be iterated as a collection")

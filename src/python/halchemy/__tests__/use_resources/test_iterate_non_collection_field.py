from pytest_bdd import scenario, given, when, then
from __tests__.use_resources import FEATURE
from __tests__.make_http_requests.shared_step_definitions import *
from lib.resource import HalResource


@scenario(FEATURE, 'Handle using the iterator on a field that is not a collection')
def test_iterate_non_collection_field():
    pass


@given('a HAL resource with a non-collection field', target_fixture='context')
def context():
    context.resource = HalResource({
        'name': 'John Doe',
        '_links': {'self': {'href': '/resource'}}
    })
    return context


@when('I try to iterate as a collection a field that is not a collection')
def iterate_non_list():
    context.error_occurred = False
    context.all_hal = True
    try:
        for item in context.resource.collection('name'):
            if type(item) is not HalResource:
                context.all_hal = False
    except Exception as e:
        context.error_occurred = True
        context.message = str(e)


@then('it throws an exception telling me that the field is not a collection')
def verify_requests():
    assert_that(context.error_occurred).is_true()
    assert_that(context.message).is_equal_to("Field 'name' is not a collection")

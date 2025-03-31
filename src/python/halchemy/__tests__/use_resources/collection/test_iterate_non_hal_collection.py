from pytest_bdd import scenario, given, when, then
from __tests__.use_resources.collection import FEATURE
from __tests__.make_http_requests.shared_step_definitions import *
from lib.resource import HalResource


'''
    Scenario: Handle using the iterator on a field that is a collection but not of HAL format objects
        Given a HAL resource that has a field which is a collection, but not of HAL formatted objects
        When I try to iterate the items in that field's collection
        Then it throws an exception telling me collection contains non-HAL formatted objects
'''

@scenario(FEATURE, 'Handle using the iterator on a field that is a collection but not of HAL format objects')
def test_iterate_non_hal_collection():
    pass


@given('a HAL resource that has a field which is a collection, but not of HAL formatted objects', target_fixture='context')
def context():
    context.resource = HalResource({
        'items': [
            {'name': 'John Doe'},
            {'name': 'Jane Doe'}
        ],
        '_links': {'self': {'href': '/resource'}}
    })
    return context


@when("I try to iterate the items in that field's collection")
def iterate_non_hal_collection():
    context.error_occurred = False
    context.all_hal = True
    try:
        for item in context.resource.collection('items'):
            if type(item) is not HalResource:
                context.all_hal = False
    except Exception as e:
        context.error_occurred = True
        context.message = str(e)


@then('it throws an exception telling me collection contains non-HAL formatted objects')
def verify_requests():
    assert_that(context.error_occurred).is_true()
    assert_that(context.message).is_equal_to("The 'items' collection contains non-HAL formatted objects")

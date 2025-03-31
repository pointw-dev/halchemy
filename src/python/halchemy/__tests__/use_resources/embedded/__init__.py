from assertpy import assert_that
from pytest_bdd import scenario, given, when, then, parsers

from lib import HalResource
from lib.resource import Multiplicity

FEATURE = 'use_resources/use_embedded.feature'


@given('a HalResource with an embedded property containing both a single resource and a resource collection')
def step_impl(context):
    context['hal'] = HalResource({
        "_id": "39402",
        "memberName": "Pat Doe",
        "address": "123 Main St.",
        "_links": {
            "self": { "href": "/members/39402" },
            "library": { "href": "/libraries/2389" },
            "books": { "href": "/members/39402/books" }
        },
        "_embedded": {
            "library": {
                "name": "Essex County Library",
                "_links": {
                    "self": { "href": "/libraries/2389" }
                }
            },
            "book": [
                {
                    "title": "Stephen's Kingdom",
                    "edition": "1st",
                    "_links": {
                        "self": { "href": "/books/3845" }
                    }
                },
                {
                    "title": "Nature Valley",
                    "edition": "paperback",
                    "_links": {
                        "self": { "href": "/books/8842" }
                    }
                }
            ]
        }
    })


@when(parsers.parse('I retrieve the embedded resource with the {rel} rel'))
def step_impl(context, rel):
    try:
        context['fetched'] = context['hal'].embedded(rel)
    except KeyError as error:
        context['exception'] = error


@when(parsers.parse('I retrieve the embedded resource with rel {rel} and expect {multiplicity}'))
def step_impl(context, rel, multiplicity):
    try:
        context['fetched'] = context['hal'].embedded(
            rel,
            expect=Multiplicity.ONE if multiplicity == 'one' else Multiplicity.MANY
        )
    except TypeError as error:
        context['exception'] = error


@then('I should receive a single HalResource instance')
def step_impl(context):
    assert_that(context['fetched']).is_type_of(HalResource)


@then("I should receive a collection of HalResource instances")
def step_impl(context):
    assert_that(context['fetched']).is_type_of(list)
    assert_that(context['fetched'][0]).is_type_of(HalResource)


@then('the resource should contain the expected data for the library')
def step_impl(context):
    assert_that(context['fetched']['name']).is_equal_to('Essex County Library')


@then("the resource should contain the expected book data")
def step_impl(context):
    for index, title in enumerate(["Stephen's Kingdom", "Nature Valley"]):
        assert_that(context['fetched'][index]['title']).is_equal_to(title)

@then('an error should be raised indicating a type mismatch')
def step_impl(context):
    assert_that(context['exception']).is_not_none()
    assert_that(context['exception']).is_type_of(TypeError)

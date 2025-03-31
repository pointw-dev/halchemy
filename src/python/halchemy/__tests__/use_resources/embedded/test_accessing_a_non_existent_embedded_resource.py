import pytest
from pytest_bdd import given, when, then, parsers
from assertpy import assert_that
from __tests__.use_resources import *
from __tests__.use_resources.embedded import *


@pytest.fixture(scope='module')
def context():
    return {}


@scenario(FEATURE, 'Accessing a non-existent embedded resource')
def test_accessing_a_non_existent_embedded_resource():
    pass


@then('an error should be raised indicating the resource is not found')
def step_impl(context):
    assert_that(context['exception']).is_not_none()
    assert_that(context['exception']).is_type_of(KeyError)

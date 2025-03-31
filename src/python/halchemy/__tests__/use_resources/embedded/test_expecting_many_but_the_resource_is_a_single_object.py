import pytest
from pytest_bdd import given, when, then, parsers
from assertpy import assert_that
from __tests__.use_resources import *
from __tests__.use_resources.embedded import *


@pytest.fixture(scope='module')
def context():
    return {}

@scenario(FEATURE, 'Expecting many but the resource is a single object')
def test_expecting_many_but_the_resource_is_a_single_object():
    pass


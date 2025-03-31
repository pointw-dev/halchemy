import pytest
from assertpy import assert_that
from pytest_bdd import given, when, then, parsers
from __tests__.use_resources import *
from __tests__.use_resources.embedded import *


@pytest.fixture(scope='module')
def context():
    return {}

@scenario(FEATURE, 'Accessing a single embedded resource with no expectation')
def test_accessing_a_single_embedded_resource_with_no_expectation():
    pass

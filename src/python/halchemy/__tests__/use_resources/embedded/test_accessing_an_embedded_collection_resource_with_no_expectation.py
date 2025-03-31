import pytest
from pytest_bdd import given, when, then, parsers
from assertpy import assert_that
from __tests__.use_resources import *
from __tests__.use_resources.embedded import *


@pytest.fixture(scope='module')
def context():
    return {}


@scenario(FEATURE, 'Accessing an embedded collection resource with no expectation')
def test_accessing_an_embedded_collection_resource_with_no_expectation():
    pass

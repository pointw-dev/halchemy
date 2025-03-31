import pytest
from pytest_bdd import given, when, then, parsers
from assertpy import assert_that
from __tests__.use_resources import *
from __tests__.use_resources.embedded import *


@pytest.fixture(scope='module')
def context():
    return {}


@scenario(FEATURE, 'Accessing an embedded resource with expect set to one')
def test_accessing_an_embedded_resource_with_expect_set_to_one():
    pass

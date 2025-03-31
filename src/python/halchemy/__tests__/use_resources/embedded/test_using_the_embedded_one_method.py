import pytest
from pytest_bdd import given, when, then, parsers
from assertpy import assert_that
from __tests__.use_resources import *
from __tests__.use_resources.embedded import *


@pytest.fixture(scope='module')
def context():
    return {}


@scenario(FEATURE, 'Using the embedded_one method')
def test_using_the_embedded_one_method():
    pass


@when('I call embedded_one with rel library')
def step_impl(context):
    context['fetched'] = context['hal'].embedded_one('library')
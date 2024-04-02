import json
from pytest_bdd import scenario
from __tests__.make_http_requests.with_parameters import FEATURE
from __tests__.make_http_requests.shared_step_definitions import *


@scenario(FEATURE, 'Adding parameters to URL forms correct URLs in all cases')
def test_parameters_form_correct_url():
    pass


@given(parsers.parse('an endpoint at {url}'), target_fixture='context')
def context(url):
    context.api = Api()
    context.endpoint = context.api.using_endpoint(url)
    return context


@when(parsers.parse('I provide {parameters}'))
def supply_parameters(context, parameters):
    parameters = json.loads(parameters)
    context.url = context.endpoint.with_parameters(parameters).url


@then(parsers.parse('the result is a {correct_url}'))
def verify_url(context, correct_url):
    assert_that(context.url).ends_with(correct_url)

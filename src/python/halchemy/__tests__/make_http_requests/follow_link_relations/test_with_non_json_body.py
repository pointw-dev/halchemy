from pytest_bdd import scenario
from __tests__ import PAYLOAD_METHODS
from __tests__.make_http_requests.follow_link_relations import FEATURE
from __tests__.make_http_requests.shared_step_definitions import *


@scenario(FEATURE, 'I can pass non-JSON data and set its content-type')
def test_json_body_provided_as_dict():
    pass


# Given a HAL resource


@when(parsers.parse('the payload of a request is has {data} of a different {content_type}'))
def request_with_payload(data, content_type):
    context.bodies = {}
    context.last_responses = {}
    context.resources = {}
    if data.startswith('object:'):
        data = json.loads(data[7:].split('=>')[0])
    context.payload = data
    context.content_types = {}
    with requests_mock.Mocker() as m:
        m.register_uri(requests_mock.ANY, requests_mock.ANY, text='resp')
        for method in PAYLOAD_METHODS:
            context.resources[method] = getattr(context.api.follow(context.home).to('resource1'),
                                                method.lower())(context.payload, content_type)
            context.bodies[method] = m.last_request.text
            context.content_types[method] = m.last_request.headers['Content-type']


@then(parsers.parse('the request is made with the correct {data} and {content_type} header'))
def verify_requests(data, content_type):
    for method in PAYLOAD_METHODS:
        response = context.resources[method]._halchemy.response
        assert_that(response.status_code).is_between(200, 299)
        assert_that(context.content_types[method]).described_as('Content-type').is_equal_to(content_type)
        if data.startswith('object:'):
            data = data.split('=>')[1]
        assert_that(context.bodies[method]).described_as('the payload received').is_equal_to(data)

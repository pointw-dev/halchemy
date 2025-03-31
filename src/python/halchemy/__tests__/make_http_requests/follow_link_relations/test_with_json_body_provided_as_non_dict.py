from pytest_bdd import scenario
from __tests__ import PAYLOAD_METHODS
from __tests__.make_http_requests.follow_link_relations import FEATURE, compare_json_strings
from __tests__.make_http_requests.shared_step_definitions import *
from lib.json_type import JSON_NULL


@scenario(FEATURE, 'I can pass a native-language non-object representation of a JSON body')
def test_json_body_provided_as_non_dict():
    pass


# Given a HAL resource


@when(parsers.parse('I use data type that is not an object but is valid as JSON, e.g. {data}'))
def request_with_payload(data):
    context.bodies = {}
    context.resources = {}
    if data in ['true', 'false']:
        context.payload = eval(data.capitalize())
    elif data == 'null':
        context.payload = JSON_NULL
    else:
        context.payload = eval(data)
    context.content_types = {}
    with requests_mock.Mocker() as m:
        m.register_uri(requests_mock.ANY, requests_mock.ANY, text='resp')
        for method in PAYLOAD_METHODS:
            context.resources[method] = getattr(context.api.follow(context.home).to('resource1'),
                                                method.lower())(context.payload)
            context.bodies[method] = m.last_request.text
            context.content_types[method] = m.last_request.headers['Content-type']


@then('the request body is properly formatted JSON')
def verify_requests():
    for method in PAYLOAD_METHODS:
        if type(context.payload).__name__.endswith('JsonNullType'):
            expected_json_string = 'null'
        else:
            expected_json_string = json.dumps(context.payload)
        response = context.resources[method]._halchemy.response
        assert_that(response.status_code).is_between(200, 299)
        assert_that(context.content_types[method]).described_as('Content-type').is_equal_to('application/json')
        (assert_that(compare_json_strings(context.bodies[method], expected_json_string))
         .described_as('the payload received is the JSON string of the data passed').is_true())

from pytest_bdd import scenario
from halchemy.__tests__ import PAYLOAD_METHODS
from halchemy.__tests__.make_http_requests.follow_link_relations import FEATURE, compare_json_strings
from halchemy.__tests__.make_http_requests.shared_step_definitions import *


@scenario(FEATURE, 'I can pass a native-language object representation of a JSON body')
def test_json_body_provided_as_dict():
    pass


# Given a HAL resource


@when('I use an object my language uses to represent JSON as the payload of a request')
def request_with_payload():
    context.bodies = {}
    context.resources = {}
    context.payload = {
        'key1': 'value1',
        'key2': 2,
        'key3': True,
        'key4': None,
        'key5': [1, 2, 3],
        'key6': {'subkey1': 'sub value', 'subkey2': 2}
    }
    context.content_types = {}
    with requests_mock.Mocker() as m:
        m.register_uri(requests_mock.ANY, requests_mock.ANY, text='resp')
        for method in PAYLOAD_METHODS:
            context.resources[method] = getattr(context.api.follow(context.root).to('resource1'),
                                                method.lower())(context.payload)
            context.bodies[method] = m.last_request.text
            context.content_types[method] = m.last_request.headers['Content-type']


@then('the request body is properly formatted JSON')
def verify_requests():
    for method in PAYLOAD_METHODS:
        expected_json_string = json.dumps(context.payload)
        response = context.resources[method]._halchemy.response
        assert_that(response.status_code).is_between(200, 299)
        assert_that(context.content_types[method]).described_as('Content-type').is_equal_to('application/json')
        (assert_that(compare_json_strings(context.bodies[method], expected_json_string))
         .described_as('the payload received is the JSON string of the dict passed').is_true())

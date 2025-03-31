from pytest_bdd import scenario
from __tests__.make_http_requests.follow_link_relations import FEATURE
from __tests__.make_http_requests.shared_step_definitions import *


@scenario(FEATURE, 'Make requests using links provided by a resource')
def test_follows_link_relations_from_a_resource():
    pass


# Given a HAL resource


@when('I make a request using its link relations')
def follow_link_rels():
    context.calledUrls = {}
    with requests_mock.Mocker() as m:
        m.register_uri(requests_mock.ANY, requests_mock.ANY, text='resp')
        for rel in context.home['_links']:
            for method in ALL_METHODS:
                getattr(context.api.follow(context.home).to(rel), method.lower())()
                if rel not in context.calledUrls:
                    context.calledUrls[rel] = {}
                context.calledUrls[rel][method] = m.last_request.url


@then('the href of the link is used for the request')
def verify_requests():
    for rel, methods in context.calledUrls.items():
        for method, url in methods.items():
            assert_that(url).ends_with(context.home['_links'][rel]['href'])

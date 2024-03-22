import requests_mock

READ_METHODS = ['GET', 'HEAD', 'OPTIONS']
MODIFY_METHODS = ['PUT', 'PATCH', 'DELETE']
PAYLOAD_METHODS = ['POST', 'PUT', 'PATCH']
ALL_METHODS = READ_METHODS + MODIFY_METHODS


def make_requests(context, url):
    with requests_mock.Mocker() as m:
        context.request_urls = {}
        context.request_headers = {}
        context.resources = {}
        m.register_uri(requests_mock.ANY, requests_mock.ANY, text='resp', reason='OK')
        for method in ALL_METHODS:
            context.resources[method] = getattr(context.api.using_endpoint(url), method.lower())()
            context.request_urls[method] = m.last_request.url
            context.request_headers[method] = m.last_request.headers

from urllib.parse import urlparse, parse_qsl, urlencode

import requests_mock


def add_root_to_context(context):
    root_resource = {
        '_links': {
            'self': {'href': '/'},
            'resource1': {'href': '/path/to/resource1'},
            'resource2': {'href': '/resource2/is/the/path'}
        }
    }
    with requests_mock.Mocker() as m:
        m.register_uri('GET', 'http://example.org/', json=root_resource)
        context.root = context.api.root.get()


def are_query_strings_equal(actual, expected):
    parsed_actual = urlparse(f'https://example.org/?{actual}')
    parsed_expected = urlparse(f'https://example.org/?{expected}')

    actual_query = parse_qsl(parsed_actual.query, keep_blank_values=True)
    expected_query = parse_qsl(parsed_expected.query, keep_blank_values=True)

    sorted_actual = sorted(actual_query, key=lambda x: (x[0], x[1]))
    sorted_expected = sorted(expected_query, key=lambda x: (x[0], x[1]))

    reconstructed_actual = parsed_actual._replace(query=urlencode(sorted_actual, doseq=True)).geturl()
    reconstructed_expected = parsed_expected._replace(query=urlencode(sorted_expected, doseq=True)).geturl()

    rtn = reconstructed_actual == reconstructed_expected

    return rtn

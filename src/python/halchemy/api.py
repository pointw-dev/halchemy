"""Helper methods to enhance the requests module to operate Hypermedia APIs
   whose resources are represented by HAL (or HAL-like JSON)

Usage:
    Instantiate an object of type Api(), passing a base_api_url and optionally
    the value of the Authorization: header

Examples:
    api = Api('http://localhost:2112')
    people = api.get('/people')  # responds with collection whose members are in _items
    for person in people['_items']:
        print(f"{person['firstName']} {person['lastName']}")
        cars = api.get_from_rel(person, 'cars')
        print(f" - has {len(cars['_items'])} cars")

License:
    MIT License

    Copyright (c) 2023 Michael Ottoson

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
"""

import json
from requests.exceptions import HTTPError
from .requests_helper import RequestsWithDefaults
from urllib.parse import urlencode
from typing import Any, TypeAlias


JSON: TypeAlias = dict[str, "JSON"] | list["JSON"] | str | int | float | bool | None


class Actor:
    def __init__(self, api, resource, rel):
        self.api = api
        self.resource = resource
        self.rel = rel
        self.headers = {}
        self.params = {}
        self.template = {}

    def with_headers(self, headers: dict[str, Any]):
        self.headers.update(headers)
        return self

    def with_params(self, params: dict[str, Any]):
        self.params.update(params)
        return self

    def with_template(self, template: dict[str, Any]):
        self.template.update(template)
        return self

    def get(self):
        print(f"GET {self.resource['_links'][self.rel]['href']}")
        if self.params:
            print(f'params = {self.params}')
        if self.template:
            print(f'template = {self.template}')
        if self.headers:
            print(f'headers = {self.headers}')


class Follower:
    def __init__(self, api, resource):
        self.api = api
        self.resource = resource

    def to(self, rel):
        return Actor(self.api, self.resource, rel)


class Api:
    def __init__(self, base_api_url: str, headers: dict[str, Any] | None = None):  # root:password
        if headers is None:
            headers = {}

        self.base_api_url = base_api_url

        default_headers = {
            'Content-type': 'application/json',
            'Authorization': 'Basic cm9vdDpwYXNzd29yZA=='  # root:password
        }

        if headers:
            default_headers.update(headers)

        self._api = RequestsWithDefaults(url_base=self.base_api_url, headers=default_headers)
        self.last_error = {}

    def get(self, url: str = '/', headers: dict[str, Any] | None = None) -> JSON:
        if headers is None:
            headers = {}

        response = None
        try:
            self.last_error = {}

            response = self._api.get(url, headers=headers)
            if response.status_code == 404:
                return {}
            response.raise_for_status()
            return response.json()
        except HTTPError as ex:
            self._handle_error('GET', url, response, ex)

    def get_from_rel(self, resource,
                     rel: str,
                     parameters: dict[str, Any] | None = None,
                     template: dict[str, Any] | None = None,
                     headers: dict[str, Any] | None = None
                     ) -> JSON:
        if headers is None:
            headers = {}
        if template is None:
            template = {}
        if parameters is None:
            parameters = {}

        url = self.url_from_rel(resource, rel, parameters, template)
        return self.get(url, headers=headers)

    def post_to_rel(self, resource,
                    rel: str,
                    data: JSON,
                    parameters: dict[str, Any] | None = None,
                    template: dict[str, Any] | None = None,
                    headers: dict[str, Any] | None = None
                    ) -> JSON:
        if headers is None:
            headers = {}
        if template is None:
            template = {}
        if parameters is None:
            parameters = {}

        url = self.url_from_rel(resource, rel, parameters, template)
        return self.post_to_url(url, data, headers=headers)

    def delete_resource(self, resource, headers: dict[str, Any] | None = None) -> JSON:
        if headers is None:
            headers = {}

        url = self.url_from_rel(resource, 'self')
        headers.update({
            'If-Match': resource['_etag']
        })

        response = None
        try:
            self.last_error = {}
            response = self._api.delete(url, headers=headers)
            response.raise_for_status()
            return response.json()
        except HTTPError as ex:
            self._handle_error('DELETE', url, response, ex)

    def patch_resource(self, resource, data: JSON, headers: dict[str, Any] | None = None) -> JSON:
        if headers is None:
            headers = {}

        if type(data) is not str:
            data = json.dumps(data)
        url = self.url_from_rel(resource, 'self')
        headers.update({
            'If-Match': resource['_etag']
        })

        response = None
        try:
            self.last_error = {}
            response = self._api.patch(url, data=data, headers=headers)
            response.raise_for_status()
            return response.json()
        except HTTPError as ex:
            self._handle_error('PATCH', url, response, ex)

    def put_to_rel(self, resource,
                   rel: str,
                   data: JSON,
                   parameters: dict[str, Any] | None = None,
                   template: dict[str, Any] | None = None,
                   headers: dict[str, Any] | None = None
                   ) -> JSON:
        if headers is None:
            headers = {}

        if type(data) is not str:
            data = json.dumps(data)
        url = self.url_from_rel(resource, rel, parameters, template)
        headers.update({
            'If-Match': resource['_etag']
        })

        response = None
        try:
            self.last_error = {}
            response = self._api.put(url, data=data, headers=headers)
            response.raise_for_status()
            return response.json()
        except HTTPError as ex:
            self._handle_error('PUT', url, response, ex)

    def get_from_rel_with_lookup(self, resource,
                                 rel: str,
                                 lookup: str,
                                 parameters: dict[str, Any] | None = None,
                                 headers: dict[str, Any] | None = None
                                 ) -> JSON:
        # no template because lookup is an implicit template
        if headers is None:
            headers = {}
        if parameters is None:
            parameters = {}

        url = resource['_links'][rel]['href']
        if url[-1] != '/':
            url += '/'
        url += lookup

        query_string = urlencode(parameters)

        return self.get(f"{url}{'?' if parameters else ''}{query_string}", headers=headers)

    def post_to_url(self, url: str, data: JSON, headers: dict[str, Any] | None = None) -> JSON:
        if headers is None:
            headers = {}

        if type(data) is not str:
            data = json.dumps(data)

        response = None
        try:
            self.last_error = {}
            response = self._api.post(url, data=data, headers=headers)
            response.raise_for_status()
            return response.json()
        except HTTPError as ex:
            self._handle_error('POST', url, response, ex)

    def delete_url(self, url: str, headers: dict[str, Any] | None = None) -> JSON:
        if headers is None:
            headers = {}

        response = None
        try:
            self.last_error = {}
            response = self._api.delete(url, headers=headers)
            response.raise_for_status()
            return response.json()
        except HTTPError as ex:
            self._handle_error('DELETE', url, response, ex)

    @staticmethod
    def url_from_rel(resource, rel, parameters=None, template=None):
        if template is None:
            template = {}
        if parameters is None:
            parameters = {}

        url = resource['_links'][rel]['href']
        if resource['_links'][rel].get('templated', False):
            try:
                url = url.format(**template)
            except KeyError as ex:
                print(f'This link is templated.  You must supply a value for {ex}')
                return ''

        query_string = urlencode(parameters)

        return f"{url}{'?' if parameters else ''}{query_string}"

    def _handle_error(self, method, url, response, error):
        self.last_error = {
            'method': method,
            'url': url,
            'status_code': response.status_code,
            'reason': response.reason,
            'details': response.text,
            'response': response,
            'error': error
        }
        message = f'{method} {url} - {response.status_code} {response.reason}'
        details = response.text
        raise RuntimeError(f'{message}\n{details}\nsee self.last_error for more details')

    def follow(self, resource):
        return Follower(self, resource)

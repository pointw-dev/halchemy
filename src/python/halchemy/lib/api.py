"""
This module defines the Api class, which is the main class for interacting with HAL-based APIs.
"""

import json
from typing import Any

from requests import JSONDecodeError
from requests.structures import CaseInsensitiveDict

from .configuration import load_config
from .error_handling import ErrorHandling
from .follower import Follower
from .requester import Requester, ReadOnlyRequester
from .resource import Resource, HalResource, HalchemyMetadata
from .requests_helper import RequestsWithDefaults
from .json_type import JSON
from .http_model import Request, Response
from .status_codes import do_settings_include_status_code
from requests.exceptions import HTTPError  # TODO: make our own!

##########
# DEPRECATED
from urllib.parse import urlencode
##########


class Api:

    def __init__(self, base_url: str | None = None, headers: dict[str, Any] | None = None):
        config = load_config()
        self._base_url = base_url if base_url else config['halchemy']['base_url']
        self.parameters_list_style = config['halchemy']['parameters_list_style']
        self.etag_field = config['halchemy']['etag_field']
        self.error_handling = ErrorHandling()
        self.error_handling.raise_for_network_error = config['error_handling']['raise_for_network_errors']
        self.error_handling.raise_for_status_codes = config['error_handling']['raise_for_status_codes']
        self._headers = CaseInsensitiveDict(config['headers'])

        if headers:
            self._headers.update(headers)

        ####################
        # DEPRECATED
        self.last_error = {}
        ####################

        if not self._base_url:
            raise ValueError('You must provide a base API URL, either in the constructor or in a config file.')
        self._api = RequestsWithDefaults(url_base=self._base_url, headers=self._headers)

    @property
    def base_url(self) -> str:
        return self._base_url

    @base_url.setter
    def base_url(self, base_url: str):
        self._base_url = base_url
        self._api = RequestsWithDefaults(url_base=self._base_url, headers=self._headers)

    @property
    def headers(self) -> CaseInsensitiveDict:
        return self._headers

    @headers.setter
    def headers(self, headers: dict[str, Any]):
        self._headers = headers
        self._api = RequestsWithDefaults(url_base=self._base_url, headers=self._headers)

    def add_headers(self, headers: dict[str, Any]):
        self._headers.update(headers)
        self._api = RequestsWithDefaults(url_base=self._base_url, headers=self._headers)

    def remove_headers(self, headers: list[str]):
        for header in headers:
            self._headers.pop(header, None)
        self._api = RequestsWithDefaults(url_base=self._base_url, headers=self._headers)

    @property
    def root(self) -> Requester:
        return self.using_endpoint('/', is_root=True)

    def follow(self, resource: HalResource) -> Follower:
        return Follower(self, resource)

    def get_optimistic_concurrency_header(self, resource: HalResource) -> CaseInsensitiveDict:
        etag = None
        try:
            etag = resource._halchemy.response.headers.get('Etag')
        except AttributeError:
            pass
        if etag is None:
            etag = resource.get(self.etag_field)

        return CaseInsensitiveDict({'If-Match': etag}) if etag else {}

    def using_endpoint(self, url: str, is_root: bool=False) -> Requester | ReadOnlyRequester:
        if is_root:
            return ReadOnlyRequester(self, url)
        return Requester(self, url)

    def request(self,
                method: str,
                url: str,
                data: dict[str, Any] | None = None,
                headers: CaseInsensitiveDict | None = None
                ) -> Resource:

        if data is not None:
            if type(data).__name__.endswith('JsonNullType'):
                data = None
            content_type = (
                next((value for key, value
                      in {**self._headers, **headers}.items() if key.lower() == 'content-type'), None)
            )
            if content_type is None:
                # ?? raise ValueError('Content-type header is required when sending a request with a body')
                # ?? headers = {**headers, 'Content-type': 'application/octet-stream'}
                # ?? headers = {**headers, 'Content-type': 'application/json'}
                pass
            elif 'json' in content_type:  # and isinstance(data, dict):
                try:
                    data = json.dumps(data, default=str)
                except ValueError:
                    # ?? raise ValueError('Content-type header is set to JSON, but the data is not JSON serializable')
                    pass

        request = Request(
            method=method,
            url=url,
            headers=headers,
            body=data
        )

        try:
            result = self._api.request(method, url, data=data, headers=headers)
            request = Request(
                method=method,
                url=result.url,
                headers=CaseInsensitiveDict(dict(result.request.headers)),
                body=result.request.body
            )
        except Exception as e:
            response = Response(
                status_code=0,
                reason='Did not receive a response from the server',
                headers=CaseInsensitiveDict({}),
                body=None
            )
            resource = Resource()
            resource._halchemy = HalchemyMetadata(request, response, e)
            if self.error_handling.raise_for_network_error:
                raise ConnectionError(resource)
            return resource

        response = Response(
            status_code=result.status_code,
            reason=result.reason,
            headers=result.headers,
            body=result.text
        )

        rtn = Resource()
        try:
            rtn = HalResource(result.json())
        except JSONDecodeError:
            pass
        except ValueError:
            pass

        error = None
        try:
            result.raise_for_status()
        except Exception as e:
            error = e

        rtn._halchemy = HalchemyMetadata(request, response, error)
        self._raise_for_status_code(result.status_code, rtn)
        return rtn

    def _raise_for_status_code(self, status_code, response):
        should_raise = do_settings_include_status_code(self.error_handling.raise_for_status_codes, status_code)

        if should_raise:
            raise HTTPError(response)





##################################################################################
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

##################################################################################

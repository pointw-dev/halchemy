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
from .requests_helper import requests, RequestsWithDefaults
import socket
import re
import sys
from urllib.parse import urlencode


class Api:
    def __init__(self, base_api_url, auth='Basic cm9vdDpwYXNzd29yZA=='):  # root:password
        self.base_api_url = base_api_url
        self._api = RequestsWithDefaults(url_base=self.base_api_url, headers={
            'Content-type': 'application/json',
            'Cache-Control': 'no-cache',
            'Authorization': auth
        })

    @staticmethod
    def url_from_rel(resource, rel, parameters={}, template={}):
        url = resource['_links'][rel]['href']
        if resource['_links'][rel].get('templated', False):
            try:
                url = url.format(**template)
            except KeyError as ex:
                print(f'This link is templated.  You must supply a value for {ex}')
                return ''
        
        query_string = urlencode(parameters)
            
        return f"{url}{'?' if parameters else ''}{query_string}"

    def get(self, url='/'):
        response = self._api.get(url)
        if response.status_code == 404:
            return None
        try:
            response.raise_for_status()
            return response.json()
        except:
            message = f'GET {url} - {response.status_code} {response.reason}'
            details = response.text
            raise RuntimeError(f'{message}\n{details}')

    def get_from_rel(self, resource, rel='self', parameters={}, template={}):        
        url = self.url_from_rel(resource, rel, parameters, template)
        return self.get(url)

    def get_from_rel_with_lookup(self, resource, rel, lookup, parameters={}):        
        url = resource['_links'][rel]['href']
        if url[-1] != '/':
            url += '/'
        url += lookup
        
        query_string = urlencode(parameters)
            
        return self.get(f"{url}{'?' if parameters else ''}{query_string}")        

    def post_to_url(self, url, data):
        if type(data) is not str:
            data = json.dumps(data)
        response = self._api.post(url, data=data)
        response.raise_for_status()
        return response.json()

    def post_to_rel(self, resource, rel, data, parameters={}, template={}):
        url = self.url_from_rel(resource, rel, parameters, template)
        return self.post_to_url(url, data)

    def patch_resource(self, resource, data):
        if type(data) is not str:
            data = json.dumps(data)
        url = self.url_from_rel(resource, 'self')
        headers = {
            'If-Match': resource['_etag']
        }
        response = self._api.patch(url, data=data, headers=headers)

        try:
            response.raise_for_status()
            return response.json()
        except:
            message = f'{response.status_code} {response.reason}'
            details = response.text
            raise RuntimeError(f'PATCH {url}\n{headers}\n{message}\n{details}\n\n{data}')

    def put_to_rel(self, resource, rel, data):
        if type(data) is not str:
            data = json.dumps(data)
        url = self.url_from_rel(resource, rel)
        headers = {
            'If-Match': resource['_etag']
        }
        response = self._api.put(url, data=data, headers=headers)

        try:
            response.raise_for_status()
            return response.json()
        except:
            message = f'{response.status_code} {response.reason}'
            details = response.text
            raise RuntimeError(f'PUT {url}\n{headers}\n{message}\n{details}\n\n{data}')

    def delete_url(self, url):
        response = self._api.delete(url)

        try:
            response.raise_for_status()
        except:
            message = f'{response.status_code} {response.reason}'
            details = response.text
            raise RuntimeError(f'DELETE {url}\n{message}\n{details}')

    def delete_resource(self, resource):
        url = self.url_from_rel(resource, 'self')
        headers = {
            'If-Match': resource['_etag']
        }
        response = self._api.delete(url, headers=headers)

        try:
            response.raise_for_status()
        except:
            message = f'{response.status_code} {response.reason}'
            details = response.text
            raise RuntimeError(f'DELETE {url}\n{headers}\n{message}\n{details}')

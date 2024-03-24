from typing import Any, Tuple
from urllib.parse import quote_plus
from requests.structures import CaseInsensitiveDict
from .resource import HalResource


class BaseRequester:
    def __init__(self, api, target: str | Tuple[HalResource, str]):
        self._api = api
        self._headers = CaseInsensitiveDict({})
        self._parameters = {}
        self._template_values = {}
        self._data = None

        if type(target) is str:
            self._url = target
            self._is_templated = False
            self.resource = None
            return

        resource, rel = target
        self._url = resource['_links'][rel]['href']
        self._is_templated = resource['_links'][rel].get('templated', False)
        self.resource = resource

    @property
    def url(self):
        url = self._url
        # ASSERT: the href IS a URL

        if self._is_templated:
            missing_keys = [k.strip("{}") for k in url.split("/")
                            if "{" in k and k.strip("{}") not in self._template_values]

            if not self._template_values:
                raise ValueError("This link is templated, but no template values were provided. "
                                 f"Missing template values for link: {', '.join(missing_keys)}")

            if missing_keys:
                raise ValueError(f"Not enough template values were provided. "
                                 f"Missing template values for link: {', '.join(missing_keys)}")

            url = url.format(**self._template_values)

        if self._parameters:
            url = self._add_parameters_to_url(url, self._parameters)

        return url

    def with_headers(self, headers: dict[str, Any]):
        self._headers.update(headers)
        return self

    def with_parameters(self, parameters: dict[str, Any]):
        self._parameters.update(parameters)
        return self

    def with_template_values(self, template_values: dict[str, Any]):
        self._template_values.update(template_values)
        return self

    def _handle_list(self, key: str, array: list) -> list:
        list_style = self._api.parameters_list_style

        if list_style == "repeat_key":
            return [(key, quote_plus(str(item))) for item in array]
        elif list_style == "bracket":
            return [(f"{key}[]", quote_plus(str(item))) for item in array]
        elif list_style == "index":
            return [(f"{key}[{index}]", quote_plus(str(item))) for index, item in enumerate(array)]
        elif list_style == "comma":
            return [(key, ','.join(quote_plus(str(item)) for item in array))]
        elif list_style == "pipe":
            return [(key, '|'.join(quote_plus(str(item)) for item in array))]
        else:
            raise ValueError(f"Unsupported parameters list style: {list_style}")

    def _flatten_parameters(self, prefix: str, parameters: dict) -> list:
        flattened = []
        for key, value in parameters.items():
            full_key = f"{prefix}.{key}" if prefix else key
            if value is None:
                flattened.append((full_key, None))
            elif isinstance(value, list):
                flattened.extend(self._handle_list(full_key, value))
            elif isinstance(value, dict):
                flattened.extend(self._flatten_parameters(full_key, value))
            elif isinstance(value, bool):
                flattened.append((full_key, str(value).lower()))
            else:
                flattened.append((full_key, quote_plus(str(value))))
        return flattened

    def _add_parameters_to_url(self, url: str, parameters: dict) -> str:
        query_params = self._flatten_parameters('', parameters)

        query_string_parts = []
        for key, value in query_params:
            part = key if value is None else f"{key}={value}"
            query_string_parts.append(part)
        query_string = '&'.join(query_string_parts)

        if '?' in url and not url.endswith('?'):
            return f"{url}&{query_string}"
        else:
            return f"{url}{'' if url.endswith('?') else '?'}{query_string}"

    def _request(self, method: str):
        return self._api.request(method, self.url, data=self._data, headers=self._headers)


class ReadOnlyRequester(BaseRequester):
    def __init__(self, api, target: str | Tuple[HalResource, str]):
        super().__init__(api, target)

    def get(self):
        return self._request('GET')

    def head(self):
        return self._request('HEAD')

    def options(self):
        return self._request('OPTIONS')


class Requester(ReadOnlyRequester):
    def __init__(self, api, target: str | Tuple[HalResource, str]):
        super().__init__(api, target)

    def post(self, data=None, content_type=None):
        self._prepare_payload(data, content_type)
        return self._request('POST')

    def put(self, data=None, content_type=None):
        self._prepare_payload(data, content_type)
        self._prepare_modify_header()
        return self._request('PUT')

    def patch(self, data=None, content_type=None):
        self._prepare_payload(data, content_type)
        self._prepare_modify_header()
        return self._request('PATCH')

    def delete(self):
        self._prepare_modify_header()
        return self._request('DELETE')

    def _prepare_payload(self, data, content_type):
        self._data = data
        if content_type:
            self._headers['Content-type'] = content_type

    def _prepare_modify_header(self):
        if self.resource:
            self._headers.update(self._api.get_optimistic_concurrency_header(self.resource))

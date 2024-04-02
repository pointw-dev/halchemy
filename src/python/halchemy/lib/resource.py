"""
The Resource class extends a plain dictionary to include a metadata object containing details
about the HTTP request and response.  This lets the metadata stay "out of the way" allowing
the client code to use the result of a request directly as a resource without losing access
to the request details, response details, and any error details.  If the resource is a HAL
representation, the HalResource class also provides extra functionality.
"""

from typing import Iterator

from .http_model import Response, Request
from .status_codes import do_settings_include_status_code
from requests.exceptions import HTTPError


class HalchemyMetadata:
    def __init__(self, request: Request, response: Response, error: Exception | None = None):
        self.response: Response | None = response
        self.request: Request | None = request
        self.error = error

    def raise_for_status_codes(self, settings: str = '>399'):
        status_code = self.response.status_code
        should_raise = do_settings_include_status_code(settings, status_code)

        if should_raise:
            raise HTTPError(self)


class Resource(dict):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._halchemy: HalchemyMetadata | None = None


class HalResource(Resource):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        is_hal = True

        if '_links' not in self or not isinstance(self['_links'], dict):
            is_hal = False
        elif 'self' not in self['_links'] or not isinstance(self['_links']['self'], dict):
            is_hal = False
        elif 'href' not in self['_links']['self'] or not isinstance(self['_links']['self']['href'], str):
            is_hal = False
        elif '_embedded' in self and not isinstance(self['_embedded'], dict):
            is_hal = False

        if not is_hal:
            raise ValueError('Not a HAL resource')

    def has_rel(self, rel: str) -> bool:
        return '_links' in self and rel in self['_links']

    def collection(self, field: str) -> Iterator['HalResource']:
        if field not in self:
            raise ValueError(f"Field '{field}' does not exist, so cannot be iterated as a collection")
        if not isinstance(self[field], list):
            raise ValueError(f"Field '{field}' is not a collection")
        try:
            for item in self[field]:
                yield HalResource(item)
        except ValueError as e:
            raise ValueError(f"The '{field}' collection contains non-HAL formatted objects")

    @property
    def links(self) -> list[str]:
        return list(self['_links'].keys())

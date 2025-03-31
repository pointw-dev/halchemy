"""
The Resource class extends a plain dictionary to include a metadata object containing details
about the HTTP request and response.  This lets the metadata stay "out of the way" allowing
the client code to use the result of a request directly as a resource without losing access
to the request details, response details, and any error details.  If the resource is a HAL
representation, the HalResource class also provides extra functionality.
"""

from typing import Iterator, Any, Dict, List, Optional, Union, cast
from enum import Enum

from .http_model import Response, Request
from .status_codes import do_settings_include_status_code
from requests.exceptions import HTTPError

class Multiplicity(Enum):
    ONE = 'one'
    MANY = 'many'


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
    """
    Validates and represents a HAL resource with embedded/link helpers
    """
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        problem = None

        self._embedded: Dict[str, Any] = self.get('_embedded', {})
        self._links: Dict[str, Any] = self.get('_links', {})

        if not isinstance(self._links, dict):
            problem = "'_links' must be an object"
        elif 'self' not in self._links or not isinstance(self._links['self'], dict):
            problem = "'_links.self' must be an object"
        elif 'href' not in self._links['self'] or not isinstance(self._links['self']['href'], str):
            problem = "'_links.self.href' must be a string"
        elif '_embedded' in self and not isinstance(self._embedded, dict):
            problem = "'_embedded' must be an object"

        if problem:
            raise ValueError(f'Not a well-formed HAL resource: {problem}')

    def __repr__(self) -> str:
        href = self._links['self']['href']
        return f"<HalResource href='{href}'>"

    def has_rel(self, rel: str) -> bool:
        return rel in self._links

    def has_embedded(self, rel: str) -> bool:
        return rel in self._embedded

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
        return list(self._links.keys())

    @property
    def embedded_rels(self) -> list[str]:
        return list(self._embedded.keys())

    def embedded(self, rel: str, expect: Optional[Multiplicity] = None) -> Union['HalResource', List['HalResource']]:
        if rel not in self._embedded:
            raise KeyError(f"No embedded resource found for rel '{rel}'")

        val = self._embedded[rel]

        if expect == Multiplicity.MANY:
            if not isinstance(val, list):
                raise TypeError(f"Expected list for rel '{rel}', got {type(val).__name__}")
            return [HalResource(v) for v in val]

        elif expect == Multiplicity.ONE:
            if not isinstance(val, dict):
                raise TypeError(f"Expected object for rel '{rel}', got {type(val).__name__}")
            return HalResource(val)

        if isinstance(val, list):
            return [HalResource(v) for v in val]
        elif isinstance(val, dict):
            return HalResource(val)
        else:
            raise TypeError(f"Invalid embedded value for rel '{rel}': expected object or array, got {type(val).__name__}")

    def embedded_many(self, rel: str) -> List['HalResource']:
        return cast(List[HalResource], self.embedded(rel, expect=Multiplicity.MANY))

    def embedded_one(self, rel: str) -> 'HalResource':
        return cast(HalResource, self.embedded(rel, expect=Multiplicity.ONE))

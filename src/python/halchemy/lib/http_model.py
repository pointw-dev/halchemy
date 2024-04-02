"""
This module contains the data model for HTTP requests and responses.  Intended only for internal use.
"""

from typing import NamedTuple, Optional

from requests.structures import CaseInsensitiveDict


class Request(NamedTuple):
    method: str
    url: str
    headers: CaseInsensitiveDict
    body: Optional[str] = None


class Response(NamedTuple):
    status_code: int
    reason: str
    headers: CaseInsensitiveDict
    body: Optional[str] = None

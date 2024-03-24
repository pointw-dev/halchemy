from typing import Dict, NamedTuple, Optional

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

# from typing import Dict, Optional, Union
#
#
# class HttpRequest:
#     def __init__(self, method: str, url: str, headers: Optional[Dict[str, str]] = None, body: Optional[Union[str, bytes]] = None):
#         self.method = method
#         self.url = url
#         self.headers = headers if headers is not None else {}
#         self.body = body
#
#     def __repr__(self):
#         return f"HttpRequest(method={self.method}, url={self.url}"
#
#
# class HttpResponse:
#     def __init__(self, status_code: int, reason: str, headers: Optional[Dict[str, str]] = None, body: Optional[Union[str, bytes]] = None):
#         self.status_code = status_code
#         self.reason = reason
#         self.headers = headers if headers is not None else {}
#         self.body = body
#
#     def __repr__(self):
#         return f"HttpResponse(status_code={self.status_code}, reason={self.reason}"

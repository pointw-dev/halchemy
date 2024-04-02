"""
This module provides the Follower class, which is used to follow links from a HalResource.
"""

from .resource import HalResource
from .requester import Requester


class Follower:
    def __init__(self, api, resource: HalResource):
        self.api = api
        self.resource = resource

    def to(self, rel: str) -> Requester:
        if rel not in self.resource['_links']:
            raise KeyError(f"This resource does not have a link relation named '{rel}'")
        return Requester(self.api, (self.resource, rel))

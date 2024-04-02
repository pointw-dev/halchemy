"""
This module contains the type alias for JSON and JSON_NULL.  Use JSON_NULL when you want to explicitly include
a null value in your request body, instead of using a regular null|None which will result in an empty body.
"""

from typing import TypeAlias

JSON: TypeAlias = dict[str, "JSON"] | list["JSON"] | str | int | float | bool | None


class JsonNullType:
    def __repr__(self):
        return 'JSON_NULL'


JSON_NULL = JsonNullType()

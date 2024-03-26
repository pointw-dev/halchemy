from typing import TypeAlias

JSON: TypeAlias = dict[str, "JSON"] | list["JSON"] | str | int | float | bool | None


class JsonNullType:
    def __repr__(self):
        return 'JSON_NULL'


JSON_NULL = JsonNullType()

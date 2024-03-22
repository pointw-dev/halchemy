import json

FEATURE = 'make_http_requests/follows_link_relations.feature'


def compare_json_strings(json_str1: str, json_str2: str) -> bool:
    try:
        obj1 = json.loads(json_str1)
        obj2 = json.loads(json_str2)
    except json.JSONDecodeError as e:
        return False
    except TypeError:
        return False

    return obj1 == obj2

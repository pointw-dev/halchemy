def parse_status_code_setting(status_code_setting: str):
    """
    Parses a status code setting string into a list of conditions.

    Returns a list of tuples in the form:
    - ('range', start, end) for range conditions
    - ('gt', value, None) for greater-than conditions
    - ('lt', value, None) for less-than conditions
    - ('gte', value, None) for greater-than-or-equal conditions
    - ('lte', value, None) for less-than-or-equal conditions
    - ('eq', value, None) for exact match conditions
    """
    parts = status_code_setting.replace(',', ' ').split()
    ranges = []
    for part in parts:
        part = part.strip()
        if '-' in part:
            start, end = map(int, part.split('-'))
            ranges.append(('range', start, end))
        elif part.startswith('>='):
            value = int(part[2:])
            ranges.append(('gte', value))
        elif part.startswith('<='):
            value = int(part[2:])
            ranges.append(('lte', value))
        elif part.startswith('>'):
            value = int(part[1:])
            ranges.append(('gt', value))
        elif part.startswith('<'):
            value = int(part[1:])
            ranges.append(('lt', value))
        else:
            value = int(part)
            ranges.append(('eq', value))
    return ranges


def do_settings_include_status_code(settings: str, status_code: int):
    """
    Determines if a status code is included in the settings.

    :param settings: The status code settings string (e.g., '>=400', '400-403, >404').
    :param status_code: The status code to check.
    :return: True if the status code matches the settings, False otherwise.
    """
    if settings is None:
        return False

    included = False
    range_setting = parse_status_code_setting(settings)
    for condition, *values in range_setting:
        if condition == 'range' and values[0] <= status_code <= values[1]:
            included = True
        elif condition == 'gt' and status_code > values[0]:
            included = True
        elif condition == 'lt' and status_code < values[0]:
            included = True
        elif condition == 'gte' and status_code >= values[0]:
            included = True
        elif condition == 'lte' and status_code <= values[0]:
            included = True
        elif condition == 'eq' and status_code == values[0]:
            included = True

    return included

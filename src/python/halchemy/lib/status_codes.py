def parse_status_code_setting(status_code_setting: str):
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

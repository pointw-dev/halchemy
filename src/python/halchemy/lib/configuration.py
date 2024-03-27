import inspect
import os
import configparser


def get_caller_file():
    # Get the current stack frame and go back one level to find the caller
    # The 0-index is the current function, 1-index is the caller
    caller_frame = inspect.stack()[4]
    caller_module = inspect.getmodule(caller_frame[0])
    if caller_module is not None and hasattr(caller_module, '__file__'):
        # Return the path of the caller's file
        return caller_module.__file__
    else:
        # Caller does not have a __file__ attribute, or inspection failed
        return None


def find_project_root(current_dir=None):
    current_dir = current_dir or os.path.dirname(get_caller_file())
    root_indicators = [
        '.git', 'pyproject.toml', 'requirements.txt',
        'setup.py', 'setup.cfg', '.venv', 'venv',
        '.project', '.idea', '.vscode',
        'Pipfile', 'poetry.lock', '.halchemy'
    ]
    while current_dir != os.path.dirname(current_dir):  # Stop at the filesystem root
        if any(os.path.exists(os.path.join(current_dir, indicator)) for indicator in root_indicators):
            return current_dir
        current_dir = os.path.dirname(current_dir)
    return None


def ini_to_dict(config_filename, project_root):
    config = {}
    config_path = os.path.join(project_root, config_filename)
    if os.path.exists(config_path):
        parser = configparser.ConfigParser()
        parser.read(config_path)
        for section in parser.sections():
            config[section] = dict(parser.items(section))
    return config


def load_config():
    config_filename = '.halchemy'
    project_root = find_project_root()
    rtn = {
        'halchemy': {
            'base_url': 'http://localhost:2112',
            'parameters_list_style': 'repeat_key',
            'etag_field': '_etag'
        },
        'headers': {
            'Content-type': 'application/json',
            'Accept': 'application/hal+json, application/json;q=0.9, */*;q=0.8',
            'Authorization': 'Basic cm9vdDpwYXNzd29yZA=='  # root:password
        },
        'error_handling': {
            'raise_for_network_errors': True,
            'raise_for_status_codes': None
        }
    }
    config = {}

    if project_root is not None:
        config = ini_to_dict(config_filename, project_root)

    if not config:
        home_dir = os.path.expanduser('~')
        config = ini_to_dict(config_filename, home_dir)

    rtn['halchemy'].update(config.get('halchemy', {}))
    rtn['headers'].update(config.get('headers', {}))
    rtn['error_handling'].update(config.get('error_handling', {}))

    return rtn

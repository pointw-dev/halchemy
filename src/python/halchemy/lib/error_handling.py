"""
This module defines the ErrorHandling class which the Api class uses to determine how to handle errors.
"""


class ErrorHandling:
    def __init__(self):
        self.raise_for_network_error: bool = True
        self.raise_for_status_codes: str | None = None

    def __str__(self):
        return f'raise_on_network_error: {self.raise_for_network_error}, raise_for_status_codes: {self.raise_for_status_codes}'

    def __repr__(self):
        return f'ErrorSettings({str(self)})'

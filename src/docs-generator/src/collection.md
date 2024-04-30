

```python
def collection(self, field: str) -> Iterator['HalResource']:
    if field not in self:
        raise ValueError(f"Field '{field}' does not exist, so cannot be iterated as a collection")
    if not isinstance(self[field], list):
        raise ValueError(f"Field '{field}' is not a collection")
    try:
        for item in self[field]:
            yield HalResource(item)
    except ValueError as e:
        raise ValueError(f"The '{field}' collection contains non-HAL formatted objects")
```
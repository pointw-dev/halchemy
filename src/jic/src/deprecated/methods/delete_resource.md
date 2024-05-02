# DELETE resource
::: warning
This API is frozen and deprecated.  Please use the fluent API from 0.9.4 on
:::

Sends a DELETE request to the resource's `self` rel.

::: tip
You should handle exceptions thrown by the request.  See [Optimistic Concurrency] for more details.
:::

## Signature
The method signature for **DELETE resource** is:
<tabs>
<tab name="Python">

```python
delete_resource(resource, headers: dict[str, Any] | None = None) -> JSON
```
> `JSON: TypeAlias = dict[str, "JSON"] | list["JSON"] | str | int | float | bool | None`
</tab>

<tab name="JavaScript">

```javascript
deleteResource(resource:HalResource, headers = {}): Promise<any>
```
</tab>

<future-languages />
</tabs>

| parameter         | description                                                                 |
| ----------------- | --------------------------------------------------------------------------- |
| `resource`        | The resource, from a previous request, that you wish to delete              |
| `headers`         | (optional) add to or override the default headers.<br/>[learn more](/deprecated/headers) |
| -> *returns*      | the JSON from the payload of the response to this request                   |


## Examples

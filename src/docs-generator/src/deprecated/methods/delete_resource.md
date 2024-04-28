
# DELETE resource
Deprecated
{: .label .label-yellow }

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

{: style="text-align: left" }
| parameter         | description                                                                 |
| ----------------- | --------------------------------------------------------------------------- |
| `resource`        | The resource, from a previous request, that you wish to delete              |
| `headers`         | (optional) add to or override the default headers. [[learn more]](/headers) |
| -> *returns*      | the JSON from the payload of the response to this request                   |


## Examples

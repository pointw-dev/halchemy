# PATCH resource
Deprecated
{: .label .label-yellow }

Sends a PATCH request with data to the resource's `self` rel.

> Note, you should handle exceptions thrown by the request.  See [Optimistic Concurrency] for more details.

## Signature
The method signature for **PATCH resource** is:
<tabs>
<tab name="Python">

```python
patch_resource(resource, data: JSON, headers: dict[str, Any] | None = None) -> JSON
```
> `JSON: TypeAlias = dict[str, "JSON"] | list["JSON"] | str | int | float | bool | None`
</tab>

<tab name="JavaScript">

```javascript
patchResource(resource:HalResource, data:{}, headers = {}): Promise<any>
```
</tab>

<future-languages />
</tabs>

{: style="text-align: left" }
| parameter         | description                                                                 |
| ----------------- | --------------------------------------------------------------------------- |
| `resource`        | The body of a response from a previous request, in HAL format               |
| `data`            | The payload to PATCH                                                        |
| `headers`         | (optional) add to or override the default headers. [[learn more]](/headers) |
| -> *returns*      | the JSON from the payload of the response to this request                   |


## Examples

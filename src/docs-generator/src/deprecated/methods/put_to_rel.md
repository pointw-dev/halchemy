# PUT to rel
::: warning
This API is frozen and deprecated.  Please use the fluent API from 0.9.4 on
:::

Follows a resource's link by way of its rel and sends a POST request with data.

> Note, you should handle exceptions thrown by the request.  See [Optimistic Concurrency] for more details.

## Signature
The method signature for **PUT to rel** is:
<tabs>
<tab name="Python">

```python
put_to_rel(resource,
           rel: str,
           data: JSON,
           parameters: dict[str, Any] | None = None,
           template: dict[str, Any] | None = None,
           headers: dict[str, Any] | None = None
           ) -> JSON
```
> `JSON: TypeAlias = dict[str, "JSON"] | list["JSON"] | str | int | float | bool | None`
</tab>

<tab name="JavaScript">

```javascript
putToRel({resource, rel, parameters = {}, template = {}}: RelSpec, data:{}, headers = {}): Promise<HalResource | {}>
```
> With JavaScript, the first four paramters are actually members of one parameter of type `RelSpec`, with each being a member of that object.
</tab>

<future-languages />
</tabs>

| parameter         | description                                                                                            |
| ----------------- | ------------------------------------------------------------------------------------------------------ |
| `resource`        | The body of a response from a previous request, in HAL format                                          |
| `rel`             | The name of the link relation this PUT request will follow.                                            |
| `parameters`      | (optional) name/value pairs which will be used to create a query string.<br/>[learn more](/deprecated/parameters)   |
| `template`        | (optional) if the link is templated, name/value pairs to fill the template.<br/>[learn more](/deprecated/templates) |
| `headers`         | (optional) add to or override the default headers.<br/>[learn more](/deprecated/headers)                            |
| -> *returns*      | the JSON from the payload of the response to this request                                              |


## Examples

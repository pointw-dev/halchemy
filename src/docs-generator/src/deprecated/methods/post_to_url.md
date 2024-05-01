# POST to URL
::: warning
This API is frozen and deprecated.  Please use the fluent API from 0.9.4 on
:::

This seldom used method is available if, for some reason, you need to POST data to a URL outside of the web of links provided by the API.

## Signature
The method signature for **POST to URL** is:
<tabs>
<tab name="Python">

```python
post_to_url(url: str, data: JSON, headers: dict[str, Any] | None = None) -> JSON
```
> `JSON: TypeAlias = dict[str, "JSON"] | list["JSON"] | str | int | float | bool | None`
</tab>

<tab name="JavaScript">

```javascript
postToUrl(url:string, data: {}, headers = {}): Promise<any>
```
> With JavaScript, the first four paramters are actually members of one parameter of type `RelSpec`, with each being a member of that object.
</tab>

<future-languages />
</tabs>

| parameter         | description                                                                 |
| ----------------- | --------------------------------------------------------------------------- |
| `url`             | The URL to POST to.                                                         |
| `data`            | The payload to POST                                                         |
| `headers`         | (optional) add to or override the default headers.<br/>[learn more](/deprecated/headers) |
| -> *returns*      | the JSON from the payload of the response to this request                   |


## Examples

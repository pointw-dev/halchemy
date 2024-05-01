# DELETE URL
::: warning
This API is frozen and deprecated.  Please use the fluent API from 0.9.4 on
:::

This seldom used method is available if, for some reason, you need to send a DELETE request to a URL outside of the web of links provided by the API.


## Signature
The method signature for **DELETE URL** is:
<tabs>
<tab name="Python">

```python
delete_url(url:str, headers: dict[str, Any] | None = None) -> JSON
```
> `JSON: TypeAlias = dict[str, "JSON"] | list["JSON"] | str | int | float | bool | None`
</tab>

<tab name="JavaScript">

```javascript
deleteUrl(url: string, headers: {}): Promise<any>
```
</tab>

<future-languages />
</tabs>

| parameter         | description                                                                 |
| ----------------- | ----------------------------------------------------------------------------|
| `url`             | The URL to send the DELETE request to                                       |
| `headers`         | (optional) add to or override the default headers.<br/>[learn more](/deprecated/headers) |
| -> *returns*      | the JSON from the payload of the response to this request                   |


## Examples

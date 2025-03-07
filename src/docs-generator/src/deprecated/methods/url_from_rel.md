# URL from rel
::: warning
This API is frozen and deprecated.  Please use the fluent API from 0.9.4 on
:::

This method is used internally to resolve a resource's rel, with parameters and templates, into a URL to follow.  It is available as a public method in the unlikely event you need to build URLs in a similar fashion.

## Signature
The method signature for **URL from rel** is:
<tabs>
<tab name="Python">

```python
@staticmethod
url_from_rel(resource, rel, parameters={}, template={}) -> str
```
</tab>

<tab name="JavaScript">

```javascript
urlFromRel({resource, rel, parameters = {}, template = {}}: RelSpec): string
```
> With JavaScript, the first four parameters are actually members of one parameter of type `RelSpec`, with each being a member of that object.
</tab>

<future-languages />
</tabs>

| parameter         | description                                                                                            |
| ----------------- | ------------------------------------------------------------------------------------------------------ |
| `resource`        | The body of a response from a previous request, in HAL format                                          |
| `rel`             | The name of the link relation.                                                                         |
| `parameters`      | (optional) name/value pairs which will be used to create a query string.<br/>[[learn more]](/deprecated/parameters)   |
| `template`        | (optional) if the link is templated, name/value pairs to fill the template.<br/>[[learn more]](/deprecated/templates) |
| -> *returns*      | the URL                                                                                                |


## Examples

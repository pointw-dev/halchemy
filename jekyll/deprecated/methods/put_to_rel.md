---
title: PUT to rel
permalink: /deprecated/methods/put_to_rel
grand_parent: Deprecated API
parent: Methods
nav_order: 6

layout: page
---
# {{ page.title }}
Deprecated
{: .label .label-yellow }

Follows a resource's link by way of its rel and sends a POST request with data.

> Note, you should handle exceptions thrown by the request.  See [Optimistic Concurrency] for more details.

## Signature
The method signature for **PUT to rel** is:
{% tabs signature %}
{% tab signature Python %}
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
{% endtab %}

{% tab signature JavaScript %}
```javascript
putToRel({resource, rel, parameters = {}, template = {}}: RelSpec, data:{}, headers = {}): Promise<HalResource | {}>
```
> With JavaScript, the first four paramters are actually members of one parameter of type `RelSpec`, with each being a member of that object.
{% endtab %}
{% endtabs %}

{: style="text-align: left" } 
| parameter         | description                                                                                            |
| ----------------- | ------------------------------------------------------------------------------------------------------ |
| `resource`        | The body of a response from a previous request, in HAL format                                          |
| `rel`             | The name of the link relation this PUT request will follow.                                            |
| `parameters`      | (optional) name/value pairs which will be used to create a query string. [[learn more]](/parameters)   |
| `template`        | (optional) if the link is templated, name/value pairs to fill the template. [[learn more]](/templates) |
| `headers`         | (optional) add to or override the default headers. [[learn more]](/headers)                            |
| -> *returns*      | the JSON from the payload of the response to this request                                              |


## Examples

---
title: PATCH resource
permalink: /deprecated/methods/patch_resource
grand_parent: Deprecated API
parent: Methods
nav_order: 5

layout: page
---
# {{ page.title }}
Deprecated
{: .label .label-yellow }

Sends a PATCH request with data to the resource's `self` rel.  

> Note, you should handle exceptions thrown by the request.  See [Optimistic Concurrency] for more details.

## Signature
The method signature for **PATCH resource** is:
{% tabs signature %}
{% tab signature Python %}
```python
patch_resource(resource, data: JSON, headers: dict[str, Any] | None = None) -> JSON
``` 
> `JSON: TypeAlias = dict[str, "JSON"] | list["JSON"] | str | int | float | bool | None`
{% endtab %}

{% tab signature JavaScript %}
```javascript
patchResource(resource:HalResource, data:{}, headers = {}): Promise<any>
```
{% endtab %}
{% endtabs %}

{: style="text-align: left" } 
| parameter         | description                                                                 |
| ----------------- | --------------------------------------------------------------------------- |
| `resource`        | The body of a response from a previous request, in HAL format               |
| `data`            | The payload to PATCH                                                        |
| `headers`         | (optional) add to or override the default headers. [[learn more]](/headers) |
| -> *returns*      | the JSON from the payload of the response to this request                   |


## Examples

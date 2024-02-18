---
title: DELETE resource
permalink: /deprecated/methods/delete_resource
grand_parent: Deprecated API
parent: Methods
nav_order: 4

layout: page
---

# {{ page.title }}
Deprecated
{: .label .label-yellow }

Sends a DELETE request to the resource's `self` rel.

## Signature
The method signature for **DELETE resource** is:
{% tabs signature %}
{% tab signature Python %}
```python
delete_resource(resource, headers: dict[str, Any] | None = None) -> JSON
```
> `JSON: TypeAlias = dict[str, "JSON"] | list["JSON"] | str | int | float | bool | None`
{% endtab %}

{% tab signature JavaScript %}
```javascript
deleteResource(resource:HalResource, headers = {}): Promise<any>
```
{% endtab %}
{% endtabs %}

{: style="text-align: left" } 
| parameter         | description                                                                 |
| ----------------- | --------------------------------------------------------------------------- |
| `resource`        | The resource, from a previous request, that you wish to delete              |
| `headers`         | (optional) add to or override the default headers. [[learn more]](/headers) |
| -> *returns*      | the JSON from the payload of the response to this request                   |


## Examples

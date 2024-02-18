---
title: DELETE URL
permalink: /deprecated/methods/delete_url
grand_parent: Deprecated API
parent: Methods
nav_order: 9

layout: page
---

# {{ page.title }}
Deprecated
{: .label .label-yellow }

This seldom used method is available if, for some reason, you need to send a DELETE request to a URL outside of the web of links provided by the API.


## Signature
The method signature for **DELETE URL** is:
{% tabs signature %}
{% tab signature Python %}
```python
delete_url(url:str, headers: dict[str, Any] | None = None) -> JSON
``` 
> `JSON: TypeAlias = dict[str, "JSON"] | list["JSON"] | str | int | float | bool | None`
{% endtab %}

{% tab signature JavaScript %}
```javascript
deleteUrl(url: string, headers: {}): Promise<any>
```
{% endtab %}
{% endtabs %}

{: style="text-align: left" } 
| parameter         | description                                                                 |
| ----------------- | ----------------------------------------------------------------------------|
| `url`             | The URL to send the DELETE request to                                       |
| `headers`         | (optional) add to or override the default headers. [[learn more]](/headers) |
| -> *returns*      | the JSON from the payload of the response to this request                   |


## Examples

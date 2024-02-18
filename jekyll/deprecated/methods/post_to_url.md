---
title: POST to URL
permalink: /deprecated/methods/post_to_url
grand_parent: Deprecated API
parent: Methods
nav_order: 8

layout: page
---

# {{ page.title }}

This seldom used method is available if, for some reason, you need to POST data to a URL outside of the web of links provided by the API.

## Signature
The method signature for **POST to URL** is:
{% tabs signature %}
{% tab signature Python %}
```python
post_to_url(url: str, data: JSON, headers: dict[str, Any] | None = None) -> JSON
``` 
> `JSON: TypeAlias = dict[str, "JSON"] | list["JSON"] | str | int | float | bool | None`
{% endtab %}

{% tab signature JavaScript %}
```javascript
postToUrl(url:string, data: {}, headers = {}): Promise<any>
```
> With JavaScript, the first four paramters are actually members of one parameter of type `RelSpec`, with each being a member of that object.
{% endtab %}
{% endtabs %}

{: style="text-align: left" } 
| parameter         | description                                                                 |
| ----------------- | --------------------------------------------------------------------------- |
| `url`             | The URL to POST to.                                                         |
| `data`            | The payload to POST                                                         |
| `headers`         | (optional) add to or override the default headers. [[learn more]](/headers) |
| -> *returns*      | the JSON from the payload of the response to this request                   |


## Examples

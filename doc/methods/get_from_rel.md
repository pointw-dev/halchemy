---
layout: page
parent: Methods
title: GET from rel
permalink: /methods/get_from_rel.html
nav_order: 2
---

# {{ page.title }}

Sends a GET request to a URL obtained by following a resource's links using the name of the link relation (rel).

The method signature for GET is:
{% tabs signature %}
{% tab signature Python %}
```python
get_from_rel(resource,
             rel='self',
             parameters: dict[str, Any] | None = None,
             template: dict[str, Any] | None = None,
             headers: dict[str, Any] | None = None
             ) -> JSON
``` 
> `JSON: TypeAlias = dict[str, "JSON"] | list["JSON"] | str | int | float | bool | None`
{% endtab %}

{% tab signature JavaScript %}
```javascript
getFromRel({resource, rel, parameters = {}, template = {}}: RelSpec, headers = {}): Promise<HalResource | {}>
```
> With JavaScript, the first four paramters are actually members of one parameter of type `RelSpec`, with each being a member of that object.
{% endtab %}
{% endtabs %}

{: style="text-align: left" } 
| parameter         | description                                                                |
| ----------------- | -------------------------------------------------------------------------- |
| `resource`        | The body of a response from a previous request, in HAL format              |
| `rel`             | The name of the link relation this GET request will follow.  If not supplied, the default is `self` |
| `parameters`      | (optional) name/value pairs which will be used to create a query string    |
| `template`        | (optional) if the link is templated, name/value pairs to fill the template |
| `headers`         | (optional) add to or override the default headers                          |
| -> *returns*      | the JSON from the payload of the response to this GET request              |

Example uses:


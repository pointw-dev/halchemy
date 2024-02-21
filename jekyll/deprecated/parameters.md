---
title: Query String Parameters
permalink: /deprecated/parameters
parent: Deprecated API
nav_order: 4

layout: page
---

# {{ page.title }}
Deprecated
{: .label .label-yellow }

Most of the time a client blindly follows links from one resource to another or to its affordances.  Sometimes, though, the URL needs query string parameters - for example pagination.  If `halchemy` manages the `href` values, how can the client provide query string parameters when needed?

Most of the methods has `parameters` in its signature.  This is a name/value pair object which is used by the method to build the query string.

Let's want to send a `GET` request from the root resource to the link whose relation is `customers` - and you want to add to the `href` the following query string parameters: `...?max_results=50&page=7`

Here is how you do that using `parameters`

{% tabs quick %}
{% tab quick Python %}
```python
customers = api.get_from_rel(root, 'customers', parameters={'max_results':50,'page':7})
```
{% endtab %}

{% tab quick JavaScript %}
```javascript
const customers = await api.getFromRel({
    resource: root,
    rel: 'customers',
    parameters: {
        max_results: 50,
        page: 1
    }
})
```
{% endtab %}
{% endtabs %}

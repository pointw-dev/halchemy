---
title: Templated Links
permalink: /deprecated/templates
parent: Deprecated API
nav_order: 3

layout: page
---

# {{ page.title }}
Deprecated
{: .label .label-yellow }

When a resource's `_links` object contains templated links, you provide the values to fill the template using the `template` parameter of the method.

For example, if you have a collection resource for, say `customers` resource like this:

<pre class="json-table">
{
  "_items": [
    ...
    ...
  ],
  "_links": {
    "self: { 
      "href": "/customers" 
    },
    "item": {
        "href": "/customers/{id}",
        "templated": true
    }
}
</pre>

You can send a `GET` request to the `item` rel of the collection by providing an `id` to fill the template:

{% tabs quick %}
{% tab quick Python %}
```python
customer = api.get_from_rel(customers, 'item', template={'id':'12345'})
```
{% endtab %}

{% tab quick JavaScript %}
```javascript
const customers = await api.getFromRel({
    resource: customers,
    rel: 'item',
    template: {
        id: '1'
    }
})
```
{% endtab %}
{% endtabs %}

> NOTE: when this is a common pattern in hypermea's collection resources.  If you have an ID from a previous session and want to `GET` the collection without its `_items` populated, you can do this:<br/>
> &nbsp;&nbsp;`customers = api.get_from_rel(root, 'customers', parameters={'where':'{'1':-1}'})`<br/>
> In other words, search for all customers whose `1` field is equal to `-1`, returning an empty `_items`
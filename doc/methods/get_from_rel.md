---
layout: page
parent: Methods
title: GET from rel
permalink: /methods/get_from_rel
nav_order: 2
---
<style>pre { font-sze:100px }</style>
# {{ page.title }}

Sends a GET request to a URL obtained by following a resource's links using the name of the link relation (rel).

## Signature
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


## Examples
The following examples are based on an API which serves the following:

<table>
<tr>
<td> <pre>/</pre> </td> <td> <pre>/people</pre> </td> <td> <pre>/people/1</pre> </td>
</tr>
<tr style="vertical-align:top">
<td>
<pre class="json-table">
{
  "_links": {
    "self: { 
      "href": "/" 
    },
    "people": { 
      "href": "/people"
    },
    "orders": { 
      "href": "/orders" 
    }
  }
}
</pre>
</td>

<td>
<pre class="json-table">
{
  "_items": [
    {
      "givenName": "Pat",
      "familyName": "Smith",
      "_links": {
        "self": { 
          "href": "/people/1" 
        },
        "orders: { 
          "href": "/people/1/orders" 
        },
        "edit-form": { 
          "href": "/people/1/edit-form"
        }
      }
    },
    {
      "givenName": "Darcy",
      "familyName": "Jones",
      "_links": {
        "self": { 
          "href": "/people/2" 
        },
        "orders: { 
          "href": "/people/2/orders" 
        },
        "edit-form": { 
          "href": "/people/2/edit-form"
        }
      }
    }    
  ],
  "_links": {
    "self: { 
      "href": "/people" 
    },
    "create-form": { 
      "href": "/people/create-form" 
    }
  }  
}
</pre>
</td>

<td>
<pre class="json-table">
{
  "givenName": "Pat",
  "familyName": "Smith",
  "active": true,
  "_links": {
    "self": { 
      "href": "/people/1" 
    },
    "orders: { 
      "href": "/people/1/orders" 
    },
    "cancel": {
      "href": "/people/1/cancel",
      "title": "PUT to cancel membership"
    },
    "edit-form": { 
      "href": "/people/1/edit-form"
    }
  }
}
</pre>
</td>

</tr>
</table>

For the purposes of the examples (and not recommended practice), this API is configured to show only the name of each person in the `people` collection, requiring the client to do a GET to see whether they are active.

Typical example:
{% tabs example1 %}
{% tab example1 Python %}
```python
from halchemy import Api

api = Api('http://example.org/api')

root = api.get()  # get the root resource
people = api.get_from_rel(root, 'people')

for person in people['_items']:
    full_name = f"{person['givenName']} {person['familyName']}"
    orders = api.get_from_rel(person, 'orders')
    order_count = len(orders['_items'])
    print(f'{full_name} has {order_count} {"order" if order_count == 1 else "orders"}')
```
{% endtab %}

{% tab example1 JavaScript %}
```javascript
const halchemy = require('halchemy')

async function listPeople() {
    const api = new halchemy.Api('http://localhost:2112')

    const root = await api.get()  // get the root resource

    const people = await api.getFromRel({
        resource: root,
        rel: 'people'
    })

    for (const person of people._items) {
        const fullName = `${person.givenName} ${person.familyName}`
        const orders = await api.getFromRel({
            resource: person,
            rel: 'orders'
        })
        const orderCount = orders._items.length

        console.log(`${fullName} has ${orderCount} ${orderCount == 1? 'order' : 'orders'}`)
    }
}
```
{% endtab %}
{% endtabs %}

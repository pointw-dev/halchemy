---
title: POST to rel
permalink: /deprecated/methods/post_to_rel
grand_parent: Deprecated API
parent: Methods
nav_order: 3

layout: page
---
# {{ page.title }}
Deprecated
{: .label .label-yellow }

Follows a resource's link by way of its rel and sends a POST request with data.

## Signature
The method signature for **POST to rel** is:
{% tabs signature %}
{% tab signature Python %}
```python
post_to_rel(resource,
            rel: string,
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
postToRel({resource, rel, parameters = {}, template = {}}: RelSpec, data: {}, headers = {}): Promise<any>
```
> With JavaScript, the first four paramters are actually members of one parameter of type `RelSpec`, with each being a member of that object.
{% endtab %}
{% endtabs %}

{: style="text-align: left" } 
| parameter         | description                                                                                            |
| ----------------- | ------------------------------------------------------------------------------------------------------ |
| `resource`        | The body of a response from a previous request, in HAL format                                          |
| `rel`             | The name of the link relation this POST request will follow.  If not supplied, the default is `self`   |
| `data`            | The payload to POST                                                                                    |
| `parameters`      | (optional) name/value pairs which will be used to create a query string. [[learn more]](/parameters)   |
| `template`        | (optional) if the link is templated, name/value pairs to fill the template. [[learn more]](/templates) |
| `headers`         | (optional) add to or override the default headers. [[learn more]](/headers)                            |
| -> *returns*      | the JSON from the payload of the response to this request                                              |


## Examples
{% tabs example1 %}
{% tab example1 Python %}
```python
from halchemy import Api

api = Api('http://example.org/api')

root = api.get()  # get the root resource

customer = {
    'membershipId': '789',
    'givenName': 'Kelly',
    'familyName': 'Johnson'
}

order = {
    'orderNumber': 'PO3984',
    'partNumber': '0009-043',
    'quantity': 3
}

# create a new customer and post their first order:
customer = api.post_to_rel(root, 'customers', customer)
order = api.post_to_rel(customer, 'orders', order)

```
{% endtab %}

{% tab example1 JavaScript %}
```javascript
const halchemy = require('halchemy')

async function placeNewCustomerOrder(customer, order) {
    const api = new halchemy.Api('http://example.org/api')

    const root = await api.get()  // get the root resource

    const newCustomer = await api.postToRel({
            resource: root,
            rel: 'customers'
        }, customer)

    const newOrder = await api.postToRel({
        resource: newCustomer,
        rel: 'orders'
    }, order)
}


const customer = {
    'membershipId': '789',
    'givenName': 'Kelly',
    'familyName': 'Johnson'
}

const order = {
    'orderNumber': 'PO3984',
    'partNumber': '0009-043',
    'quantity': 3
}

placeNewCustomerOrder(customer, order)
```
{% endtab %}
{% endtabs %}

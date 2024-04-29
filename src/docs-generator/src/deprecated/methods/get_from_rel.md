# GET from rel
Deprecated
{: .label .label-yellow }

Follows a resource's link by way of its rel and sends a GET request.

## Signature
The method signature for **GET from rel** is:
<tabs>
<tab name="Python">

```python
get_from_rel(resource,
             rel: str,
             parameters: dict[str, Any] | None = None,
             template: dict[str, Any] | None = None,
             headers: dict[str, Any] | None = None
             ) -> JSON
```
> `JSON: TypeAlias = dict[str, "JSON"] | list["JSON"] | str | int | float | bool | None`
</tab>

<tab name="JavaScript">

```javascript
getFromRel({resource, rel, parameters = {}, template = {}}: RelSpec, headers = {}): Promise<HalResource | {}>
```
> With JavaScript, the first four parameters are actually members of one parameter of type `RelSpec`, with each being a member of that object.
</tab>

<future-languages />
</tabs>

{: style="text-align: left" }
| parameter         | description                                                                                            |
| ----------------- | ------------------------------------------------------------------------------------------------------ |
| `resource`        | The body of a response from a previous request, in HAL format                                          |
| `rel`             | The name of the link relation this GET request will follow.                                            |
| `parameters`      | (optional) name/value pairs which will be used to create a query string. [[learn more]](/parameters)   |
| `template`        | (optional) if the link is templated, name/value pairs to fill the template. [[learn more]](/templates) |
| `headers`         | (optional) add to or override the default headers. [[learn more]](/headers)                            |
| -> *returns*      | the JSON from the payload of the response to this request                                              |


## Examples

Simple example:
<tabs>
<tab name="Python">

```python
from halchemy import Api

api = Api('http://example.org/api')

root = api.get()  # get the root resource
customers = api.get_from_rel(root, 'customers')

for customer in customers['_items']:
    full_name = f"{customer['givenName']} {customer['familyName']}"
    orders = api.get_from_rel(customer, 'orders')
    order_count = len(orders['_items'])
    print(f'{full_name} has {order_count} {"order" if order_count == 1 else "orders"}')

```
</tab>

<tab name="JavaScript">

```javascript
const {Api} = require('halchemy')

async function listCustomers() {
    const api = new Api('http://example.org/api')

    const root = await api.get()  // get the root resource

    const customers = await api.getFromRel({
        resource: root,
        rel: 'customers'
    })

    for (const customer of customers._items) {
        const fullName = `${customer.givenName} ${customer.familyName}`
        const orders = await api.getFromRel({
            resource: customer,
            rel: 'orders'
        })
        const orderCount = orders._items.length

        console.log(`${fullName} has ${orderCount} ${orderCount == 1? 'order' : 'orders'}`)
    }
}

listCustomers()
```
</tab>

<future-languages />
</tabs>

The example is based on an API which serves the following:

<json-example />

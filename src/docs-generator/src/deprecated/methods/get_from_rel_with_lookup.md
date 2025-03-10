# GET from rel with lookup
::: warning
This API is frozen and deprecated.  Please use the fluent API from 0.9.4 on
:::

Identical to [GET from rel](/deprecated/methods/get_from_rel), but uses an implicit URL template - if the API is so configured.

This method is seldom used, and was only created here to take advantage of hypermea's "additional lookup" field.  It allows a resource in the API to designate one field that can be used to look up an item.  It requires the client know which field is so designated, and thus violates strict adherence to the "no out of band knowledge" constraint.

> NOTE: only GET can use the implicit template of a lookup field.  If you need to send a different request, follow the `self` rel (e.g. `patch_resource(the_resource, 'self')`).

## Signature
The method signature for **GET from rel with lookup** is:
<tabs>
<tab name="Python">

```python
get_from_rel_with_lookup(resource,
             rel: str,
             lookup: str,
             parameters: dict[str, Any] | None = None,
             template: dict[str, Any] | None = None,
             headers: dict[str, Any] | None = None
             ) -> JSON
```
> `JSON: TypeAlias = dict[str, "JSON"] | list["JSON"] | str | int | float | bool | None`
</tab>

<tab name="JavaScript">

```javascript
getFromRelWithLookup({resource, rel, parameters = {}, template = {}}: RelSpec, lookup: string, headers = {}): Promise<HalResource | {}>
```
> With JavaScript, the first four parameters are actually members of one parameter of type `RelSpec`, with each being a member of that object.
</tab>

<future-languages />
</tabs>

| parameter         | description                                                                                            |
| ----------------- | ------------------------------------------------------------------------------------------------------ |
| `resource`        | The body of a response from a previous request, in HAL format                                          |
| `rel`             | The name of the link relation this GET request will follow.  If not supplied, the default is `self`    |
| `parameters`      | (optional) name/value pairs which will be used to create a query string.<br/>[learn more](/deprecated/parameters)   |
| `template`        | (optional) if the link is templated, name/value pairs to fill the template.<br/>[learn more](/deprecated/templates) |
| `lookup`          | The value of the "additional lookup" field to GET                                                      |
| `headers`         | (optional) add to or override the default headers.<br/>[learn more](/deprecated/headers)                            |
| -> *returns*      | the JSON from the payload of the response to this request                                              |


## Examples

Simple example:
<tabs>
<tab name="Python">

```python
from halchemy import Api

api = Api('http://example.org/api')

root = api.get()  # get the root resource
customer = api.get_from_rel_with_lookup(root, 'customers', 'A375')

print(f"{customer['givenName']} {customer['familyName']} is {'active' if customer['active'] else 'inactive'}")

```
</tab>

<tab name="JavaScript">

```javascript
const {Api} = require('halchemy')

async function listMember(customerId) {
    const api = new Api('http://example.org/api')

    const root = await api.get()  // get the root resource

    const customer = await api.getFromRelWithLookup({
            resource: root,
            rel: 'customers'
        },
        customerId
    )

    console.log(`${customer.givenName} ${customer.familyName} is ${customer.active? 'active' : 'inactive'}`)
}

listMember('A375')
```
</tab>

<future-languages />
</tabs>

The example is based on an API which serves the following:

<json-example />

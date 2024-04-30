
# Optimistic Concurrency
Deprecated
{: .label .label-yellow }

When sending requests that are intended to change an existing resource (`PUT`, `PATCH`, `DELETE`) there is a chance someone else has made a change between your `GET` request the request with your intended changes.  Halchemy relies on **optimistic concurrency** to handle this possibility.  That is, it assumes no one else has made a change, but populates the `If-Match` header with the resource's ETag so the server can reject the request if a change to the resource has taken place - that is if the ETag of the resource on the server doesn't match the requested change.

For your client to handle this, you must handle exceptions thrown by the request.  If the status code is 412 that means someone else has snuck in a change.  What the client does is up to you.  For example, you could:
* show the user the updated version, let them merge their change into it then resubmit the request
* cancel the operation, advise the user they should refresh and start over
* GET the updated resource, automatically merge the changes - or even overwrite them with the version you are trying to submit
* etc.

Here is an example that advises the user to refresh and try again.

<tabs>
<tab name="Python">

```python
from halchemy import Api

api = Api('http://example.org/api')
root = api.get()  # get the root resource
customer = api.get_from_rel_with_lookup(root, 'customers', lookup='A375')

try:
    # this patch simulates someone else making a change
    # the customer has a new ETag on the server, which throwaway_customer also has
    throwaway_customer = api.patch_resource(customer, {'givenName': 'Lesley'})

    # customer still has the old ETag, so this request will fail
    api.patch_resource(customer, {'givenName': 'Leslie'})
except RuntimeError as ex:
    if api.last_error['status_code'] == 412:
        print(f'Someone else has changed customer #{customer["customerId"]}. Please refresh to see the changes, then try again if necessary.')
    else:
        raise RuntimeError(f'Could not patch customer #{customer["customerId"]}', ex)
```
</tab>

<tab name="JavaScript">

```javascript
const {Api} = require('halchemy')

async function patchExample() {
    const api = new Api('http://example.org/api')
    const root = await api.get()  // get the root resource

    const customer = await api.getFromRelWithLookup({
        resource: root,
        rel: 'customers'
    }, lookup='A375')

    console.log(customer)
    try {
        // this patch simulates someone else making a change
        // the customer has a new ETag on the server, which throwaway_customer also has
        const throwawayCustomer = await api.patchResource(customer, {'givenName': 'Lesley'})

        // customer still has the old ETag, so this request will fail
        await api.patchResource(customer, {'givenName': 'Leslie'})
    } catch(error) {
        if (api.lastError && api.lastError.statusCode == 412) {
            console.log(api.lastError.statusCode)
            console.log(`Someone else has changed customer #${customer.customerId}. Please refresh to see the changes, then try again if necessary.`)
        } else {
            throw new Error(`Could not patch customer #${customer.customerId}`, error)
        }
    }
}
patchExample()
```
</tab>

<future-languages />
</tabs>

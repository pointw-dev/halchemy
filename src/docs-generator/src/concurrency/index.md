# Optimistic Concurrency
Between the time you `GET` a resource then make a request which would change it (`PUT`, `PATCH`, `DELETE`), the resource might have been changed by someone else.  Without some mechanism in place, this means multiple concurrent users would step on each others toes, overwriting each other's changes without knowing.

A mechanism to protect against this, used by many APIs, is "optimistic concurrency".  This means optimistically assuming no one else has concurrently changed the resource since your `GET` request, - hence the term.  If someone has changed the resource in the meantime, the server rejects the newer change with a `412 Precondition Failed` response.

<tabs>
<tab name="Python">

```python
customer = api.follow(customers).to('item').with_template_values({'membershipId': 'A375'}).get()

customer = api.follow(customer).to('self').patch({'givenName': 'Leslie'})
if customer._halchemy.response.status_code == 412:
    print(f'Someone else has changed customer #{customer["membershipId"]}.')
    print('Please refresh to see the changes, then try again if necessary.')
```
</tab>

<tab name="JavaScript">

```javascript
let customer = await api.follow(customers)
    .to('item')
    .withTemplateValues({'membershipId': 'A375'})
    .get()

customer = await api.follow(customer).to('self').patch({'givenName': 'Leslie'})
if (customer._halchemy.response.status === 412) {
    console.log(`Someone else has changed customer #${customer["membershipId"]}.`)
    console.log('Please refresh to see the changes, then try again if necessary.')
}
```
</tab>

<future-languages />
</tabs>

## How it works
1. You `GET` a resource and receive its current state.
2. The resource will have an ETag which is a unique identifier for the resource's current state.
3. When you make a request to change the resource, you include the header `If-Match` with the ETag value.
4. If the ETag matches, the server will apply the change and return a `200 OK` response.
5. If the resource has been changed by someone else, the server will return a `412 Precondition Failed` response.

What happens in the event of a `412 Precondition Failed` response is up to you.  You could:
- Inform the user that the resource has been changed and ask them to refresh the page.
- Automatically refresh the resource and apply the change again.
- Merge the changes together.
- Reject the change.
- Ask the user to resolve the conflict.
- etc.

## How halchemy helps
Halchemy automates steps 2. and 3.   When you follow a resource to `self` to make a change request (`PUT`, `PATCH`, `DELETE`), halchemy automatically puts the ETag in the request's `If-Match` header.

Usually the Etag comes from the response's `ETag` header, and halchemy looks there first.  Some APIs include the ETag in one of the resource's fields.  If halchemy does not find the `ETag` header, it looks next for a field named `_etag`.  You can change the name of the field halchemy looks for by setting the "etag field" in the `Api` object.

See [Configuration](/configuration) for more information on configuring halchemy.

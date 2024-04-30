# What is halchemy?

Halchemy is a library you use to create client applications - applications that call APIs which use Hypermedia Application Language (HAL).

HAL is an addition to JSON.  It is JSON with links<sup class="footnote-ref"><a href="#fn1" id="fnref1">[1]</a></sup>.  This combines the data your client needs to know about a resource with links to other related resources, or links to operate the resource itself.

Here is an example of a customer resource, represented in HAL:

```json
{
    "customerId": "A375",
    "givenName": "John",
    "familyName": "Doe",
    "active": false,
    "_links": {
        "self": {
            "href": "/customers/662fbf1eb5442453d30e4d7a"
        },
        "orders": {
            "href": "/customers/662fbf1eb5442453d30e4d7a/orders"
        },
        "activate": {
            "href": "/customers/662fbf1eb5442453d30e4d7a/activate",
            "method": "PUT",
            "_note": "PUT (with no body) to active this customer"
        }
    }
}
```

## How halchemy helps

Let's say your client did a GET request and the above JSON is now in a variable named `customer`.

With this customer in hand, you may want to:
* POST an order for this customer
* GET the orders this customer has made
* update the customer's name
* activate the customer
* print the customer's name

In a hypermedia application, each of these operations is done by following a link.  Let's look at how halchemy improves your client code.  These examples only scratch the surface of how halchemy helps.

### POST an order
<tabs>
<tab name="Python">

```python{18-20}
order = {
    'orderNumber': '12345',
    'partNumber': '009343-12',
    'quantity': 3
}  

###############
# Without halchemy (using requests)

# the _links all have relative hrefs, but requests needs an absolute URL
orders_url = urljoin(api_url, customer['_links']['orders']['href'])

# We need to convert the order dict to a JSON string
# and supply the Content-type header
requests.post(update_url, json.dumps(order), 
              headers={'Content-type': 'application/json'})

###############
# With halchemy
api.follow(customer).to('orders').post(order)
```
::: tip NOTE
Sometimes the `requests` library can infer the JSON string from a dict, but it is a good practice to always convert it like this so you are never caught at runtime with a case where `requests` does not infer it correctly.
:::
</tab>
<tab name="JavaScript">

```javascript{14-16}
order = {
    orderNumber: '12345',
    partNumber: '009343-12',
    quantity: 3
} 
////////////////
// Without halchemy (using axios)

// assuming axios.defaults.baseURL has been set to the API root URL
axios.post(customer._links.orders.href, order, { 
    headers: { 'Content-type': 'application/json' } 
})

////////////////
// With halchemy
api.follow(customer).to('orders').post(order)
```
</tab>
<future-languages />
</tabs>


### GET the orders
<tabs>
<tab name="Python">

```python{16-24}
###############
# Without halchemy (using requests)

# the _links all have relative hrefs, but requests needs an absolute URL
orders_url = urljoin(api_url, customer['_links']['orders']['href'])

# requests returns an object that contains HTTP details at the top level
# and the resource data inside
response = requests.get(orders_url)
orders = response.json()
for order in orders['_items']:
    print(order['orderNumber'])
    
print(response.status_code)

###############
# With halchemy
#   halchemy operations return resource data at the top level
#   and HTTP details inside
orders = api.follow(customer).to('orders').get()
for order in orders['_items']:
    print(order['orderNumber'])

print(orders._halchemy.response.status_code)

```
</tab>
<tab name="JavaScript">

```javascript{13-21}
////////////////
// Without halchemy (using axios)

// axios returns an object that contains HTTP details at the top level
// and the resource data inside
response = await axios.get(customer._links.orders.href)
orders = response.data
for (const order of orders._items) {
    console.log(order.orderNumber)
}
console.log(response.status)

////////////////
// With halchemy
//   halchemy operations return resource data at the top level
//   and HTTP details inside
orders = await api.follow(customer).to('orders').get()
for (const order of orders._items) {
    console.log(order.orderNumber)
}
console.log(orders._halchemy.response.status)
```
</tab>
<future-languages />
</tabs>


### Update the given name
<tabs>
<tab name="Python">

```python{20-22}
###############
# Without halchemy (using requests)

# the _links all have relative hrefs, but requests needs an absolute URL
update_url = urljoin(api_url, customer['_links']['self']['href'])  

# This API uses optimistic concurrency control, 
# so we need to supply the If-match header with the Etag from the
# response that we got when we did the GET request for the customer,
# as well as Content-type as before
etag = response.headers['Etag']                               
update_headers = {
    'If-match': etag,
    'Content-type': 'application/json'
}

# We need to convert the update dict to a JSON string
requests.patch(update_url, json.dumps({'givenName': new_name}),
               headers=update_headers)

###############
# With halchemy
api.follow(customer).to('self').patch({'givenName': new_name})
```
</tab>
<tab name="JavaScript">

```javascript{15-17}
////////////////
// Without halchemy (using axios)

// This API uses optimistic concurrency control,
// so we need to supply the If-match header with the Etag from the
// response that we got when we did the GET request for the customer,
// as well as Content-type as before
const etag = response.headers['Etag']
const updateHeaders = {
    'If-match': etag,
    'Content-type': 'application/json'
}
axios.patch(customer._links.self.href, { givenName: newName }, { headers: updateHeaders })

////////////////
// With halchemy
api.follow(customer).to('self').patch({ givenName: newName })
```
</tab>
<future-languages />
</tabs>


### Activate the customer
<tabs>
<tab name="Python">

```python{7-9}
###############
# Without halchemy (using requests)

update_url = urljoin(api_url, customer['_links']['activate']['href'])  
requests.put(update_url, None)

###############
# With halchemy
api.follow(customer).to('activate').put()
```
</tab>
<tab name="JavaScript">

```javascript{5-7}
////////////////
// Without halchemy (using axios)
axios.put(customer._links.activate.href)

////////////////
// With halchemy
api.follow(customer).to('activate').put()
```
::: tip NOTE
The syntax for this operation not greatly improved when using Javascript compared to other languages.  However, even with this simple example there are additional benefits you will see given the fluent approach and given how errors are handled.
:::
</tab>
<future-languages />
</tabs>


### Print the customer's name
<tabs>
<tab name="Python">

```python
###############
# Without halchemy

print(f'Hello {customer["givenName"]}')

###############
# With halchemy - same code
#   halchemy focuses on resource data first
#   and stays out of the way until you need it

print(f'Hello {customer["givenName"]}')

```
</tab>
<tab name="JavaScript">

```javascript
////////////////
// Without halchemy

console.log(`Hello ${customer.givenName}`)

////////////////
// With halchemy - same code
//   halchemy focuses on resource data first
//   and stays out of the way until you need it

console.log(`Hello ${customer.givenName}`)
```
</tab>
<future-languages />
</tabs>

These are only a few examples of how halchemy lets your client application more easily make full use of your HAL-based API.


-----
<a id="fn1" href="#fnref1" class="footnote-backref">[1]</a> HAL adds links to JSON (`application/hal+json`) and to XML (`application/hal+xml`).  Halchmey only works with the JSON flavour of HAL.
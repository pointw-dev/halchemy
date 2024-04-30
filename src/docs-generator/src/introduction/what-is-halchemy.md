# What is halchemy?

Halchemy is a library you use to create client applications - applications that call APIs which use Hypermedia Application Language (HAL).

HAL is an addition to JSON<sup>*</sup>.  It is JSON with links.  This combines the data your client needs to know about a resource with links to other related resources, or links to operate the resource itself.

## For example
Here is an example of a customer resource, represented in HAL:

```json
{
    "customerId": "A375",
    "givenName": "John",
    "familyName": "Doe",
    "active": false,
    "_links": {
        "self": {
            "href": "/customers/123"
        },
        "orders": {
            "href": "/customers/123/orders"
        },
        "activate": {
            "href": "/customers/123/activate",
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

In a hypermedia application, each of these operations is done by following a link.  Let's look at how halchemy improves your client code.

### POST an order

<tabs>
<tab name="Python">

```python{16-24}
################
# Without halchemy (using requests)

# the _links all have relative hrefs, but requests needs an absolute URL
orders_url = urljoin(api_url, customer['_links']['orders']['href'])

order = {
    'orderNumber': '12345',
    'partNumber': "009343-12",
    'quantity': 3
}  

# We need to convert the update dict to a JSON string
requests.post(update_url, json.dumps(order), headers={'Content-type': 'application/json'}

################ 
# With halchemy
order = {
    'orderNumber': '12345',
    'partNumber': "009343-12",
    'quantity': 3
}  

api.follow(customer).to('orders').post(order)
```
</tab>
<tab name="JavaScript">

```javascript
// Without halchemy (using axios)

// With halchemy
```
</tab>
<future-languages />
</tabs>

### GET the orders

<tabs>
<tab name="Python">

```python{17-26}
################
# Without halchemy (using requests)

# the _links all have relative hrefs, but requests needs an absolute URL
orders_url = urljoin(api_url, customer['_links']['orders']['href'])

response = requests.get(orders_url)

# requests returns an object that contains HTTP details at the top level
# and the resource data inside
orders = response.json()
for order in orders['_items']:
    print(order['orderNumber'])
    
print(response.status_code)

################
# With halchemy
orders = api.follow(customer).to('orders').get()

# halchemy operations return resource data at the top level
# and HTTP details inside
for order in orders['_items']:
    print(order['orderNumber'])

print(orders._halchemy.response.status_code)

```
</tab>
<tab name="JavaScript">

```javascript
// Without halchemy (using axios)

// With halchemy
```
</tab>
<future-languages />
</tabs>

### Update the given name

<tabs>
<tab name="Python">

```python{18-20}
################
# Without halchemy (using requests)

# the _links all have relative hrefs, but requests needs an absolute URL
update_url = urljoin(api_url, customer['_links']['self']['href'])  

# This API uses optimistic concurrency control, 
# so we need to supply the If-match header
etag = response.headers['Etag']                               
update_headers = {
    'If-match': etag,
    'Content-type': 'application/json'
}

# We need to convert the update dict to a JSON string
requests.patch(update_url, json.dumps({'givenName': new_name}), headers=update_headers)

################
# With halchemy
api.follow(customer).to('self').patch({'givenName': new_name})
```
</tab>
<tab name="JavaScript">

```javascript
// Without halchemy (using axios)

// With halchemy
```
</tab>
<future-languages />
</tabs>

### Activate the customer

<tabs>
<tab name="Python">

```python{18-20}
################
# Without halchemy (using requests)

# the _links all have relative hrefs, but requests needs an absolute URL
update_url = urljoin(api_url, customer['_links']['activate']['href'])  

# This API uses optimistic concurrency control, 
# so we need to supply the If-match header
etag = response.headers['Etag']                               
update_headers = {
    'If-match': etag,
    'Content-type': 'application/json'
}

# We need to convert the update dict to a JSON string
requests.put(update_url, None, headers=update_headers)

################
# With halchemy
api.follow(customer).to('activate').put()
```
</tab>
<tab name="JavaScript">

```javascript
// Without halchemy (using axios)

// With halchemy
```
</tab>
<future-languages />
</tabs>

### Print the customer's name

<tabs>
<tab name="Python">

```python
################
# Without halchemy

customer_name = f'{customer["givenName"]} {customer["familyName"]}'
print(customer_name)

################
# With halchemy - same code
#  halchemy focuses on resource data first
#  and stays out of the way until you need it

customer_name = f'{customer["givenName"]} {customer["familyName"]}'
print(customer_name)

```
</tab>
<tab name="JavaScript">

```javascript
// Without halchemy

// With halchemy
```
</tab>
<future-languages />
</tabs>

These are only a few ways halchemy lets your client application easily make full use of your HAL-based API.

---
title: Examples
permalink: /basics/examples
parent: The Basics
nav_order: 1

layout: page
---
# {{ page.title }}
These examples are based on an imaginary API.  [Jump here](#sample-api) to see the resources it serves.

## Example 1
Activate all customers who are deactivated.
{% tabs example1 %}
{% tab example1 Python %}
```python
from halchemy import Api

auth_header = {
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjB9.49jV8bS3WGLP20VBpCDane-kjxfGmO8L6LHgE7mLO9I'
}

api = Api('http://example.org/api', headers=auth_header)

root = api.root.get()
customers = api.follow(root).to('customers').get()

for customer in customers.collection('_items'):
    if not customer['active'] and customer.has_rel('activate'):
        print(f'Activating {customer["givenName"]} {customer["familyName"]}')
        api.follow(customer).to('activate').put()
```
{% endtab %}

{% tab example1 JavaScript %}
```javascript
const halchemy = require('halchemy')

async function activateCustomers() {
    const authHeader = {
        authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjB9.49jV8bS3WGLP20VBpCDane-kjxfGmO8L6LHgE7mLO9I'
    }
    const api = new halchemy.Api('http://example.org/api', headers=authHeader)
    const root = await api.root.get()
    const customers = await api.follow(root).to('customers').get()

    for (const customer of customers.collection('_items')) {
        if (!customer.active && customer.hasRel('activate')) {
            console.log(`Activating ${customer.givenName} ${customer.familyName}`)
            await api.follow(customer).to('activate').put()
        }
    }
}
activateCustomers()
```
{% endtab %}
{% endtabs %}

This example demonstrates:
* setting default headers for all requests
  * in this example, an authorization header is set when creating the api object
  * each request will include this header
* getting the root resource
* following a link to a collection resource
  * from root to customers
* iterating over a collection
  * accessing the items in the collection using the `collection()` method ensures that each item is a HAL resource object
  * in other words, if you access the items directly, each item would not have the "has rel" method (for example)
* checking if a resource has a specific link
* using a resource's affordance to change its state (using PUT to activate a customer)
  * contrast this with setting the active property directly
  * by using the affordance, the API can enforce business rules, and it can change how activation occur without changing the client code

## Example 2
Print the orders for a given customer.
{% tabs example2 %}
{% tab example2 Python %}
```python
from halchemy import Api

api = Api('http://example.org/api')

root = api.root.get()
customers = api.follow(root).to('customers').get()

print('Show orders')
print('-----------')

while True:
    membership_id = input('\nEnter the membership ID: ').upper()
    if not membership_id:        
        break

    customer = api.follow(customers).to('item').with_template_values({'membershipId': membership_id}).get()
    status_code = customer._halchemy.response.status_code

    if not status_code == 200:
        if status_code == 404:
            print(f'Customer #{membership_id} was not found')
            continue
        else:
            print(f'Something went wrong: {status_code} {customer._halchemy.response.reason}')
            break

    orders = api.follow(customer).to('orders').get()
    if len(orders['_items']) == 0:
        print(f'Customer #{membership_id} has no orders')
    else:
        for order in orders.collection('_items'):
            print(order['orderNumber'])
```
{% endtab %}

{% tab example2 JavaScript %}
```javascript
const halchemy = require('halchemy')
const readline = require('readline/promises')

async function prompt(message) {
    const rl = readline.createInterface({input: process.stdin, output: process.stdout})
    const answer = await rl.question(message)
    rl.close()
    return answer
}

async function displayOrders() {
    const api = new halchemy.Api('http://example.org/api')
    const root = await api.root.get()
    const customers = await api.follow(root).to('customers').get()

    console.log('Show Orders')
    console.log('-----------')

    while (true) {
        let membershipId = await prompt('\nEnter the membership ID: ')
        if (!membershipId) {
            break
        }
        membershipId = membershipId.toUpperCase()

        const customer = await api.follow(customers).to('item').withTemplateValues({'membershipId': membershipId}).get()
        const statusCode = customer._halchemy.response.statusCode

        if (statusCode !== 200) {
            if (statusCode === 404) {
                console.log(`Customer #${membershipId} was not found`)
                continue
            } else {
                console.log(`Something went wrong: ${statusCode} ${customer._halchemy.response.reason}`)
                break
            }
        }

        const orders = await api.follow(customer).to('orders').get()
        if (orders._items.length == 0) {
            console.log(`Customer #${membershipId} has no orders`)
        } else {
            for (const order of orders.collection('_items')) {
                console.log(order['orderNumber'])
            }
        }
    }
}
displayOrders()
```
{% endtab %}
{% endtabs %}

This example demonstrates:
* following a link to a resource with a templated URL
* using the response status code to navigate the user's workflow
* following a link from one resource to its child resource collection
* mixing direct access to `_items` with managed iteration using the `collection()` method

## Example 3
Pagination using query string parameters.

{% tabs example3 %}
{% tab example3 Python %}
```python
from halchemy import Api

api = Api('http://example.org/api')

root = api.root.get()
page = 1

while True:
    pagination = {
        'max_results': 10,
        'page': page
    }
    customers = api.follow(root).to('customers').with_parameters(pagination).get()
    for customer in customers.collection('_items'):
        print(f'{customer["membershipId"]} - {customer["givenName"]} {customer["familyName"]}')

    prompt = '[N]ext page'
    if page > 1:
        prompt += ', [P]revious page'
    choice = input(prompt + ': ').upper()

    if choice in ['N', 'P']:
        page += 1 if choice == 'N' else -1
    else:
        break
```
{% endtab %}

{% tab example3 JavaScript %}
```javascript
const halchemy = require('halchemy')
const readline = require('readline/promises')

async function prompt(message) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })
    const answer = await rl.question(message)
    rl.close()
    return answer
}

async function displayCustomers() {
    const api = new halchemy.Api('http://example.org/api')
    const root = await api.root.get()
    let page = 1

    while (true) {
        const pagination = {
            max_results: 10,
            page
        }
        const customers = await api.follow(root).to('customers').withParameters(pagination).get()
        for (const customer of customers.collection('_items')) {
            console.log(`${customer.membershipId} - ${customer.givenName} ${customer.familyName}`)
        }

        let prompt_message = '[N]ext page'
        if (page > 1) {
            prompt_message += ', [P]revious page'
        }
        const choice = (await prompt(prompt_message + ': ')).toUpperCase()

        if (choice === 'N' || choice === 'P') {
            page += choice === 'N' ? 1 : -1
        } else {
            break
        }
    }
}
displayCustomers()
```
{% endtab %}
{% endtabs %}

This example demonstrates:
* using query string parameters to do pagination

-----
## Sample API
The examples above are based on an imaginary API that serves the following resources:
{% include json_example.html %}

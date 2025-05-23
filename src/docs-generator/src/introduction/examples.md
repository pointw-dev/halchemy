---
aside: false
---
# Examples
These examples are based on an imaginary API.  [Jump here](#sample-api) to see the resources it serves.

[[toc]]

## Activate customers
Activate all customers who are deactivated.
<tabs>
<tab name="Python">

```python
from halchemy import Api

auth_header = {
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjB9.49jV8bS3WGLP20VBpCDane-kjxfGmO8L6LHgE7mLO9I'
}

api = Api('http://example.org/api', headers=auth_header)

home = api.home.get()
customers = api.follow(home).to('customers').get()

for customer in customers.collection('_items'):
    if not customer['active'] and customer.has_rel('activate'):
        print(f'Activating {customer["givenName"]} {customer["familyName"]}')
        api.follow(customer).to('activate').put()
```
</tab>

<tab name="JavaScript">

```javascript
const {Api} = require('halchemy')

async function activateCustomers() {
    const authHeader = {
        authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjB9.49jV8bS3WGLP20VBpCDane-kjxfGmO8L6LHgE7mLO9I'
    }
    const api = new Api('http://example.org/api', headers=authHeader)
    const home = await api.home.get()
    const customers = await api.follow(home).to('customers').get()

    for (const customer of customers.collection('_items')) {
        if (!customer.active && customer.hasRel('activate')) {
            console.log(`Activating ${customer.givenName} ${customer.familyName}`)
            await api.follow(customer).to('activate').put()
        }
    }
}
activateCustomers()
```
</tab>

<tab name="Ruby">

```ruby
require "halchemy"

auth_header = {
  "Authorization" => "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjB9.49jV8bS3WGLP20VBpCDane-kjxfGmO8L6LHgE7mLO9I"
}

api = Halchemy::Api.new("http://example.org/api", headers: auth_header)

home = api.home.get
customers = api.follow(home).to("customers").get

customers.collection("_items").each do |customer|
  if customer.rel?("activate") && !customer["active"]
    puts "Activating #{customer["givenName"]} #{customer["familyName"]}"
    api.follow(customer).to("activate").put
  end
end
```
</tab>

<future-languages />
</tabs>

This example demonstrates:
* setting default headers for all requests
  * in this example, an authorization header is set when creating the `Api` object
  * each request will include this header
* getting the home resource
* following a link to a collection resource
  * from home to customers
* iterating over a collection
  * accessing the items in the collection using the `collection()` method ensures that each item is a HAL resource object
  * in other words, if you access the items directly, each item would not have the "has rel" method (for example)
* checking if a resource has a specific link
* using a resource's affordance to change its state (using PUT to activate a customer)
  * contrast this with setting the active property directly
  * by using the affordance, the API can enforce business rules, and it can change how activation occur without changing the client code

## Print orders
Print the orders for a given customer.
<tabs>
<tab name="Python">

```python
from halchemy import Api

api = Api('http://example.org/api')

home = api.home.get()
customers = api.follow(home).to('customers').get()

print('Show orders')
print('-----------')

while True:
    customer_id = input('\nEnter the customer ID: ').upper()
    if not customer_id:
        break

    customer = api.follow(customers).to('item').with_template_values({'customerId': customer_id}).get()
    status_code = customer._halchemy.response.status_code

    if not status_code == 200:
        if status_code == 404:
            print(f'Customer #{customer_id} was not found')
            continue
        else:
            print(f'Something went wrong: {status_code} {customer._halchemy.response.reason}')
            break

    orders = api.follow(customer).to('orders').get()
    if len(orders['_items']) == 0:
        print(f'Customer #{customer_id} has no orders')
    else:
        for order in orders.collection('_items'):
            print(order['orderNumber'])
```
</tab>

<tab name="JavaScript">

```javascript
const {Api} = require('halchemy')
const readline = require('readline/promises')

async function prompt(message) {
    const rl = readline.createInterface({input: process.stdin, output: process.stdout})
    const answer = await rl.question(message)
    rl.close()
    return answer
}

async function displayOrders() {
    const api = new Api('http://example.org/api')
    const home = await api.home.get()
    const customers = await api.follow(home).to('customers').get()

    console.log('Show Orders')
    console.log('-----------')

    while (true) {
        let customerId = await prompt('\nEnter the customer ID: ')
        if (!customerId) {
            break
        }
        customerId = customerId.toUpperCase()

        const customer = await api.follow(customers).to('item').withTemplateValues({'customerId': customerId}).get()
        const statusCode = customer._halchemy.response.statusCode

        if (statusCode !== 200) {
            if (statusCode === 404) {
                console.log(`Customer #${customerId} was not found`)
                continue
            } else {
                console.log(`Something went wrong: ${statusCode} ${customer._halchemy.response.reason}`)
                break
            }
        }

        const orders = await api.follow(customer).to('orders').get()
        if (orders._items.length == 0) {
            console.log(`Customer #${customerId} has no orders`)
        } else {
            for (const order of orders.collection('_items')) {
                console.log(order['orderNumber'])
            }
        }
    }
}
displayOrders()
```
</tab>

<tab name="Ruby">

```ruby
require "halchemy"

api = Halchemy::Api.new "http://example.org/api"

home = api.home.get
customers = api.follow(home).to("customers").get

puts "Show orders"
puts "-----------"

loop do
  print "\nEnter the customer ID: "
  customer_id = gets.chomp.upcase
  break if customer_id.empty?

  customer = api.follow(customers)
                .to("item")
                .with_template_values("customerId" => customer_id)
                .get

  status_code = customer._halchemy.response.status_code

  case status_code
  when 200
    orders = api.follow(customer).to("orders").get
    if orders["_items"].empty?
      puts "Customer ##{customer_id} has no orders"
    else
      orders["_items"].each do |order|
        puts order["orderNumber"]
      end
    end
  when 404
    puts "Customer ##{customer_id} was not found"
  else
    puts "Something went wrong: #{status_code} #{customer._halchemy.response.reason}"
    break
  end
end
```
</tab>

<future-languages />
</tabs>

This example demonstrates:
* following a link to a resource with a templated URL
* using the response status code to navigate the user's workflow
* following a link from one resource to its child resource collection
* mixing direct access to `_items` with managed iteration using the `collection()` method

## Pagination
Pagination using query string parameters.

<tabs>
<tab name="Python">

```python
from halchemy import Api

api = Api('http://example.org/api')

home = api.home.get()
page = 1

while True:
    pagination = {
        'max_results': 10,
        'page': page
    }
    customers = api.follow(home).to('customers').with_parameters(pagination).get()
    for customer in customers.collection('_items'):
        print(f'{customer["customerId"]} - {customer["givenName"]} {customer["familyName"]}')

    prompt = '[N]ext page'
    if page > 1:
        prompt += ', [P]revious page'
    choice = input(prompt + ': ').upper()

    if choice in ['N', 'P']:
        page += 1 if choice == 'N' else -1
    else:
        break
```
</tab>

<tab name="JavaScript">

```javascript
const {Api} = require('halchemy')
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
    const api = new Api('http://example.org/api')
    const home = await api.home.get()
    let page = 1

    while (true) {
        const pagination = {
            max_results: 10,
            page
        }
        const customers = await api.follow(home).to('customers').withParameters(pagination).get()
        for (const customer of customers.collection('_items')) {
            console.log(`${customer.customerId} - ${customer.givenName} ${customer.familyName}`)
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
</tab>

<tab name="Ruby">

```ruby
require "halchemy"

api = Halchemy::Api.new("http://example.org/api")

home = api.home.get
page = 1

loop do
  pagination = {
    "max_results" => 10,
    "page" => page
  }
  customers = api.follow(home)
                 .to("customers")
                 .with_parameters(pagination)
                 .get

  customers.collection("_items").each do |customer|
    puts "#{customer['customerId']} - #{customer['givenName']} #{customer['familyName']}"
  end

  prompt = "[N]ext page"
  prompt += ", [P]revious page" if page > 1
  print "#{prompt}: "
  choice = gets.chomp.upcase

  case choice
  when "N"
    page += 1
  when "P"
    page -= 1
  else
    break
  end
end
```
</tab>
<future-languages />
</tabs>

This example demonstrates:
* using query string parameters to do pagination

## Sample API
The examples above are based on an imaginary API that serves the following resources:
<json-example />

<comments-section repo="pointw-dev/halchemy" repoId="R_kgDOJ3PqBg" category="General" categoryId="DIC_kwDOJ3PqBs4CoFSi" />

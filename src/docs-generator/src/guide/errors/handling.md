# Handling Errors
When you make a request to the API there is a possibility the it will not succeed.  There are, generally speaking, two ways in which things could go wrong:
1. The request did not receive a response (network error)
2. The request received a response, but the response was not what you were expecting (status code error)

By default, halchemy will raise an exception in the event of network errors.  When the API responses with a status code, halchemy assumes the request/response was successful and lets you decide how to handle a non 2xx status code.

## Default configuration
You can change this default behaviour:  There are two settings you can change to control how errors are handled.
### Network errors
When there is a network error, your request did not receive a response.  By default, halchemy will raise an exception in this case.  You change by setting `raise on network error` to false.  Now, when there is a network error, halchemy will not raise an exception.  You can check for this by looking at `resource._halchemy.error`

<tabs>
<tab name="Python">

```python
from halchemy import Api

api = Api('http://non-existent-server')
api.error_handling.raise_on_network_error = False

resource = api.root.get()
if resource._halchemy.error:
    print('a network error occurred')
```
</tab>

<tab name="JavaScript">

```javascript
const {Api} = require('halchemy')

const api = new Api('http://non-existent-server')
api.errorHandling.raiseOnNetworkError = false

const resource = api.root.get()
if (resource._halchemy.error) {
    console.log('a network error occurred')
}
```
</tab>

<tab name="Ruby">

```ruby
require "halchemy"

api = Halchemy::Api.new "http://non-existent-server"
api.error_handling.raise_on_network_error = false

resource = api.root.get
if resource._halchemy.error
  puts "a network error occurred"
end
```
</tab>

<future-languages />
</tabs>

### Status Codes
By default, if the API successfully receives the request and successfully delivers a response, that is considered a success - even if the status code of the response is not what your code is expecting.  Most HTTP libraries behave this way, but some (like Axios) will throw an exception if the status code is not 2xx.

You can decide, however, which status codes you want halchemy to consider as errors and thus raise an exception.  You do this by setting the `raise on status codes` to indicate which status codes are errors.

To indicate a set of status codes, use a combination of ranges, individual status codes, and greater-than/less-than symbols.

A common problem this helps you solve is: If you are performing a search and you know there may be no results (i.e. a status code of 404) you may not want to have the request throw an exception - but you do want to for all other codes 400 and above.  Here is how you can tell halchemy this is what you want:

<tabs>
<tab name="Python">

```python
from halchemy import Api

api = Api('http://example.org/api')
api.error_handling.raise_on_status_codes = '400-403, >404'

root = api.root.get()
try:
    resource = api.follow(root).to('search').get()
    if resource._halchemy.response.status_code == 404:
        print('no results found')
    else:
        print('results found', resource)
except Exception as e:
    print('an error occurred', e)
```
</tab>

<tab name="JavaScript">

```javascript
const {Api} = require('halchemy')

const api = new Api('http://example.org/api')
api.errorHandling.raiseOnStatusCodes = '400-403, >404'

const root = api.root.get()

try {
    resource = api.follow(root).to('search').get()
    if (resource._halchemy.response.status_code == 404) {
        console.log('no results found')
    } else {
        console.log('results found', resource)
    }
} catch (e) {
    console.log('an error occurred', e)
}
```
</tab>

<tab name="Ruby">

```ruby
require "halchemy"

api = Halchemy::Api.new "http://example.org/api"
api.error_handling.raise_on_status_codes = "400-403, >404"

root = api.root.get
begin
  resource = api.follow(root).to("search").get
  if resource._halchemy.response.status_code == 404
   puts "no results found"
  else
    puts "results found", resource
  end
rescue Halchemy::HttpError => e
    puts "an error occurred", e.message
end
```
</tab>

<future-languages />
</tabs>

::: tip
The commas separating the parts of your status code set are optional.  You can use them for readability, but they are not required.
:::

## Per call raise for status code
In addition to setting the default status codes halchemy will raise exceptions for, you can also manually raise exceptions for specific status codes on a per-call basis.  After your request, you can call `raise for status codes`, indicating which status codes should cause an exception.

<tabs>
<tab name="Python">

```python
customer = api.follow(customers).to('item').with_template_values({'customerId': 'A375'}).get()
customer._halchemy.raise_for_status_codes('400-403, >404')
# if we make it here, we know the status code is not 400-403 or 405 or above, but might be 404
if customer._halchemy.response.status_code == 404:
    print('no results found')
else:
    print('results found', customer)
```
</tab>

<tab name="JavaScript">

```javascript
const customer = await api.follow(customers)
    .to('item')
    .withTemplateValues({'customerId': 'A375'})
    .get()
customer._halchemy.raiseForStatusCodes('400-403, >404')
// if we make it here, we know the status code is not 400-403 or 405 or above, but might be 404
if (customer._halchemy.response.status === 404) {
    console.log('no results found')
} else {
    console.log('results found', customer)
}
```
</tab>

<tab name="Ruby">

```ruby
customer = api.follow(customers).to("item").with_template_values({"customerId" => "A375"}).get
customer._halchemy.raise_for_status_codes("400-403, >404")

# if we make it here, we know the status code is not 400-403 or 405 or above, but might be 404
if customer._halchemy.response.status_code == 404
  puts "no results found"
else
  puts "results found", customer
end
```
</tab>

<future-languages />
</tabs>

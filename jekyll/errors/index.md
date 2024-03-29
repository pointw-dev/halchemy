---
title: Handling Errors
permalink: /errors/
has_children: false
nav_order: 7

layout: page
---
# {{ page.title }}
![work-in-progress.png](..%2Fassets%2Fimg%2Fwork-in-progress.png)

There are two settings you can change to control how errors are handled.  

## Network errors
When there is a network error, your request did not receive a response.  By default, halchemy will raise an exception in this case.  You change by setting "raise on network failure" to false.  Now, when there is a network error, halchemy will not raise an exception.  You can check for this by looking at `resource._halchemy.error`

{% tabs example1 %}
{% tab example1 Python %}
```python
from halchemy import Api

api = Api('http://non-existent-server')
api.error_handling.raise_on_network_failure = False

resource = api.root.get()
if resource._halchemy.error:
    print('a network error occurred')
```
{% endtab %}

{% tab example1 JavaScript %}
```javascript
const {Api} = require('halchemy')

const api = new Api('http://non-existent-server')
api.errorHandling.raiseOnNetworkFailure = false

const resource = api.root.get()
if (resource._halchemy.error) {
    console.log('a network error occurred')
}
```
{% endtab %}
{% endtabs %}

## Status Codes
By default, if the API successfully receives the request and successfully delivers a response, that is considered a success - even if the status code of the response is not what your code is expecting.  Most HTTP libraries behave this way, but some (like Axios) will throw an exception if the status code is not 2xx.

You can decide, however, which status codes you want halchemy to consider as errors and thus raise an exception.  You do this by setting the "raise on status codes" to indicate which status codes are errors.

To indicate a set of status codes, use a combination of ranges, individual status codes, and greater-than/less-than symbols.

A common problem with those HTTP libraries which throw on non 2xx is if you are performing a search and you know there may be no results (i.e. a status code of 404) you may not want to have the request throw an exception - but you do want to for all other non-2xx codes.  Here is how you can tell halchemy this is what you want:

{% tabs example2 %}
{% tab example2 Python %}
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
{% endtab %}

{% tab example2 JavaScript %}
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
{% endtab %}
{% endtabs %}
> NOTE: the commas separating the parts of your status code set are optional.  You can use them for readability, but they are not required.

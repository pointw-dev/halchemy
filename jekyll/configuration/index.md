---
title: Configuration
permalink: /configuration/
has_children: false
nav_order: 2

layout: page
---
# {{ page.title }}
Halchemy takes a batteries-included approach to configuration.  It starts with sensible defaults, and allows you to configure everything the way you like.  This page outlines the settings you can change, and the various ways you can change them.

## Configuration Settings

<style>
table th:first-of-type {
  width: 26%
}
table th:nth-of-type(2) {
  width: 49%
}
table th:nth-of-type(3) {
  width: 25%
}
</style>

| Setting                                                                                                                                                            | Description                                                                                                                                                                                                                                                                                                                                                                                     | Default                                                           |
|--------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------|
| ![python-16.png](..%2Fassets%2Fimg%2Fpython-16.png) `base_url`<br/>![javascript-16.png](..%2Fassets%2Fimg%2Fjavascript-16.png)  `baseUrl`                          | The base URL to the API you are working with.  This default matches the default URL for a hypermea API running locally                                                                                                                                                                                                                                                                          | `http://localhost:2112`                                           |
| ![python-16.png](..%2Fassets%2Fimg%2Fpython-16.png) `parameters_list_style`<br/>![javascript-16.png](..%2Fassets%2Fimg%2Fjavascript-16.png)  `parametersListStyle` | When creating a query string, this setting determines how lists are serialzied.  The options are: `repeat_key`, `bracket`, `index`, `comma`, `pipe`                                                                                                                                                                                                                                             | `repeat_key`                                                      |
| ![python-16.png](..%2Fassets%2Fimg%2Fpython-16.png) `etag_field`<br/>![javascript-16.png](..%2Fassets%2Fimg%2Fjavascript-16.png)  `etagField`                      | When using optimistic concurrency, you need to set the `If-Match` header with the ETag of the resource you are changing.  Halchemy takes this from the `ETag` header, but if it is missing it will look for this field.  This default matches the field emitted by hypermea.                                                                                                                    | `_etag`                                                           | 
| ![python-16.png](..%2Fassets%2Fimg%2Fpython-16.png) ![javascript-16.png](..%2Fassets%2Fimg%2Fjavascript-16.png) `headers`                                          | A dictionary of headers to include with each request.  This is useful for setting authentication headers, or other headers that are common to all requests.                                                                                                                                                                                                                                     | (see [below](#default-headers) for default headers)               |
| ![python-16.png](..%2Fassets%2Fimg%2Fpython-16.png) `error_handling`<br/>![javascript-16.png](..%2Fassets%2Fimg%2Fjavascript-16.png)  `errorHandling`              | Determines when exceptions are thrown/raised.  There are two properties: <br/>![python-16.png](..%2Fassets%2Fimg%2Fpython-16.png)<br/>`raise_for_network_errors` <br/>`raise_for_status_codes`<br/>------<br/>![javascript-16.png](..%2Fassets%2Fimg%2Fjavascript-16.png)<br/>`raiseForNetworkErrors`<br/> `raiseForStatusCodes` | (see [below](#default-error-handling) for default error handling) |

### Default Headers
These are the headers that by default are sent with every request:

```
Content-type: application/json
Accept: application/hal+json, application/json;q=0.9, */*;q=0.8
Authorization: Basic cm9vdDpwYXNzd29yZA==
```
See the [Request Headers](/headers) page for more details.

### Default Error Handling
There are two settings for "error handling".  Here are their defaults:

{% tabs example1 %}
{% tab example1 Python %}
```python
from halchemy import Api

api = Api('http://example.org/api')
print(api.error_handling.raise_on_network_failure)  # True
print(api.error_handling.raise_on_status_codes)     # None
```
{% endtab %}

{% tab example1 JavaScript %}
```javascript
const {Api} = require('halchemy')

const api = new Api('http://example.org/api')
console.log(api.errorHandling.raiseOnNetworkFailure)  // true
console.log(api.errorHandling.raiseOnStatusCodes)     // null
```
{% endtab %}
{% endtabs %}

See the [Handling Errors](/errors) page for more details.

## Changing Configuration Settings
There are several ways to change the values of the settings listed above:
* Place a file named `.halchemy` in your home directory.
* Place a file named `.halchemy` in your project's root directory.
* When creating an `Api` object, pass the "base URL" and "headers" as arguments.
* After creating an `Api` object, use properties to change the settings.
* When making a request, you can add headers to just that request.

Each of these ways is overriden by the next.  That is, a value in your home directory's `.halchemy` file will be overriden if that value is in the `.halchemy` file in your project's root directory, and so on down the list.

### Configuration File
The `.halchemy` file follows the format of any INI file as follows (each section and each value is optional):

`.halchemy`
```ini
[halchemy]
base_url = http://example.org/api
parameters_list_style = index
etag_field = _etag

[headers]
Cache-control = no-cache

[error_handling]
raise_on_network_failure = False
raise_on_status_codes = 400-403, >404
```

> NOTES: 
> * all section names and settings names are in snake_case, no matter what language you are using.
> * any headers you set this way are merged with the default headers.  To remove a default header you must use "remove headers" (see [Request Headers](/headers) for more details).

### Configuration Properties
Here is how you can change the settings after creating an `Api` object:

{% tabs example3 %}
{% tab example3 Python %}
```python
from halchemy import Api

api = Api()
print(api.base_url)  # http://localhost:2112
api.base_url = 'http://example.org/api'
print(api.base_url)  # http://example.org/api
```
{% endtab %}

{% tab example3 JavaScript %}
```javascript
```
{% endtab %}

{% tab example3 JavaScript %}
```javascript
const {Api} = require('halchemy')

api = new Api()
console.log(api.baseUrl)  // http://localhost:2112
api.baseUrl = 'http://example.org/api'
console.log(api.baseUrl)  // http://example.org/api

```
{% endtab %}
{% endtabs %}

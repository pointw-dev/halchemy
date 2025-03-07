---
aside: false
---
# Configuration Properties
Halchemy takes a batteries-included approach to configuration.  It starts with sensible defaults, and allows you to configure everything the way you like.  This page shows you what you can change, and the [next page](changing) show you how you can change them.

The `Api` object gives you the following configuration properties:

<style>
table th:first-of-type {
  width: 5%;
}
table th:nth-of-type(2) {
  width: 52%;
}
table th:nth-of-type(3) {
  width: 43%;
}
</style>

<tabs>
<tab name="Python">

| Setting                                                                                                                                                            | Description                                                                                                                                                                                                                                                                                                                      | Default                                    |
|-------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------|
| `base_url`              | The base URL to the API you are working with.  This default matches the default URL for a hypermea API running locally                                                                                                   | `http://localhost:2112`                    |
| `parameters_list_style` | When creating a query string, this setting determines how lists are serialized.  The options are:<br/>`repeat_key`, `bracket`, `index`, `comma`, `pipe`<br/>See [Query String Parameters](/parameters/passing) for more details. | `repeat_key`                               |
| `etag_field`            | This is the field used to populate `If-Match` on a change request if ETag header is missing.  This default is tuned for use with a hypermea API.<br/>See [Optimistic Concurrency](/concurrency/using) for more details.        | `_etag`                                    |
| `headers`               | A set of default headers to include with each request.  You can use this API property directly, and there are helper functions too.<br/>See [Request Headers](/headers/request) for more details.                                | ([details below](#default-headers))        |
| `error_handling`        | Determines when exceptions are thrown/raised.  There are two properties: <br/>`raise_for_network_errors`<br/>`raise_for_status_codes` | ([details below](#default-error-handling)) |
</tab>
<tab name="JavaScript">

| Setting                                                                                                                                                            | Description                                                                                                                                                                                                                                                                                                                      | Default                                    |
|-----------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------|
| `baseUrl`             | The base URL to the API you are working with.  This default matches the default URL for a hypermea API running locally                                                                                                   | `http://localhost:2112`                    |
| `parametersListStyle` | When creating a query string, this setting determines how lists are serialized.  The options are:<br/>`repeat_key`, `bracket`, `index`, `comma`, `pipe`<br/>See [Query String Parameters](/parameters/passing) for more details. | `repeat_key`                               |
| `etagField`           | This is the field used to populate `If-Match` on a change request if ETag header is missing.  This default is tuned for use with a hypermea API.<br/>See [Optimistic Concurrency](/concurrency/using) for more details.        | `_etag`                                    |
| `headers`             | A set of default headers to include with each request.  You can use this API property directly, and there are helper functions too.<br/>See [Request Headers](/headers/request) for more details.                                | ([details below](#default-headers))        |
| `errorHandling`       | Determines when exceptions are thrown/raised.  There are two properties: <br/>`raiseForNetworkErrors`<br/>`raiseForStatusCodes` | ([details below](#default-error-handling)) |
</tab>

<tab name="Ruby">

| Setting                                                                                                                                                            | Description                                                                                                                                                                                                                                                                                                                      | Default                                    |
|-------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------|
| `base_url`              | The base URL to the API you are working with.  This default matches the default URL for a hypermea API running locally                                                                                                   | `http://localhost:2112`                    |
| `parameters_list_style` | When creating a query string, this setting determines how lists are serialized.  The options are:<br/>`repeat_key`, `bracket`, `index`, `comma`, `pipe`<br/>See [Query String Parameters](/parameters/passing) for more details. | `repeat_key`                               |
| `etag_field`            | This is the field used to populate `If-Match` on a change request if ETag header is missing.  This default is tuned for use with a hypermea API.<br/>See [Optimistic Concurrency](/concurrency/using) for more details.        | `_etag`                                    |
| `headers`               | A set of default headers to include with each request.  You can use this API property directly, and there are helper functions too.<br/>See [Request Headers](/headers/request) for more details.                                | ([details below](#default-headers))        |
| `error_handling`        | Determines when exceptions are thrown/raised.  There are two properties: <br/>`raise_for_network_errors`<br/>`raise_for_status_codes` | ([details below](#default-error-handling)) |
</tab>

<future-languages />
</tabs>


## Default Headers
These are the headers that by default are sent with every request:

```
Content-type: application/json
Accept: application/hal+json, application/json;q=0.9, */*;q=0.8
Authorization: Basic cm9vdDpwYXNzd29yZA==
```
The default `Authorization:` header is `root:password` base-64 encoded.  This is to provide the default credentials hypermea services use when in under development.

See the [Request Headers](/headers/request) page for more details.

## Default Error Handling
There are two settings for `error handling`.  Here are their defaults:

<tabs>
<tab name="Python">

```python
from halchemy import Api

api = Api('http://example.org/api')
print(api.error_handling.raise_on_network_error)  # True
print(api.error_handling.raise_on_status_codes)     # None
```
</tab>

<tab name="JavaScript">

```javascript
const {Api} = require('halchemy')

const api = new Api('http://example.org/api')
console.log(api.errorHandling.raiseOnNetworkError)  // true
console.log(api.errorHandling.raiseOnStatusCodes)     // null
```
</tab>

<tab name="Ruby">

```ruby
require "halchemy"

api = Halchemy::Api.new "http://example.org/api"
puts api.error_handling.raise_on_network_error  # true
puts api.error_handling.raise_on_status_codes   # nil
```
</tab>
<future-languages />
</tabs>

See the [Handling Errors](/errors/handling) page for more details.

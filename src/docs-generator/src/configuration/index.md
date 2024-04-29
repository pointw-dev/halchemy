# Configuration
Halchemy takes a batteries-included approach to configuration.  It starts with sensible defaults, and allows you to configure everything the way you like.  This page outlines the settings you can change, and the various ways you can change them.

## Settings
The `Api` object gives you the following settings:

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
| `parameters_list_style` | When creating a query string, this setting determines how lists are serialzied.  The options are:<br/>`repeat_key`, `bracket`, `index`, `comma`, `pipe`<br/>See [Query String Parameters](/parameters) for more details. | `repeat_key`                               |
| `etag_field`            | This is the field used to populate `If-Match` on a change request if ETag header is missing.  This default is tuned for use with a hypermea API.<br/>See [Optimistic Concurrency](/concurrency) for more details.        | `_etag`                                    |
| `headers`               | A set of default headers to include with each request.  You can use this API property directly, and there are helper functions too.<br/>See [Request Headers](/headers) for more details.                                | ([details below](#default-headers))        |
| `error_handling`        | Determines when exceptions are thrown/raised.  There are two properties: <br/>`raise_for_network_errors`<br/>`raise_for_status_codes` | ([details below](#default-error-handling)) |
</tab>
<tab name="JavaScript">

| Setting                                                                                                                                                            | Description                                                                                                                                                                                                                                                                                                                      | Default                                    |
|-----------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------|
| `baseUrl`             | The base URL to the API you are working with.  This default matches the default URL for a hypermea API running locally                                                                                                   | `http://localhost:2112`                    |
| `parametersListStyle` | When creating a query string, this setting determines how lists are serialzied.  The options are:<br/>`repeat_key`, `bracket`, `index`, `comma`, `pipe`<br/>See [Query String Parameters](/parameters) for more details. | `repeat_key`                               |
| `etagField`           | This is the field used to populate `If-Match` on a change request if ETag header is missing.  This default is tuned for use with a hypermea API.<br/>See [Optimistic Concurrency](/concurrency) for more details.        | `_etag`                                    |
| `headers`             | A set of default headers to include with each request.  You can use this API property directly, and there are helper functions too.<br/>See [Request Headers](/headers) for more details.                                | ([details below](#default-headers))        |
| `errorHandling`       | Determines when exceptions are thrown/raised.  There are two properties: <br/>`raiseForNetworkErrors`<br/>`raiseForStatusCodes` | ([details below](#default-error-handling)) |
</tab>

<future-languages />
</tabs>


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

<tabs>
<tab name="Python">

```python
from halchemy import Api

api = Api('http://example.org/api')
print(api.error_handling.raise_on_network_failure)  # True
print(api.error_handling.raise_on_status_codes)     # None
```
</tab>

<tab name="JavaScript">

```javascript
const {Api} = require('halchemy')

const api = new Api('http://example.org/api')
console.log(api.errorHandling.raiseOnNetworkFailure)  // true
console.log(api.errorHandling.raiseOnStatusCodes)     // null
```
</tab>

<future-languages />
</tabs>

See the [Handling Errors](/errors) page for more details.

## Changing Settings
There are several ways to change the values of the settings listed above:
1. Place a file named `.halchemy` in your home directory.
1. Place a file named `.halchemy` in your project's root directory.
1. When creating an `Api` object, pass the "base URL" and "headers" as arguments.
1. After creating an `Api` object, use properties to change the settings.
1. When making a request, you can add headers to just that request.

Each of these ways is overriden by the next.  That is, a value in your home directory's `.halchemy` file will be overriden if that value is in the `.halchemy` file in your project's root directory, and so on down the list.

### Configuration File
The `.halchemy` file follows the format of any INI file as follows (each section and each value is optional):

```ini
[halchemy]
base_url = http://example.org/api
parameters_list_style = index
etag_field = _etag

[headers]
Cache-control = no-cache
Accept-Language = en-CA,en;q=0.9,fr-CA;q=0.5,fr;q=0.3

[error_handling]
raise_on_network_failure = False
raise_on_status_codes = 400-403, >404
```

::: info NOTES
* all section names and settings names are in snake_case, no matter what language you are using.
* any headers you set this way are merged with the default headers.  To remove a default header you must use the Api's "remove headers" function (see [Request Headers](/headers) for more details).
:::

### Configuration Properties
Here is how you can change a settings after creating an `Api` object, using the "base url" setting as an example:

<tabs>
<tab name="Python">

```python
from halchemy import Api

api = Api()
print(api.base_url)  # http://localhost:2112
api.base_url = 'http://example.org/api'
print(api.base_url)  # http://example.org/api
```
</tab>

<tab name="JavaScript">

```javascript
const {Api} = require('halchemy')

api = new Api()
console.log(api.baseUrl)  // http://localhost:2112
api.baseUrl = 'http://example.org/api'
console.log(api.baseUrl)  // http://example.org/api

```
</tab>

<future-languages />
</tabs>

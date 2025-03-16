# Changing the Configuration
There are several ways to change the values of the settings listed on the [previous page](properties):
1. Place a file named `.halchemy` in your home directory.
1. Place a file named `.halchemy` in your project's root directory.
1. When creating an `Api` object, pass the "base URL" and "headers" as arguments.
1. After creating an `Api` object, use properties to change the settings.
1. When making a request, you can add headers to just that request.

Each of these ways is overridden by the next.  That is, a value in your home directory's `.halchemy` file will be overridden if that value is in the `.halchemy` file in your project's root directory, and so on down the list.

## Configuration File
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
raise_on_network_error = False
raise_on_status_codes = 400-403, >404
```

::: tip NOTES
* all section names and settings names are in snake_case, no matter what language you are using.
* any headers you set this way are merged with the default headers.  To remove a default header you must use the Api's "remove headers" function (see [Request Headers](/headers/request) for more details).
:::

## Configuration Properties
Here is how you can change a settings after creating an `Api` object, using the `base url` setting as an example:

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

<tab name="Ruby">

```ruby
require "halchemy"

api = Halchemy::Api.new
puts api.base_url                        # http://localhost:2112

api.base_url = "http://example.org/api"
puts api.base_url                        # http://example.org/api
```
</tab>

<future-languages />
</tabs>

<comments-section repo="pointw-dev/halchemy" repoId="R_kgDOJ3PqBg" category="General" categoryId="DIC_kwDOJ3PqBs4CoFSi" />

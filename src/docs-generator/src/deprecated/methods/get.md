
# GET
::: warning
This API is frozen and deprecated.  Please use the fluent API from 0.9.4 on
:::

Sends a GET request to a URL.

This method is typically used once in your client application, to get the root resource.  Once you have the root resource and its links, you access the rest of the API by following those links.

## Signature
The method signature for **GET** is:
<tabs>
<tab name="Python">

```python
get(url: str = '/', headers: dict[str, Any] | None = None) -> JSON
```
> `JSON: TypeAlias = dict[str, "JSON"] | list["JSON"] | str | int | float | bool | None`
</tab>

<tab name="JavaScript">

```javascript
get(url:string = '/', headers = {}): Promise<HalResource | {}>
```
</tab>

<future-languages />
</tabs>

| parameter       | description                                                                 |
| --------------- | ----------------------------------------------------------------------------|
| `url`           | the URL or path to the resource you want to GET, defaults to `'/'`          |
| `headers`       | (optional) add to or override the default headers.<br/>[learn more](/deprecated/headers) |
| -> *returns*    | the JSON from the payload of the response to this request                   |

## Examples
This is the usual way to use `get()` - to GET the root resource from which you will follow links to other resources or affordances.

<tabs>
<tab name="Python">

```python
from halchemy import Api

api = Api('http://example.org/api')

root = api.get()  # get the root resource
```
</tab>

<tab name="JavaScript">

```javascript
import { Api } from 'halchemy'

async function getRootResource() {
    const api = new Api('http://example.org/api')
    const root = await api.get()  // get the root resource
}
```
</tab>

<future-languages />
</tabs>


This next example is non-standard, but shows what to do if you have multiple roots in multiple locations:

<tabs>
<tab name="Python">

```python
from halchemy import Api

api = Api('http://example.org/api')

library_root = api.get('/library')
art_gallery_root = api.get('/gallery')
auto_dealership_root = api.get('https://example.org/dealerships')
```
</tab>

<tab name="JavaScript">

```javascript
const {Api} = require('halchemy')

async function getRootResources() {
    const api = new Api('http://example.org/api')

    const libraryRoot = await api.get('/library')
    const artGalleryRoot = await api.get('/gallery')
    const autoDealershipRoot = await api.get('https://example.org/dealerships')
}
```
</tab>

<future-languages />
</tabs>

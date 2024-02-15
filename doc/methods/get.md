---
layout: page
parent: Methods
title: GET
permalink: /methods/get.html
nav_order: 1
---

# {{ page.title }}

Sends a GET request to a URL.

This method is typically used once in your client application, to get the root resource.  Once you have the root resource and its links, you access the rest of the API by following those links.

The method signature for GET is:
{% tabs signature %}
{% tab signature Python %}
```python
get(url='/': str, headers=None: Dict[str, Any]) -> JSON
```
> `JSON: TypeAlias = dict[str, "JSON"] | list["JSON"] | str | int | float | bool | None`
{% endtab %}

{% tab signature JavaScript %}
```javascript
get(url:string = '/', headers = {}): Promise<HalResource | {}>
```
{% endtab %}
{% endtabs %}

{: style="text-align: left" } 
| parameter       | description                                                              |
| --------------- | ------------------------------------------------------------------------ |
| `url`           | the URL or path to the resource you want to GET, defaults to `'/'`       |
| `headers`       | (optional) add to or override the default headers                        |
| -> *returns*    | the JSON from the payload of the response to this GET request            |

Example uses:

{% tabs example1 %}
{% tab example1 Python %}
```python
from halchemy import Api

api = Api('http://example.org/api')

root = api.get()  # get the root resource
```
{% endtab %}

{% tab example1 JavaScript %}
```javascript
import { Api } from 'halchemy'

const api = new Api('http://example.org/api')

const root = api.get()  // get the root resource
```
{% endtab %}
{% endtabs %}

{% tabs example2 %}
{% tab example2 Python %}
```python
from halchemy import Api

api = Api('http://example.org/api')

library_root = api.get('/library')
art_gallery_root = api.get('/gallery')
auto_dealership_root = api.get('https://example.org/dealerships')
```
{% endtab %}

{% tab example2 JavaScript %}
```javascript
import { Api } from 'halchemy'

const api = new Api('http://example.org/api')

const libraryRoot = api.get('/library')
const artGalleryRoot = api.get('/gallery')
const autoDealershipRoot = api.get('https://example.org/dealerships')
```
{% endtab %}
{% endtabs %}

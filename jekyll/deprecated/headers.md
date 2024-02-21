---
title: Request Headers
permalink: /deprecated/headers
parent: Deprecated API
nav_order: 3

layout: page
---

# {{ page.title }}
Deprecated
{: .label .label-yellow }

There are two ways to supply headers with your http requests:
* default headers
* per request headers (overriding defaults)

## Default Headers
All requests sent by the `Api` object include default headers.  Some are built-in and you can add/override these defaults.

### Built-in
There are two built-in default headers provided by halchemy:

```
Content-type': 'application/json'
Authorization': 'Basic cm9vdDpwYXNzd29yZA==
```

The `Authorization` header's token is the base-64 encoded string `root:password`, i.e. the client will attempt to access the resource using user name `root` and the password `password` using Basic Authentication ([RFC7617](https://datatracker.ietf.org/doc/html/rfc7617)).  If your API does not require authorizaiton, this header will, of course, be ignored.

### Add/override default headers
When you create the Api object, you can supply additional headers, and/or override the built-in ones.

{% tabs quick %}
{% tab quick Python %}
```python
from halchemy import Api

api = Api('http://example.org/api', headers={
    'Cache-Control': 'no-cache',
    'Accept': 'application/json',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
})
```
{% endtab %}

{% tab quick JavaScript %}
```javascript
const halchemy = require('halchemy')

const api = new Api('http://example.org/api', headers={
    'Cache-Control': 'no-cache',
    'Accept': 'application/json',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
})
```
{% endtab %}
{% endtabs %}

## Per Request Headers
Each request method accepts a headers object which, if supplied, will add to or override the default headers for this one call only.

{% tabs quick %}
{% tab quick Python %}
```python
from halchemy import Api

api = Api('http://example.org/api', headers={'Accept': 'application/json'})
root = api.get()
xml_resource = api.get_from_rel(root, 'some-xml', headers={'Accept: application/xml'})

```
{% endtab %}

{% tab quick JavaScript %}
```javascript
const halchemy = require('halchemy')

const api = new Api('http://example.org/api', headers={'Accept': 'application/json'})
const root = api.get()
const xmlResource = await api.getFromRel({resource: root, rel: 'some-xml'}, headers={'Accept': 'application/xml'})

```
{% endtab %}
{% endtabs %}

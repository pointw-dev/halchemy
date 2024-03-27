---
title: Default Headers
permalink: /headers/default
parent: Request Headers
has_children: false
nav_order: 1
layout: page
---
# {{ page.title }}
Each Api object carries a set of default headers.  These are the headers that are sent with every request (unless overridden for any given request).

> Note: the underlying http library used by halchemy has its default headers too.  You can override them, but you cannot directly access or remove them using halchemy.

* [The default headers](#the-default-headers)
* [Setting the default headers](#setting-the-default-headers)
  * [Using a configuration file](#using-a-configuration-file)
  * [Using the `Api` constructor](#using-the-api-constructor)
  * [Using the `Api` object](#using-the-api-object)

## The default headers
Out of the box, the set of default headers is:

```
Content-type: application/json
Accept: application/hal+json, application/json;q=0.9, */*;q=0
Authorization: Basic cm9vdDpwYXNzd29yZA==
```
### `Content-type`
As halchemy is designed to work with APIs that use HAL, the default `Content-type` is `application/json` on the assumption that any data you send to the API will be JSON.

### `Accept`
This configures halchemy to prefer HAL JSON, accept any JSON, and not to accept any other type of data.  You can use change this so halchemy will work with non JSON data, but since it is tuned for HAL / JSON you will not benefit from some of the automation provided by halchemy.  Rest assured, you can fully utilize your API with other types of content.

### `Authorization`
This configures halchemy to use Basic authentication.  The token is the base64 encoding of `root:password`.  This is convenient if you are using an auth-enabled halchemy API in a certain developer configuration.  You will, of course, want to change the `Authorization` header the requirements of the API you are using.  You can ignore this header if your API does not require authorization.

If your API uses OAuth, for example, you would change the default `Authorization` header to something like:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwiaWF0IjoyfQ.nMoAK-oiZTdVT0CcGhgS5yCscaNSf49BYFR3DiGT3tM
```

## Setting the default headers
There are four ways to set or change the default headers:

1. Place a file named `.halchemy` in your home directory, containing headers
1. Place a file named `.halchemy` in your project's root directory, containing headers
1. Pass default headers to the `Api` constructor
1. Use Api object's properties and methods to change the headers

These are listed in order of priority.  That is, the headers in the home directory's `.halchemy` file will be overridden by the headers in the project's root directory's `.halchemy` file, and so on down the list.

### Using a configuration file
The `.halchemy` file goes either in your home directory, or in your project root directory.  If in both, the one in your project root takes precedence and the one in your home directory is ignored.

Set default headers in this file under the `headers` section, in INI format:

```ini
[headers]
Content-type = application/xml
Authorization = eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwiaWF0IjoyfQ.nMoAK-oiZTdVT0CcGhgS5yCscaNSf49BYFR3DiGT3tM
Cache-control = no-cache
```
> Please see [Configuration File](/configuration/#configuration-file) for full details on the `.halchemy` file.

Headers in the `.halchemy` file are merged with the out-of-the-box default headers.  The `.halchemy` file above would result in the following default headers:

```
Content-type: application/xml
Authorization: eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwiaWF0IjoyfQ.nMoAK-oiZTdVT0CcGhgS5yCscaNSf49BYFR3DiGT3tM
Cache-control: no-cache
Accept: application/hal+json, application/json;q=0.9, */*;q=0
```
* The `Content-type` header is changed to `application/xml`
* The `Authorization` header is changed to that JWT token
* The `Cache-control` header is added
* The 'Accept' header remains the same

### Using the `Api` Constructor
The constructor takes two parameters: base url and headers.  Here is an example of setting the default headers using the constructor:

{% tabs example1 %}
{% tab example1 Python %}
```python
api = Api('http://example.org/api', {'Accept':'application/xml'})
```
If you do not want to specify a base URL, you can use Python's named parameters, like this:

```python
api = Api(headers={'Accept':'application/xml'})
```

{% endtab %}

{% tab example1 JavaScript %}
```javascript
const api = new Api('http://example.org/api', {accept: 'application/xml'})
```
If you do not want to specify a base URL, you can pass `undefined` as the first parameter, like this:
```javascript
const api = new Api(undefined, {accept: 'application/xml'})
```
{% endtab %}
{% endtabs %}

> The example above only sets one header.  You can set as many headers as you like in the dictionary/object passed to the constructor.

Like the `.halchemy` file, the headers passed to the constructor are merged with the out-of-the-box default headers.

### Using the `Api` Object
There are three ways to use the `Api` object to manipulate the default headers:
* the `headers` property
* the `add headers` method
* the `remove headers` method

#### The headers property
This property replaces the default headers with the headers you provide.  Here is an example:

{% tabs example1 %}
{% tab example1 Python %}
```python
api = Api()

api.headers = {
  'Cache-control': 'no-cache',
  'Accept-language': 'Accept-Language: en-CA, en;q=0.9, fr-CA;q=0.8, fr;q=0.7',
  'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwiaWF0IjoyfQ.nMoAK-oiZTdVT0CcGhgS5yCscaNSf49BYFR3DiGT3tM'
}
```
{% endtab %}

{% tab example1 JavaScript %}
```javascript
const api = new Api()

api.headers = {
  'Cache-control': 'no-cache',
  'Accept-language': 'Accept-Language: en-CA, en;q=0.9, fr-CA;q=0.8, fr;q=0.7',
  Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwiaWF0IjoyfQ.nMoAK-oiZTdVT0CcGhgS5yCscaNSf49BYFR3DiGT3tM'
}
```
{% endtab %}
{% endtabs %}

This has the following results:
* the `Content-type` and `Accept` headers are removed from the `Api` object's default headers
* the `Cache-control` and `Accept-language` headers are added
* the `Authorization` header's value is replaced with the bearer token

#### The add headers method
This method adds headers to the default headers.  If the header you are adding already exists, it is replaced.  Here is an example:

{% tabs example2 %}
{% tab example2 Python %}
```python
api = Api()
api.add_headers({
    'Cache-control': 'no-cache',
    'Accept-language': 'en-CA, en;q=0.9, fr-CA;q=0.8, fr;q=0.7',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwiaWF0IjoyfQ.nMoAK-oiZTdVT0CcGhgS5yCscaNSf49BYFR3DiGT3tM'
})
```
{% endtab %}

{% tab example2 JavaScript %}
```javascript
const api = new Api()
api.addHeaders({
    'Cache-control': 'no-cache',
    'Accept-language': 'en-CA, en;q=0.9, fr-CA;q=0.8, fr;q=0.7',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwiaWF0IjoyfQ.nMoAK-oiZTdVT0CcGhgS5yCscaNSf49BYFR3DiGT3tM'
})
```
{% endtab %}
{% endtabs %}

Now the default headers are have the two new ones (`Cache-control` and `Accept-language`) and the `Authorization` header's value is replaced with the bearer token.

#### The remove headers method
This method removes headers from the default headers.  If the header you are removing does not exist, it is ignored.  Here is an example:

{% tabs example3 %}
{% tab example3 Python %}
```python
api = Api()
api.remove_headers(['Authorization', 'Accept'])
```
{% endtab %}

{% tab example3 JavaScript %}
```javascript
const api = new Api()
api.removeHeaders(['Authorization', 'Accept'])
```
{% endtab %}
{% endtabs %}

> NOTE: removing the `Accept` header only removes it from the default headers of the `Api` object.  This lets the underlying http library use its default `Accept` header.

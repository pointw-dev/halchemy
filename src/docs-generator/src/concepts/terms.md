# Key Terms
## URL
A URL (universal resource locator) is a URI that identifies how and where on the internet to obtain a representation of a resource.

::: info NOTE
A URN (universal resource name) uniquely identifies a resource, but without specifying its location.  Collectively, both URNs and URLs are called URIs (universal resource identifiers) - that is resources are identified (URI) by name (URN) or location (URL).
:::

## Resource
This is the R in a URL.  A resource is an abstract concept.  For example think of a Person.  What goes through your head?  There is a rich set of properties associated with any given person.  You can imagine birth records, a picture of their face, a video of the person describing herself, a JSON that lists her name and address.  This barely scratches the surface of everything meant by an individual Person.  A resource, conceptually, includes all the features and properties that make up that thing.

## Representation
A representation is a set of bytes that represent a resource.  It takes the abstract resource and serializes some part of it into bytes that provide some of the resource's features or properties.  For example, a JSON representation of a Person resource might look like this:
```json
{
  "name": "Alice Liddel",
  "age": 7,
  "address": "London, England"
}
```
Another representation of the same resource (in XML) might look like this:
```xml
<person>
  <first-name>Alice</first-name>
  <last-name>Liddel</last-name>
  <age>7</age>
  <address>
      <city>London</city>
      <country>England</country>
  </address>
</person>
```
And as an image, it might look like this:

![Alice](/img/alice.jpg)

Each of these very different representations are of the same, singular Person resource.

## Media Type
A media type is a **name** we use to describe the format of a representation.  For example, when we use JSON to represent a resource, we are using the media type whose name is `application/json`.  The XML representation uses a media type of `application/xml`, and the image representation above uses a media type of `image/jpeg`.  When you GET a resource, the response includes a header `Content-Type` which identifies the media type of the body.

## Hypermedia / Hypertext
If a media type contains links to other resources, it is called hypermedia.  The term "hypermedia" grew out of "hypertext" to include all media that contains links.  Even though the HT in HTTP stands for Hypertext, this notion of linking is often overlooked in so-called RESTful applications.  Links are what powers the HATEOAS (Hypermedia As The Engine Of Application State) part of REST.  This is a powerful concept that allows for a great deal of flexibility in how clients interact with a server.  It also decouples the client and server, as the client can navigate the service's resources without needing to know the structure of the service ahead of time - allowing client and server to vary independently.

## HAL
HAL (Hypertext Application Language) adds links to JSON (or XML).  Its media type name is `application/hal+json` (or `application/hal+xml`).  Here is an example of a HAL representation of a Person resource:
```json
{
  "name": "Alice Liddel",
  "age": 7,
  "address": "London, England",
  "_links": {
    "self": {
      "href": "/people/alice"
    },
    "current-location": {
      "href": "/places/wonderland"
    }
  }
}
```

## Request
An HTTP request is a structured stream of bytes sent from a client to a server.  On the wire, a POST request could look like this:
```
POST http://example.org/api/people HTTP/1.1⏎Host: example.org⏎Content-Type: application/json⏎⏎{"name": "Alice Liddel", "age": 7, "address": "London, England"}
```
This stream of bytes is sent one at a time to the server.  We often do not think of a request in this way.  Sometimes we think of a request as a Python object, or a JavaScript object.  But at its core, a request is just a stream of bytes.

The same stream can be visualized by splitting on carriage return (⏎):

```
POST http://example.org/api/people HTTP/1.1
Host: example.org
Content-Type: application/json

{"name": "Alice Liddel", "age": 7, "address": "London, England"}
```
Now the structure of an HTTP request is clearer.  There is a request line, a set of request headers, and (where applicable) the body of the request.  The body is separated from the headers by a blank line.  The request line starts with the method (`POST`), followed by the URL of the resource that is the subject of the request (`http://example.org/api/people`), and the protocol (`HTTP/1.1`).  The headers are key-value pairs (`:` delimited), and the body is the payload of the request, described by the `Content-type` header.

When you GET a resource with halchemy, you can look at the request that was sent by examining the `resource._halchemy.request` object.

## Response
An HTTP response is a structured stream of bytes sent from a server to a client.  On the wire, a response to a GET request could look like this:

```
HTTP/1.1 200 OK⏎Content-Type: application/hal+json⏎Content-Length: 64⏎⏎{⏎  "name": "Alice Liddel",⏎  "age": 7,⏎  "address": "London, England",⏎  "_links": {⏎    "self": {"href": "/people/alice"}⏎  }⏎}
```
This stream of bytes is received by the client one byte at a time.

Splitting on carriage return (⏎)

```
HTTP/1.1 200 OK
Content-Type: application/hal+json
Content-Length: 64

{
  "name": "Alice Liddel",
  "age": 7,
  "address": "London, England",
  "_links": {
    "self": {"href": "/people/alice"}
  }
}
```
Here we see a response begins with a line that contains the protocol (`HTTP/1.1`) the response status code (`200`) and the reason text (`OK`).  This is followed by a series of response headers, and then the body of the response.  The body is separated from the headers by a blank line.  The headers are key-value pairs (`:` delimited), and the body is the payload of the response, described by the `Content-type` header.

When you GET a resource with halchemy, you can look at the response that was received by examining the `resource._halchemy.response` object.

All of these terms are easily confused - especially the ones that begin with "RE".  Try this on for size:

> The body of the response to a request is a representation of a resource.

The object returned to you by a request using halchemy is a blend of the resource representation, and the request and response.  The object is optimized to be used as the resource representation, so is modeled as a Resource object.  It contains the other data (request, response, error details) in a property named `_halchemy` to keep it out of the way while you are working with the data you really care about.  The metadata is there when you need it.


<comments-section repo="pointw-dev/halchemy" repoId="R_kgDOJ3PqBg" category="General" categoryId="DIC_kwDOJ3PqBs4CoFSi" />

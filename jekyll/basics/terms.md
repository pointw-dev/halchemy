---
title: Key Terms
permalink: /basics/terms
parent: The Basics
nav_order: 10

layout: page
---
# {{ page.title }}
## URL
A URL (universal resource locator) is a URI that identifies how and where on the internet to obtain a representation of a resource.
> NOTE: a URN (universal resource name) uniquely identifies a resource, but without specifying its location.  Collectively, both URNs and URLs are called URIs (universal resource identifiers) - that is resources are identified (URI) by name (URN) or location (URL).

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
![Alice](..%2Fassets%2Fimg%2Falice.jpg)

Each of these very different representations are of the same, singular Person resource.

## Media Type
A media type is a name we use to describe the format of a representation.  For example, when we use JSON to represent a resource, we are using the media type `application/json`.  The XML representation uses a media type of `application/xml`, and the image representation above uses a media type of `image/jpeg`.  When you GET a resource, the response includes a header `Content-Type` which identifies the media type of the body.

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

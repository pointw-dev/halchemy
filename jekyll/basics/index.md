---
title: The Basics
permalink: /basics/
has_children: true
nav_order: 1

layout: page
---
# {{ page.title }}
Imagine a resource on the internet whose URL is `https://example.com/people/alice`.  An HTTP GET request to that URL, with an `Accept` header of `application/json`, receives a response like this:
```json
{
  "name": "Alice Liddel",
  "age": 7,
  "address": "London, England"
}
```
A GET request to the same URL with an `Accept` header of `image/jpeg` receives a image representation of the same Person.

When a representation of a resource contains links, we call the media type of that representation "hypermedia".

The type of hypermedia that **halchemy** works with is HAL - an enrichment of JSON to include links to other resources.

**halchemy** is a library that makes it easy to work with HAL representations.

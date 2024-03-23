---
title: Design Principles
permalink: /basics/design
parent: The Basics
nav_order: 11

layout: page
---
# {{ page.title }}
* Standards-based
  * RFC 7230-7235 (HTTP/1.1)
  * RFC 3968 (URI)
  * RFC 6570 (URI Templates)
  * RFC 7159 (JSON)
  * RFC 6861 (edit-form/create-form)
  * RFC 8601 (date-time)
  * https://datatracker.ietf.org/doc/html/draft-kelly-json-hal-08  (HAL)
  * https:/github.com/mamund/hal-forms (HAL-FORMS)
  * https://www.iana.org/assignments/http-link-relations/http-link-relations.xhtml (Link Relations)
* The Api object is responsible for all http requests to the server.
* All requests are made explicitly, e.g. api.root.get(), not api.root with an automatic or hidden GET.
* The object returned by a request is a Resource object, which can be used directly as a data payload.
* Each Resource object carries its request and response context in a deeper structure, out of the way of the data payload.
* Syntax sugar, not abstraction hiding - your client is part of a network application and it should feel like it.
* Batteries included and fully configurable.
* 
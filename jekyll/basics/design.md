---
title: Design Principles
permalink: /basics/design
parent: The Basics
nav_order: 11

layout: page
---
# {{ page.title }}
* The Api object is responsible for all http requests to the server.
* All requests are made explicitly, e.g. api.root.get(), not api.root with an automatic or hidden GET.
* The object returned by a request is a Resource object, which can be used directly as a data payload.
* Each Resource object carries its request and response context in a deeper structure, out of the way of the data payload.
* 
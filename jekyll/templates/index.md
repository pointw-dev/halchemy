---
title: Templated Links
permalink: /templates/
has_children: false
nav_order: 5

layout: page
---
# {{ page.title }}
![work-in-progress.png](..%2Fassets%2Fimg%2Fwork-in-progress.png)

One of the features of HAL is the ability to use templated links.  These are links whose href has one or more placeholders that you can fill in with values.  For example:

```json
{
  "_links": {
    "self": {
      "href": "/orders/123"
    },
    "next": {
      "href": "/orders/123/items{?page}"
    }
  }
}
```

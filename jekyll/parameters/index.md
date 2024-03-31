---
title: Query String Parameters
permalink: /parameters/
has_children: false
nav_order: 4

layout: page
---
# {{ page.title }}
When you need to add a query string to the URL of a request, halchemy makes it easy.  You use the "with parameters" method.  This method takes a dictionary/object of parameters and their values.  Here are some examples:

{% tabs example1 %}
{% tab example1 Python %}
```python
root = api.root.get()

# get the first page of customers, 100 per page
customers = api.follow(root).to('customers').with_parameters({'max_results':100,'page':1}).get()
# adds ?max_results=100&page=1 to the URL
```
{% endtab %}

{% tab example1 JavaScript %}
```javascript
const root = await api.root.get()

// get the first page of customers, 100 per page
let customers = await api.follow(root)
    .to('customers')
    .withParameters({ max_results: 100, page: 1 })
    .get()
// adds ?max_results=100&page=1 to the URL
```
{% endtab %}
{% endtabs %}

## Table of Examples
Here is a list of parameter examples: the dictionary/object you pass to "with parameters" and the query string that is added to the URL.

<style>
table th:first-of-type {
  width: 26%
}
table th:nth-of-type(2) {
  width: 45%
}
table th:nth-of-type(3) {
  width: 29%
}
</style>
| Parameters                                                                                                                                                                                     | Query String                                         | Comment                                                                                                    | 
|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------|------------------------------------------------------------------------------------------------------------|
| `{"name":"John"}`                                                                                                                                                                              | `name=John`                                          |                                                                                                            |
| `{"age": 50}`                                                                                                                                                                                  | `age=50`                                             |                                                                                                            |
| `{"name":"John Doe"}`                                                                                                                                                                          | `name=John+Doe`                                      | HTML forms notation for spaces in simple strings (`+`).                                                    |
| `{`<br/>&nbsp;&nbsp;`"name":"John",`<br/>&nbsp;&nbsp;`"address":"123 Main St",`<br/>&nbsp;&nbsp;`"age":50`<br/>`}`                                                                             | `name=John&address=123+Main+St&age=50`               |                                                                                                            |
| `{"pretty":null}`                                                                                                                                                                              | `pretty`                                             | A name without a value.                                                                                    |
| `{"pretty":true}`                                                                                                                                                                              | `pretty=true`                                        |                                                                                                            |
| `{"list":["a","b","c"]}`                                                                                                                                                                       | `list=a&list=b&list=c`                               | A value that is a list.  See [below](#parameters-list-styles) for how to configure serializing such lists. |
| `{`<br/>&nbsp;&nbsp;`"name":"John",`<br/>&nbsp;&nbsp;`"address": {`<br/>&nbsp;&nbsp;&nbsp;&nbsp;`"street": "10 Main",`<br/>&nbsp;&nbsp;&nbsp;&nbsp;`"city":"York"`<br/>&nbsp;&nbsp;`}`<br/>`}` | `name=John&address.street=10+Main&address.city=York` | Nested objects (i.e. `address` in this case).  Uses dot notation for each field.                           |
| `{"where":'{"id":"1234"}'}`                                                                                                                                                                    | `where=%7B%22id%22%3A%221234%22%7D`                  | Sending an object as a string - i.e. wrap it in quotes.                                                    |
| `{"progress":"87%"}`                                                                                                                                                                           | `progress=87%25`                                     | The reserved percent character is urlencoded to `%25`.                                                     |
| `{"special":"$&+,/:;=?@"}`                                                                                                                                                                     | `special=%24%26%2B%2C%2F%3A%3B%3D%3F%40`             | All special characters are urlencoded.                                                                     |
| `{"emoji":"😀", "chinese":"中文"}`                                                                                                                                                               | `emoji=%F0%9F%98%80&chinese=%E4%B8%AD%E6%96%87`      | You can include Unicode in your parameters values.                                                         |

## Parameters List Styles
If you want to pass a list/array as a query string parameter, there is no universally accepted way to do this.  By default, halchemy will serialize the list as multiple parameters with the same name.  For example, `{"list":["a","b","c"]}` will be serialized as `list=a&list=b&list=c`.  You can change how lists are serialized by setting the `parameters list style`.

{% tabs example2 %}
{% tab example2 Python %}
```python
api.parameters_list_style = 'comma'
```
{% endtab %}

{% tab example2 JavaScript %}
```javascript
api.parameterslistStyle = 'comma'
```
{% endtab %}
{% endtabs %}

Given this parameters object: `{"list":["a","b","c"]}`, each parameters list style serializes it to the query string as follows:

| Style                  | Query String                    |
|------------------------|---------------------------------|
| `repeat_key` (default) | `list=a&list=b&list=c`          |
| `bracket`              | `list[]=a&list[]=b&list[]=c`    |
| `index`                | `list[0]=a&list[1]=b&list[2]=c` |
| `comma`                | `list=a,b,c`                    |
| `pipe`                 | `list=a\|b\|c`                  |

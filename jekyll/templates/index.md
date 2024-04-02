---
title: Templated Links
permalink: /templates/
has_children: false
nav_order: 5

layout: page
---
# {{ page.title }}
One of the features of HAL is the ability to use templated links.  These are links whose href has one or more placeholders that you can fill in with values.  For example, an `orders` collection resource may have the following links:

```json
{
  "_links": {
    "self": {
      "href": "/orders"
    },
    "item": {
      "href": "/orders/{order_number}",
      "templated": true
    }
  }
}
```

With halchemy you supply values for the template placeholders using "with template values":

{% tabs example1 %}
{% tab example1 Python %}
```python
order = api.follow('orders').to('item').with_template_values({'order_number': 'XH123'}).get()
```
{% endtab %}

{% tab example1 JavaScript %}
```javascript
const order = await api.follow('orders')
    .to('item')
    .withTemplateValues({order_number: 'XH123'})
    .get();
```
{% endtab %}
{% endtabs %}

If you do not supply a value for a template placeholder, the placeholder is simply removed.

The syntax for templated links is specified in [RFC 6570](https://datatracker.ietf.org/doc/html/rfc6570) and is very expressive.  Here are some sample templates, and what the URL looks like when filled with these values:

<style>
table.templateTable tr td  {
  font-size: 8pt !important;
}
td.header {
  font-weight: bold;
}
</style>
<table class="templateTable">
<tr>
  <td class="header">Templated URL</td>
  <td class="header">Values</td>
  <td class="header">Resulting URL</td>
</tr>
<tr>
  <td><pre lang="json">/path/{foo}</pre></td>
  <td><pre lang="json">{"foo":"321"}</pre></td>
  <td><pre lang="json">/path/321</pre></td></tr>
<tr>
  <td><pre lang="json">/has/{foo}/multiples/{bar}</pre></td>
  <td><pre lang="json">{
  "foo":"value",
  "bar":"value"
}</pre></td>
  <td><pre lang="json">/has/value/multiples/value</pre></td></tr>
<tr>
  <td><pre lang="json">/orders{?id}</pre></td>
  <td><pre lang="json">{"id":"123"}</pre></td>
  <td><pre lang="json">/orders?id=123</pre></td></tr>
<tr>
  <td><pre lang="json">/search{?query,type}</pre></td>
  <td><pre lang="json">{
  "query":"hal",
  "type":"specification"
}</pre></td>
  <td><pre lang="json">/search?query=hal&type=specification</pre></td></tr>
<tr>
  <td><pre lang="json">/items/{itemId}{?lang,format}</pre></td>
  <td><pre lang="json">{
  "itemId":"42",
  "lang":"en",
  "format":"json"
}</pre></td>
  <td><pre lang="json">/items/42?lang=en&format=json</pre></td></tr>
<tr>
  <td><pre lang="json">/country/{countryCode}/cities{?page,limit}</pre></td>
  <td><pre lang="json">{
  "countryCode":"US",
  "page":"1",
  "limit":"10"
}</pre></td>
  <td><pre lang="json">/country/US/cities?page=1&limit=10</pre></td></tr>
<tr>
  <td><pre lang="json">/profile/{userId}{?fields}</pre></td>
  <td><pre lang="json">{
  "userId":"789",
  "fields":"name,age"
}</pre></td>
  <td><pre lang="json">/profile/789?fields=name%2Cage</pre></td></tr>
<tr>
  <td><pre lang="json">/search{?keys*}</pre></td>
  <td><pre lang="json">{
  "keys": {
    "role": "admin", 
    "status": "active"
  }
}</pre></td>
  <td><pre lang="json">/search?role=admin&status=active</pre></td></tr>
<tr>
  <td><pre lang="json">/find{#section}</pre></td>
  <td><pre lang="json">{"section":"results"}</pre></td>
  <td><pre lang="json">/find#results</pre></td></tr>
<tr>
  <td><pre lang="json">/browse/{.format}</pre></td>
  <td><pre lang="json">{"format":"json"}</pre></td>
  <td><pre lang="json">/browse/.json</pre></td></tr>
<tr>
  <td><pre lang="json">/location/{country}/{city}/{?coords*}</pre></td>
  <td><pre lang="json">{
  "country":"Canada",
  "city":"Toronto",
  "coords": {
    "lat":43.7,
    "long":-79.42
  }
}</pre></td>
  <td><pre lang="json">/location/Canada/Toronto/?lat=43.7&long=-79.42</pre></td></tr>
<tr>
  <td><pre lang="json">/files{/year,month,day,filename}</pre></td>
  <td><pre lang="json">{
  "year":"2023",
  "month":"04",
  "day":"01",
  "filename":"report.pdf"
}</pre></td>
  <td><pre lang="json">/files/2023/04/01/report.pdf</pre></td></tr>
<tr>
  <td><pre lang="json">/tags{?list*}</pre></td>
  <td><pre lang="json">{
  "list":[
    "api",
    "hal",
    "rfc6570"
  ]
}</pre></td>
  <td><pre lang="json">/tags?list=api&list=hal&list=rfc6570</pre></td></tr>
<tr>
  <td><pre lang="json">/users/{userId}/posts{/postId}{?comments}</pre></td>
  <td><pre lang="json">{
  "userId":"100",
  "postId":"200",
  "comments":"all"
}</pre></td>
  <td><pre lang="json">/users/100/posts/200?comments=all</pre></td></tr>
<tr>
  <td><pre lang="json">/path?fixedParam=value{&foo}</pre></td>
  <td><pre lang="json">{"foo":"bar"}</pre></td>
  <td><pre lang="json">/path?fixedParam=value&foo=bar</pre></td>
</tr>
</table>

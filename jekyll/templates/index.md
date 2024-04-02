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
pre.tableSnippet {
  font-size: 8pt;
  margin: 0 !important;
  padding: 0pt;
}
td.header {
  font-weight: bold;
}
</style>
<table>
<tr>
  <td class="header">Templated URL</td>
  <td class="header">Values</td>
  <td class="header">Resulting URL</td>
</tr>
<tr>
  <td><pre class="tableSnippet">/path/{foo}</pre></td>
  <td><pre class="tableSnippet">{"foo":"321"}</pre></td>
  <td><pre class="tableSnippet">/path/321</pre></td></tr>
<tr>
  <td><pre class="tableSnippet">/has/{foo}/multiples/{bar}</pre></td>
  <td><pre class="tableSnippet">{
  "foo":"value",
  "bar":"value"
}</pre></td>
  <td><pre class="tableSnippet">/has/value/multiples/value</pre></td></tr>
<tr>
  <td><pre class="tableSnippet">/orders{?id}</pre></td>
  <td><pre class="tableSnippet">{"id":"123"}</pre></td>
  <td><pre class="tableSnippet">/orders?id=123</pre></td></tr>
<tr>
  <td><pre class="tableSnippet">/search{?query,type}</pre></td>
  <td><pre class="tableSnippet">{
  "query":"hal",
  "type":"specification"
}</pre></td>
  <td><pre class="tableSnippet">/search?query=hal&type=specification</pre></td></tr>
<tr>
  <td><pre class="tableSnippet">/items/{itemId}{?lang,format}</pre></td>
  <td><pre class="tableSnippet">{
  "itemId":"42",
  "lang":"en",
  "format":"json"
}</pre></td>
  <td><pre class="tableSnippet">/items/42?lang=en&format=json</pre></td></tr>
<tr>
  <td><pre class="tableSnippet">/country/{countryCode}/cities{?page,limit}</pre></td>
  <td><pre class="tableSnippet">{
  "countryCode":"US",
  "page":"1",
  "limit":"10"
}</pre></td>
  <td><pre class="tableSnippet">/country/US/cities?page=1&limit=10</pre></td></tr>
<tr>
  <td><pre class="tableSnippet">/profile/{userId}{?fields}</pre></td>
  <td><pre class="tableSnippet">{
  "userId":"789",
  "fields":"name,age"
}</pre></td>
  <td><pre class="tableSnippet">/profile/789?fields=name%2Cage</pre></td></tr>
<tr>
  <td><pre class="tableSnippet">/search{?keys*}</pre></td>
  <td><pre class="tableSnippet">{
  "keys": {
    "role": "admin", 
    "status": "active"
  }
}</pre></td>
  <td><pre class="tableSnippet">/search?role=admin&status=active</pre></td></tr>
<tr>
  <td><pre class="tableSnippet">/find{#section}</pre></td>
  <td><pre class="tableSnippet">{"section":"results"}</pre></td>
  <td><pre class="tableSnippet">/find#results</pre></td></tr>
<tr>
  <td><pre class="tableSnippet">/browse/{.format}</pre></td>
  <td><pre class="tableSnippet">{"format":"json"}</pre></td>
  <td><pre class="tableSnippet">/browse/.json</pre></td></tr>
<tr>
  <td><pre class="tableSnippet">/location/{country}/{city}/{?coords*}</pre></td>
  <td><pre class="tableSnippet">{
  "country":"Canada",
  "city":"Toronto",
  "coords": {
    "lat":43.7,
    "long":-79.42
  }
}</pre></td>
  <td><pre class="tableSnippet">/location/Canada/Toronto/?lat=43.7&long=-79.42</pre></td></tr>
<tr>
  <td><pre class="tableSnippet">/files{/year,month,day,filename}</pre></td>
  <td><pre class="tableSnippet">{
  "year":"2023",
  "month":"04",
  "day":"01",
  "filename":"report.pdf"
}</pre></td>
  <td><pre class="tableSnippet">/files/2023/04/01/report.pdf</pre></td></tr>
<tr>
  <td><pre class="tableSnippet">/tags{?list*}</pre></td>
  <td><pre class="tableSnippet">{
  "list":[
    "api",
    "hal",
    "rfc6570"
  ]
}</pre></td>
  <td><pre class="tableSnippet">/tags?list=api&list=hal&list=rfc6570</pre></td></tr>
<tr>
  <td><pre class="tableSnippet">/users/{userId}/posts{/postId}{?comments}</pre></td>
  <td><pre class="tableSnippet">{
  "userId":"100",
  "postId":"200",
  "comments":"all"
}</pre></td>
  <td><pre class="tableSnippet">/users/100/posts/200?comments=all</pre></td></tr>
<tr>
  <td><pre class="tableSnippet">/path?fixedParam=value{&foo}</pre></td>
  <td><pre class="tableSnippet">{"foo":"bar"}</pre></td>
  <td><pre class="tableSnippet">/path?fixedParam=value&foo=bar</pre></td>
</tr>
</table>

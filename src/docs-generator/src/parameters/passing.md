---
aside: false
---
# Query String Parameters
When you need to add query string parameters to the URL of a request, halchemy makes it easy.  You use the `with parameters` method.  This method takes a dictionary/object of parameters and their values.  Here are some examples:

<tabs>
<tab name="Python">

```python
home = api.home.get()

# get the first page of customers, 100 per page
customers = api.follow(home).to('customers').with_parameters({'max_results':100,'page':1}).get()
# adds ?max_results=100&page=1 to the URL
```
</tab>

<tab name="JavaScript">

```javascript
const home = await api.home.get()

// get the first page of customers, 100 per page
let customers = await api.follow(home)
    .to('customers')
    .withParameters({ max_results: 100, page: 1 })
    .get()
// adds ?max_results=100&page=1 to the URL
```
</tab>

<tab name="Ruby">

```ruby
home = api.home.get

# get the first page of customers, 100 per page
customers = @api.follow(home)
                .to("customers")
                .with_parameters({ "max_results" => 100, "page" => 1 })
                .get
# adds ?max_results=100&page=1 to the URL
```
</tab>

<future-languages />
</tabs>

::: tip NOTE
`with parameters` does not simply append the query string the URL.  That would not work if the URL already had query string parameters.  Instead, halchemy ensures all query string parameters are properly merged.
:::

## Table of Examples
Typically, a query string contains one or more name value pairs, e.g. `?name=John&age=50`.  Halchemy provides a sophisticated way to pass simple or complex parameters in the query string.

Here is a list of parameter examples: the dictionary/object you pass to `with parameters` and the query string that is added to the URL.

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
<tbody>
<tr>
  <td class="header">Parameters</td>
  <td class="header">Query String</td>
  <td class="header">Comments</td>
</tr>

<tr>
  <td><pre class="tableSnippet">{"name":"John"}</pre></td>
  <td><pre class="tableSnippet">name=John</pre></td>
  <td></td>
</tr>
<tr>
  <td><pre class="tableSnippet">{"age": 50}</pre></td>
  <td><pre class="tableSnippet">age=50</pre></td>
  <td></td>
</tr>
<tr>
  <td><pre class="tableSnippet">{"name":"John Doe"}</pre></td>
  <td><pre class="tableSnippet">name=John+Doe</pre></td>
  <td>HTML forms notation for spaces in simple strings (i.e. plus sign for spaces).</td>
</tr>
<tr>
  <td><pre class="tableSnippet">{
  "name":"John",
  "address":"123 Main St",
  "age":50
}</pre></td>
  <td><pre class="tableSnippet">name=John&address=123+Main+St&age=50</pre></td>
  <td></td>
</tr>
<tr>
  <td><pre class="tableSnippet">{"pretty":null}</pre></td>
  <td><pre class="tableSnippet">pretty</pre></td>
  <td>A name without a value.</td>
</tr>
<tr>
  <td><pre class="tableSnippet">{"pretty":true}</pre></td>
  <td><pre class="tableSnippet">pretty=true</pre></td>
  <td></td>
</tr>
<tr>
  <td><pre class="tableSnippet">{"list":["a","b","c"]}</pre></td>
  <td><pre class="tableSnippet">list=a&list=b&list=c</pre></td>
  <td>A value that is a list.  See <a href="/parameters/list-style.html">below</a> for how to configure serializing such lists.</td>
</tr>
<tr>
  <td><pre class="tableSnippet">{
  "name":"John",
  "address": {
    "street":"10 Main",
    "city":"York"
  }
}</pre></td>
  <td><pre class="tableSnippet">name=John&address.street=10+Main
  &address.city=York</pre></td>
  <td>Nested objects (i.e. <b>address</b> in this case).  Uses dot notation for each field.</td>
</tr>
<tr>
  <td><pre class="tableSnippet">{"where":"{\"account\":\"1234\"}"}</pre></td>
  <td><pre class="tableSnippet">where=%7B%22account%22%3A%221234%22%7D</pre></td>
  <td>Sending an object as a string - i.e. wrap it in quotes.</td>
</tr>
<tr>
  <td><pre class="tableSnippet">{"percent":"100%"}</pre></td>
  <td><pre class="tableSnippet">percent=100%25</pre></td>
  <td>The reserved character is urlencoded to <b>%25</b>.</td>
</tr>
<tr>
  <td><pre class="tableSnippet">{"special":"$&+,/:;=?@"}</pre></td>
  <td><pre class="tableSnippet">special=%24%26%2B%2C%2F%3A%3B%3D%3F%40</pre></td>
  <td>All special characters are urlencoded.</td>
</tr>
<tr>
  <td><pre class="tableSnippet">{
  "emoji":"😀",
  "chinese":"中文"
}</pre></td>
  <td><pre class="tableSnippet">emoji=%F0%9F%98%80
  &chinese=%E4%B8%AD%E6%96%87</pre></td>
  <td>You can include Unicode in your parameters values.</td>
</tr>
</tbody>
</table>

<comments-section repo="pointw-dev/halchemy" repoId="R_kgDOJ3PqBg" category="General" categoryId="DIC_kwDOJ3PqBs4CoFSi" />

---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: home
---
<link rel="stylesheet" href="{{ '/assets/css/tab-styles.css' | relative_url }}">
<script src="{{ '/assets/js/tabs.js' | relative_url }}"></script>

# HAL-based Hypermedia API clients for humans.

Do you have an API that serves data following the [HAL specification](https://stateless.group/hal_specification.html)?  The **HALchemy** library makes it easy for your client to make the most of that API.

## Getting started

Install HALchemy using the package manager of your chosen language:

{% tabs install %}
{% tab install Python %}
```bash
pip install halchemy
```
{% endtab %}

{% tab install Javascript %}
```bash
npm install halchemy
```
{% endtab %}
{% endtabs %}


In your code, instantiate an `Api` object with the URL of your API.

{% tabs quick %}
{% tab quick Python %}
```python
from halchemy import Api

api = Api('http://example.org/api')

root = api.get()                           # get the root resource
people = api.get_from_rel(root, 'people')  # follow the people rel to get the list of people
```
{% endtab %}

{% tab quick Javascript %}
```javascript
import { Api } from 'halchemy'

const api = new Api('http://example.org/api')

const root = api.get()                                         // get the root resource
const people = api.getFromRel({resource: root, rel:'people'})  // follow the people rel to get the list of people
```
{% endtab %}
{% endtabs %}

## Methods
The method and signatures of the `Api` object are as follows:

{% tabs install %}
{% tab install Python %}
```python
get(url='/')
get_from_rel(resource, rel='self', parameters={}, template={})
get_from_rel_with_lookup(resource, rel, lookup, parameters={})
post_to_rel(resource, rel, data, parameters={}, template={})
patch_resource(resource, data)
put_to_rel(resource, data, rel='self')
delete_url(url)
delete_resource(resource)
url_from_rel(resource, rel, parameters={}, template={})
post_to_url(url, data)
```
{% endtab %}

{% tab install Javascript %}
```javascript
get(url:string = '/')
getFromRel({resource, rel, parameters = {}, template = {}}: RelSpec): Promise<HalResource | {}>
getFromRelWithLookup({resource, rel, parameters = {}, template = {}}: RelSpec, lookup: string): Promise<HalResource | {}>
postToRel({resource, rel, parameters = {}, template = {}}: RelSpec, data:{}): Promise<any>
patchResource(resource:HalResource, data:{}): Promise<any>
putToRel({resource, rel, parameters = {}, template = {}}: RelSpec, data:{}): Promise<any>
deleteUrl(url:string): Promise<any>
deleteResource(resource:HalResource): Promise<any>
urlFromRel({resource, rel, parameters = {}, template = {}}: RelSpec): string
postToUrl(url:string, data:{}): Promise<any>
```
Additional notes for Javascript.
{% endtab %}
{% endtabs %}

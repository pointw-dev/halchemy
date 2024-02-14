---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: home
---

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

{% tab install JavaScript %}
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

{% tab quick JavaScript %}
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
get(url='/', headers={})
get_from_rel(resource, rel='self', parameters={}, template={}, headers={})
get_from_rel_with_lookup(resource, rel, lookup, parameters={}, headers={})
post_to_url(url, data, headers={})
post_to_rel(resource, rel, data, parameters={}, template={}, headers={})
patch_resource(resource, data, headers={})
put_to_rel(resource, rel, data, headers={})
delete_url(url, headers={})
delete_resource(resource, headers={})
url_from_rel(resource, rel, parameters={}, template={})
```
{% endtab %}

{% tab install JavaScript %}
```javascript
get(url:string = '/')
getFromRel({resource, rel, parameters = {}, template = {}}: RelSpec): Promise<HalResource | {}>
getFromRelWithLookup({resource, rel, parameters = {}, template = {}}: RelSpec, lookup: string): Promise<HalResource | {}>
postToUrl(url:string, data:{}): Promise<any>
postToRel({resource, rel, parameters = {}, template = {}}: RelSpec, data:{}): Promise<any>
patchResource(resource:HalResource, data:{}): Promise<any>
putToRel({resource, rel, parameters = {}, template = {}}: RelSpec, data:{}): Promise<any>
deleteUrl(url:string): Promise<any>
deleteResource(resource:HalResource): Promise<any>
urlFromRel({resource, rel, parameters = {}, template = {}}: RelSpec): string
```
Additional notes for JavaScript.
{% endtab %}
{% endtabs %}

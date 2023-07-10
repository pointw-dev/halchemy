# HALchemy for Python
**HAL-based Hypermedia API clients for humans.**

![](https://github.com/pointw-dev/HALchemy/blob/main/img/halchemy-full-word.png?raw=True)

![](https://github.com/pointw-dev/HALchemy/blob/main/img/python.png?raw=True)


> This project has lofty goals, and is in its very early stages.  Please use with caution and beware of breaking changes until at least v0.7.0



## Getting started

```bash
pip install halchemy
```

In your code, instantiate an `Api` object with the base URL of your API

```python
from halchemy import Api

api = Api('http://example.org/api')

root = api.get()                           # get the root resource
people = api.get_from_rel(root, 'people')  # follow the people rel to get the list of people
```

(more docs coming)

## Methods

* **get**(self, url='/')
* **get_from_rel**(self, resource, rel='self', parameters={}, template={})
* **get_from_rel_with_lookup**(self, resource, rel, lookup, parameters={})
* **post_to_rel**(self, resource, rel, data, parameters={}, template={})
* **patch_resource**(self, resource, data)
* **put_to_rel**(self, resource, data, rel='self')
* **delete_url**(self, url)
* **delete_resource**(self, resource)
* **url_from_rel**(resource, rel, parameters={}, template={})
* **post_to_url**(self, url, data)


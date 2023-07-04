# HALchemy

HAL-based Hypermedia API clients for humans

## Methods
* def **url_from_rel**(resource, rel, parameters={}, template={}):
* def **post_to_url**(self, url, data):
* def **post_to_rel**(self, resource, rel, data, parameters={}, template={}):
* def **patch_resource**(self, resource, data):
* def **put_to_resource**(self, resource, data, rel='self'):
* def **get**(self, url='/'):
* def **get_from_rel**(self, resource, rel='self', parameters={}, template={}):        
* def **get_from_rel_with_lookup**(self, resource, rel, lookup, parameters={}):        
* def **delete_collection**(self, url):
* def **delete_resource**(self, resource):



## Features

* parameters and templates
* additional lookup (implicit templates)
* requests library remembers defaults
  * base url (allowing .get('/path')
  * auth (saving managing headers with each request - defaults to Basic root:password)
* can use python dict for POST/PUT/PATCH data (automatically converts to JSON)

* in post_to_url():
```python
except:
    if response.status_code == 422:
        issue = response.json().get('_issues', {}).get('name', '')
        if 'is not unique' in issue:
            new_data = json.loads(data)
            new_data['name'] += ' ~'
            return self._api.post(url, data=new_data)
    message = f'{response.status_code} {response.reason}'
    details = response.text
            raise RuntimeError(f'POST {url} - {message}\n{details}\n\n{data}')
```

## Roadmap

* chainable requests
* HAL Forms
* as many languages as we can get to

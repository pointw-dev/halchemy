# HALchemy
**HAL-based Hypermedia API clients for humans**

![](https://github.com/pointw-dev/HALchemy/blob/main/img/halchemy-full-word.png?raw=True)

![](https://github.com/pointw-dev/HALchemy/blob/main/img/lang-bar.png?raw=True)

> This project has lofty goals, and is in its very early stages.  Please use with caution and beware of breaking changes until at least v0.7.0



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
* root cache/refresh
* optimistic concurrency


# halchemy for Python
**HAL for humans**

![](https://github.com/pointw-dev/HALchemy/blob/main/img/halchemy-full-word.png?raw=True)

![](https://github.com/pointw-dev/HALchemy/blob/main/img/python.png?raw=True)

Do you have an API that serves data following the HAL specification?  The **halchemy** library makes it easy for your client to make the most of that API.

## Getting Started
Install halchemy using the package manager of your chosen language:

```bash
pip install halchemy
```

In your code, create an `Api` object with the URL of your API.

```python
from halchemy import Api

api = Api('http://example.org/api')

root = api.root.get()                           # get the root resource
people = api.follow(root).to('people').get()    # follow the people rel to get the list of people

# Issue a refund of $5 to everyone
for person in people['_items']:
    account = api.follow(person).to('account').get()
    api.follow(account).to('deposit').post({'amount':5.00})
    print(f"{person['name']} has a new balance of ${account['balance']}")
```

[Read the docs](https://pointw-dev.github.io/halchemy) to learn more!

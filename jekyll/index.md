---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults
# Just The Docs:            https://just-the-docs.com/
layout: home
---

# HAL for humans.
Do you have an API that serves data following the [HAL specification](https://stateless.group/hal_specification.html)?  The **halchemy** library makes it easy for your client to make the most of that API.

## Getting started

Install halchemy using the package manager of your chosen language:

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


In your code, create an `Api` object with the URL of your API.

{% tabs quick %}
{% tab quick Python %}
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
{% endtab %}

{% tab quick JavaScript %}
```javascript
import { Api } from 'halchemy'

const api = new Api('http://example.org/api')

const root = api.root.get()                          // get the root resource
const people = api.follow(root).to('people').get()  // follow the people rel to get the list of people

// Issue a refund of $5 to everyone
for (const person of people._items) {
    const account = async api.follow(person).to('account').get()
    async api.follow(account).to('deposit').post({amount:5.00})
    console.log(`${person.name} has a new balance of ${account.balance}`)
}
```
{% endtab %}
{% endtabs %}


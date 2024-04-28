# Getting Started

Install halchemy using the package manager of your chosen language:

<tabs>
<tab name="Python">

```bash
pip install halchemy
```
</tab>

<tab name="Javascript">

```bash
npm install halchemy
```
</tab>

<future-languages />
</tabs>

In your code, create an `Api` object with the URL of your API.

<tabs>
<tab name="Python">

```python
from halchemy import Api

api = Api('http://example.org/api')

root = api.root.get()                          # get the root resource
people = api.follow(root).to('people').get()   # follow the people rel to get the list of people

# Issue a refund of $5 to everyone
for person in people['_items']:
    account = api.follow(person).to('account').get()
    api.follow(account).to('deposit').post({'amount':5.00})
    print(f"{person['name']} has a new balance of ${account['balance']}")
```
</tab>

<tab name="Javascript">

```javascript
import { Api } from 'halchemy'

const api = new Api('http://example.org/api')

const root = api.root.get()                         // get the root resource
const people = api.follow(root).to('people').get()  // follow the people rel to get the list of people

// Issue a refund of $5 to everyone
for (const person of people._items) {
    const account = async api.follow(person).to('account').get()
    async api.follow(account).to('deposit').post({amount:5.00})
    console.log(`${person.name} has a new balance of ${account.balance}`)
}
```
</tab>

<future-languages />
</tabs>

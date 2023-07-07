# HALchemy for node.js
**HAL-based Hypermedia API clients for humans.**

![](../../../img/halchemy-full-word.png)

![](../../../img/node.png)


> This project has lofty goals, and is in its very early stages.  Please use with caution and beware of breaking changes until at least v0.7.0



## Getting started

```bash
npm install halchemy
```

In your code, instantiate an `Api object with the base URL of yoru API

```typescript
import { Api } from 'halchemy'

const api = new Api('http://example.org/api')

const root = api.get()                                         // get the root resource
const people = api.getFromRel({resource: root, rel:'people'})  // follow the people rel to get the list of people
```

## Methods

* **get**(url:string = '/')
* **getFromRel**({resource, rel, parameters = {}, template = {}}: RelSpec)
* **getFromRelWithLookup**({resource, rel, parameters = {}, template = {}}: RelSpec, lookup: string)
* **postToRel**({resource, rel, parameters = {}, template = {}}: RelSpec, data:{})
* **patchResource**(resource:HalResource, data:{})
* **putToRel**({resource, rel, parameters = {}, template = {}}: RelSpec, data:{})
* **delete_collection**(url:string)
* **delete_resource**(resource:HalResource)
* **urlFromRel**({resource, rel, parameters = {}, template = {}}: RelSpec)
* **post_to_url**(url:string, data:{})


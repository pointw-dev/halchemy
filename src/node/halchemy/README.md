# HALchemy for node.js
**HAL-based Hypermedia API clients for humans.**

![](https://github.com/pointw-dev/HALchemy/blob/main/img/halchemy-full-word.png?raw=True)

![](https://github.com/pointw-dev/HALchemy/blob/main/img/node.png?raw=True)


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
* **deleteUrl**(url:string)
* **deleteResource**(resource:HalResource)
* **urlFromRel**({resource, rel, parameters = {}, template = {}}: RelSpec)
* **postToUrl**(url:string, data:{})


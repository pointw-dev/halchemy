# Per Request Headers
Sometimes you want just this one request to have headers different from the default headers.  Halchemy makes this easy.  You use the `with headers` method.  This method takes a dictionary/object of headers to set for this request.  Here is an example:

<tabs>
<tab name="Python">

```python
from halchemy import Api

api = Api()

headers = {
    'Cache-control': 'no-cache',
    'Accept-language': 'en-CA, en;q=0.9, fr-CA;q=0.8, fr;q=0.7'
}

root = api.root.with_headers(headers).get()
customers = api.follow(root).to('customers').with_headers({'Accept': 'application/xml'}).get()
```
</tab>

<tab name="JavaScript">

```javascript
const {Api} = require('halchemy')

async function useDifferentHeadersPerRequest() {
    const api = new Api()

    const headers = {
        'Cache-control': 'no-cache',
        'Accept-language': 'en-CA, en;q=0.9, fr-CA;q=0.8, fr;q=0.7'
    }

    const root = await api.root.withHeaders(headers).get()
    const customers = await api.follow(root)
        .to('customers')
        .withHeaders({Accept: 'application/xml'})
        .get()
}
useDifferentHeadersPerRequest()
```
</tab>

<tab name="Ruby">

```ruby
require "halchemy"

api = Halchemy::Api.new

headers = {
    "Cache-control" => "no-cache",
    "Accept-language" => "en-CA, en;q=0.9, fr-CA;q=0.8, fr;q=0.7"
}

root = api.root.with_headers(headers).get
customers = api.follow(root).to("customers").with_headers("Accept" => "application/xml").get
```
</tab>

<future-languages />
</tabs>

Headers added to a request this way are merged with the default headers.  That is, all default headers continue to be included in the request, and the headers you specify are also included.  If you add a header to the request that already exists in the default header, the value you specify will be used for this request only.

<comments-section repo="pointw-dev/halchemy" repoId="R_kgDOJ3PqBg" category="General" categoryId="DIC_kwDOJ3PqBs4CoFSi" />

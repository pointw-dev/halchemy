
# Handling Errors
Deprecated
{: .label .label-yellow }

All requests are made over the network, and as the first [fallacy of distributed computing](https://en.wikipedia.org/wiki/Fallacies_of_distributed_computing) tells us the network is not reliable.  More often than network failures are other server-side issues that may prevent your requests from being handled as you expect.  For simplicity, most of the examples in this doc do not include exception handling, but of course your client code should always.

When halchemy encounteres an issue when submitting your request it does two things:
* records the details in a public member called "last error"
* throws an exception

Here is an example of how to handle the exception:

<tabs>
<tab name="Python">

```python
import json
from halchemy import Api

api = Api('http://example.org/api')

try:
    root = api.get()
    customer = api.get_from_rel(root, 'customers')
except RuntimeError as ex:
    print(f'Could not fetch the list of customers: {api.last_error["status_code"]} {api.last_error["reason"]}')
    print(json.dumps(api.last_error["details"], indent=4}))
    # handle accordingly...

```

{: style="text-align: left" }
| `last_error` key | Description |
| ---------------- | ----------- |
| `method`         | The method of the request sent to the server, e.g. `GET`, `POST`, etc.            |
| `url`            | The URL the request was sent to.                                                  |
| `status_code`    | The http status code returned by the server.                                      |
| `reason`         | The reason phrase returned by the server.                                         |
| `details`        | The body of the response, hopefully providing additional details about the error. |
| `response`       | The response object returned by the `requests` library method.                    |
| `error`          | The exception that was caught by halchemy before rethrowing.                      |
</tab>

<tab name="JavaScript">

```javascript
const {Api} = require('halchemy')

async function errorHandlingExample() {
    const api = new Api('http://example.org/api')

    try {
        const root = await api.get()  // get the root resource

        const customer = await api.getFromRel({
            resource: root,
            rel: 'customers'
        })
    } catch(error) {
        console.log(`Could not fetch the list of customers: ${api.last_error.statusCode} ${api.last_error.reason}`)
        console.log(api.lastError.details)
    }
}
errorHandlingExample()
```

{: style="text-align: left" }
| `lastError` member | Description |
| ------------------ | ----------- |
| `method`           | The method of the request sent to the server, e.g. `GET`, `POST`, etc.            |
| `url`              | The URL the request was sent to.                                                  |
| `statusCode`       | The http status code returned by the server.                                      |
| `reason`           | The reason phrase returned by the server.                                         |
| `details`          | The body of the response, hopefully providing additional details about the error. |
| `response`         | The response object returned by the `axios` library method.                    |
| `error`            | The exception that was caught by halchemy before rethrowing.                      |

</tab>

<future-languages />
</tabs>

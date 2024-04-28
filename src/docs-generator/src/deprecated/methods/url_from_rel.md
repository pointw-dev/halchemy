# URL from rel
Deprecated
{: .label .label-yellow }

This method is used internally to resolve a resource's rel, with parameters and templates, into a URL to follow.  It is available as a public method in the unlikely event you need to build URLs in a similar fashion.

## Signature
The method signature for **URL from rel** is:
<tabs>
<tab name="Python">

```python
@staticmethod
url_from_rel(resource, rel, parameters={}, template={}) -> str
```
</tab>

<tab name="JavaScript">

```javascript
urlFromRel({resource, rel, parameters = {}, template = {}}: RelSpec): string
```
> With JavaScript, the first four paramters are actually members of one parameter of type `RelSpec`, with each being a member of that object.
</tab>

<future-languages />
</tabs>

{: style="text-align: left" }
| parameter         | description                                                                                            |
| ----------------- | ------------------------------------------------------------------------------------------------------ |
| `resource`        | The body of a response from a previous request, in HAL format                                          |
| `rel`             | The name of the link relation.                                                                         |
| `parameters`      | (optional) name/value pairs which will be used to create a query string. [[learn more]](/parameters)   |
| `template`        | (optional) if the link is templated, name/value pairs to fill the template. [[learn more]](/templates) |
| -> *returns*      | the URL                                                                                                |


## Examples

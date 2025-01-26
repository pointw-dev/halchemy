---
aside: false
---
# Query String Parameters
## Parameters List Styles
If you want to pass a list/array as a query string parameter, there is no universally accepted way to do this.  By default, halchemy will serialize the list as multiple parameters with the same name.  For example, `{"list":["a","b","c"]}` will be serialized as `list=a&list=b&list=c`.  You can change how lists are serialized by setting the `parameters list style`.

<tabs>
<tab name="Python">

```python
api.parameters_list_style = 'comma'
```
</tab>

<tab name="JavaScript">

```javascript
api.parameterslistStyle = 'comma'
```
</tab>

<tab name="Ruby">

```ruby
api.parameters_list_style = "comma"
```
</tab>

<future-languages />
</tabs>

Given this parameters object: `{"list":["a","b","c"]}`, each parameters list style serializes it to the query string as follows:

| Style                  | Query String                    |
|------------------------|---------------------------------|
| `repeat_key` (default) | `list=a&list=b&list=c`          |
| `bracket`              | `list[]=a&list[]=b&list[]=c`    |
| `index`                | `list[0]=a&list[1]=b&list[2]=c` |
| `comma`                | `list=a,b,c`                    |
| `pipe`                 | `list=a\|b\|c`                  |


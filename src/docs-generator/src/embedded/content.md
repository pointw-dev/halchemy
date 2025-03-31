# Embedded content

:::warning Work in progress
<centered-image src="/img/work-in-progress.png" />
This warning will be removed once this page has passed testing.
:::

Let's take a look at this resource model:

<centered-image src="/img/library_resource_model.svg" rounded>A simple Library resource model</centered-image>

## tl;dr
<tabs>
<tab name="Python">

```python{8,15,20}
from halchemy import Api

api = Api('http://example.org/api')
home = api.home.get()
member_collection = api.follow(home).to('member').get()

# Use default embedded resource collection
for member in member_collection.embedded('member'):
    ...

# Fetch a member AND the books that member has borrowed
member = (api.follow(member_collection)
             .to('item')
             .with_template_values({'id': '67ea8978864962ce925a319e'})
             .with_parameters({'embed': 'book'})
             .get()
         )
         
print(f'{member["name"]} has borrowed the following books:')
for book in member.embedded('book'):
    print(f'- book["title"]')
```
</tab>

<tab name="Javascript">

```javascript{8,16,19}
import { Api } from 'halchemy'

const api = new Api('http://example.org/api')
const home = await api.home.get()

// Use default embedded resource collection
const memberCollection = await api.follow(home).to('member').get()
for (const m of memberCollection.embedded('member')) {
    ...
}

// Fetch a member AND the books that member has borrowed
const member = await api.follow(memberCollection)
                        .to('item')
                        .withTemplateValues({id: '123'})
                        .withParameters({embed: 'book'})
                        .get()
console.log(`${member.name} has borrowed the following books:`)
for (const book in member.embedded('book')) {
    console.log(`- ${book.title}`)
}
```
</tab>

<tab name="Ruby">

```ruby{8,16,19}
require "halchemy"

api = Halchemy::Api.new "http://example.org/api"
home = api.home.get

# Use default embedded resource collection
member_collection = api.follow(home).to('member').get()
member_collection.embedded('member').each do |member|
  ...
end

# Fetch a member AND the books that member has borrowed
member = api.follow(member_collection).
             to('item').
             with_template_values({'id': '67ea8978864962ce925a319e'}).
             with_parameters({'embed': 'book'}).
             get
puts "#{member["name"]} has borrowed the following books:"   
member.embedded("book").each do |book|
    puts "- #{book["title"]}"
end      
```
</tab>
<future-languages />
</tabs>



## Deeper walkthrough
:::warning Work in progress
:::
When we get the home resource...

<tabs>
<tab name="Python">

```python
from halchemy import Api

api = Api('http://example.org/api')
home = api.home.get()
```
</tab>

<tab name="Javascript">

```javascript
import { Api } from 'halchemy'

const api = new Api('http://example.org/api')
const home = api.home.get()
```
</tab>

<tab name="Ruby">

```ruby
require "halchemy"

api = Halchemy::Api.new "http://example.org/api"
home = api.home.get
```
</tab>
<future-languages />
</tabs>

...we get back:

```json
{
    "_links": {
        "self": {
            "href": "/",
            "_note": "Home resource for library system"
        },
        "library": {
            "href": "/libraries{?links_only}",
            "templated": true
        },
        "member": {
            "href": "/members{?links_only}",
            "templated": true
        },
        "book": {
            "href": "/books{?links_only}",
            "templated": true
        }
    }
}
```

Each of these resources is a collection, i.e. there are many libraries, each with many members, holding many books, etc.

When a HAL-oriented API serves a collection resource, the actual list is found in the `_embedded` property.

For example this call...

<tabs>
<tab name="Python">

```python
member_collection = api.follow(home).to('member').get()
print(json.dumps(member_collection, indent=4))
```
</tab>

<tab name="Javascript">

```javascript
const memberCollection = api.follow(home).to('member').get()
console.log(JSON.stringify(memberCollection, null, 4))
```
</tab>

<tab name="Ruby">

```ruby
member_collection = api.follow(home).to('member').get()
puts JSON.pretty_generate member_collection
```
</tab>
<future-languages />
</tabs>

The JSON representation of the `member` collection is as follows:

```json
{
  "_links": {
    "self": { "href": "/members"  },
    "item": {
      "href": "/members/{id}",
      "templated": true
    },
    "search": {
      "href": "/members{?where,sort,max_results,page,embed}",
      "templated": true
    },
    ...
  },
  "_meta": {
    "page": 1,
    "max_results": 1000,
    "total": 6
  },
  "_embedded": {
    "member": [
      {
        "_id": "67ea066d1dd141f4499b9528",
        "name": "John Doe",
        "_links": {
          "self": { "href": "/members/67ea066d1dd141f4499b9528" },
          "book": { "href": "/members/67ea066d1dd141f4499b9528/books" },
          ...
        }
      },
      {
        "_id": "67ea06741dd141f4499b9529",
        "name": "Sally Jane",
        "_links": {
          "self": { "href": "/members/67ea06741dd141f4499b9529" },
          "book": { "href": "/members/67ea06741dd141f4499b9529/books" },
          ...
        }
      },
      ...
      ...
    ]
  }
}

```


---
title: Deprecated API
permalink: /deprecated/
has_children: true
nav_order: 100

layout: page
---
# {{ page.title }}
Deprecated
{: .label .label-yellow }

The early versions of halchemy used a more traditional API.  However, as more flexibility and options were added, that API started to become unwieldy.  The preferred API now is the fluent approach.

The last version of halchemy that has the deprecated methods is *0.9.3*.  If you must use the deprecated API, you can install that version with:

{% tabs example1 %}
{% tab example1 Python %}
```python
pip install halchemy==0.9.3
```
{% endtab %}

{% tab example1 JavaScript %}
```javascript
npm install halchemy@0.9.3
```
{% endtab %}
{% endtabs %}


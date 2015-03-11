---
layout: ebomb
redirect_from:
  = /
---

{% capture category %}{{ page.title | downcase | replace:' ','-'}}{% endcapture %}

<ul>
{% for post in site.categories[category] %}
  <li><a href='{{post.url}}'>{{post.title}}</a></li>
{% endfor %}
</ul>

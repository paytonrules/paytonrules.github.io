---
layout: blog
title: Software Development
---

{% capture category %}{{ page.title | downcase | replace:' ','-'}}{% endcapture %}
{% for post in site.categories[category] %}
<article>
  <h1 class="title"><a href='{{post.url}}'>{{post.title}}</a></h1>
  {{post.content}}
</article>
{% endfor %}

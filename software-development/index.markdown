---
layout: default
title: Software Development
---

{% capture category %}{{ page.title | downcase | replace:' ','-'}}{% endcapture %}
{% for post in site.categories[category] %}
<article>
  <h1 class="title">{{post.title}}</h1>
  <p class="date">{{ post.date | date: "%B %d, %Y" }}</p>
  {{post.content}}
</article>
{% endfor %}

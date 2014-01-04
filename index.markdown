---
layout: default
title: Paytonrules Rants
---

{% for post in site.categories['software-development'] %}
<article>
  <h1 class="title"><a href='{{post.url}}'>{{post.title}}</a></h1>
  <p class="date">{{ post.date | date: "%B %d, %Y" }}</p>
  {{post.content}}
</article>
{% endfor %}

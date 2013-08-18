---
layout: language-stars
title: Software Development
---

{% for post in site.categories['language-stars'] %}
<article>
  <h1 class="title">{{post.title}}</h1>
  <p class="date">{{ post.date | date: "%B %d, %Y" }}</p>
  {{post.content}}
</article>
{% endfor %}

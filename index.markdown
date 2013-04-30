---
layout: default
title: Paytonrules Rants
---

{% for post in site.posts %}
  <article>
    <h1 class="title">{{post.title}}</h1>
    <p class="date">{{ post.date | date: "%B %d, %Y" }}</p>
    {{post.content}}
  </article>
{% endfor %}

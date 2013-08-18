---
layout: language-stars
title: Instant Immersion with Leilani
---

{% assign post = site.categories['language-stars'][0] %}
<article>
  <h1 class="title">{{post.title}}</h1>
  <p class="date">{{ post.date | date: "%B %d, %Y" }}</p>
  {{post.content}}
</article>

<p>Past Articles</p>
{% for post in site.categories['language-stars'] offset:1 %}
<p><a href={{post.url}}>{{post.title}}</a></p>
{% endfor %}


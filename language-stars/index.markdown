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

<p><a href="language-stars/archive.html">Archive</a></p>


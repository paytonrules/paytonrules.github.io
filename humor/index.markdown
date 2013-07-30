---
layout: default
title: Humor
---

<p class='warning'>
This section of my site is off-topic, profane, and for entertainment purposes only. It does not represent my professional life or that of my employer. There is a reason its posts do not appear on the front page. You have been warned.
</p>


{% capture category %}{{ page.title | downcase | replace:' ','-'}}{% endcapture %}
{% for post in site.categories[category] %}
<article>
  <h1 class="title">{{post.title}}</h1>
  <p class="date">{{ post.date | date: "%B %d, %Y" }}</p>
  {{post.content}}
</article>
{% endfor %}

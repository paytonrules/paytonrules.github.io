---
layout: default
title: Paytonrules Rants
---

{% include latest.html %}

<h2>Greatest Hits</h2>

<ul>
  {% for post in site.categories['software-development'] offset:1 %}
  <li class="post-link">
    <a href='{{post.url}}'>{{post.title}}</a>
  </li>
  {% endfor %}
</ul>



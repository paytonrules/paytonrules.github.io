---
layout: default
title: Paytonrules Rants
---

{% for post in site.posts limit:5 %}
  <h3>{{post.title}}</h3>
  <p>{{post.content}}</p>
{% endfor %}

{% for post in site.posts offset:5 %}
  <li><span>{{ post.date | date_to_string }}</span> &raquo; <a href="{{ post.url }}">{{ post.title }}</a></li> 
{% endfor %}

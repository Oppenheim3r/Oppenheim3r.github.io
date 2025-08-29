---
layout: page
title: Research
permalink: /research/
---

# Research

{% for post in site.pages %}
  {% if post.category == "research" %}
  - [{{ post.title }}]({{ post.url | relative_url }}) - {{ post.date | date: "%B %d, %Y" }}
  {% endif %}
{% endfor %}


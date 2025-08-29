---
layout: page
title: Offensive Security
permalink: /blogs/offensive/
---

# Offensive Security Posts

{% for post in site.pages %}
  {% if post.category == "offensive" %}
  - [{{ post.title }}]({{ post.url | relative_url }}) - {{ post.date | date: "%B %d, %Y" }}
  {% endif %}
{% endfor %}

*No offensive security posts yet. Coming soon!*


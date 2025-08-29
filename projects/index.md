---
layout: page
title: Projects
permalink: /projects/
---

# Projects

{% for post in site.pages %}
  {% if post.category == "projects" %}
  - [{{ post.title }}]({{ post.url | relative_url }}) - {{ post.date | date: "%B %d, %Y" }}
  {% endif %}
{% endfor %}


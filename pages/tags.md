---
title: Browse Posts by Tag
permalink: /tags/
background_color: '#FEBFE7'
color: black
index: true
---
# {{ page.title | widont }}

{% for tag in site.tags %}
	{% assign tag_title = tag[0] %}
	{% assign tag_slug = tag_title | slugify %}
	{% assign tag_items = tag[1] %}
	
  <h3>Tag: <a href="{{ '/tags/' | append: tag_slug }}">{{ tag_title }}</a></h3>
  {%- include grid.html items=tag_items -%}
{% endfor %}

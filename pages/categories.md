---
title: Browse Posts by Category
permalink: /categories/
background_color: '#FF5500'
color: white
index: true
---
# {{ page.title | widont }}

{% for cat in site.categories %}
	{% assign cat_title = cat[0] %}
	{% assign cat_slug = cat_title | slugify %}
	{% assign cat_items = cat[1] %}
	
  <h3>Category: <a href="{{ '/categories/' | append: cat_slug }}">{{ cat_title }}</a></h3>
  {%- include grid.html items=cat_items -%}
{% endfor %}

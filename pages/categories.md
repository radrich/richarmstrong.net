---
title: Browse by Category
permalink: /categories/
background_color: '#FF5500'
color: white
sitemap: true
index: true
---

{% assign default_categories = "" %}
{% for cat in site.categories %}
  {% assign default_categories = default_categories | append: cat[0] | append: "," %}
{% endfor %}
{% assign default_categories = default_categories | split: "," | sort %}

{% assign items_categories = site.items | map: "categories" | join: "," | split: "," | uniq %}
{% assign all_categories = default_categories | concat: items_categories | uniq | sort %}

<!-- Display list of combined categories -->
<ul class="_random random masonry">
	{% for category_title in all_categories %}
		{% assign category_slug = category_title | slugify %}
		<li class="item"><a class="word" href="#{{ category_slug }}">{{ category_title }}</a></li>
	{% endfor %}
</ul>


<!-- Iterate over all unique categories -->
{% for category_title in all_categories %}
  {% assign category_slug = category_title | slugify %}
  
  <!-- Collect items from default categories -->
  {% assign default_category_items = "" %}
  {% for category in site.categories %}
    {% if category[0] == category_title %}
      {% assign default_category_items = category[1] %}
    {% endif %}
  {% endfor %}
  
  <!-- Collect items from custom items categories -->
  {% assign items_category_items = site.items | where: "categories", category_title %}
  
  <!-- Combine both collections if default_category_items is not empty -->
  {% if default_category_items.size > 0 %}
    {% assign category_items = items_category_items | concat: default_category_items %}
  {% else %}
    {% assign category_items = items_category_items %}
  {% endif %}
  
  <h3 class="center" id="{{ category_slug }}"><a href="{{ '/categories/' | append: category_slug }}">{{ category_title }}</a></h3>
  {%- include grid.html items=category_items list=true -%}
{% endfor %}

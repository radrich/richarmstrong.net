---
title: Browse by Tag
permalink: /tags/
background_color: '#FEBFE7'
color: black
index: true
sitemap: true
---

{% assign default_tags = "" %}
{% for tag in site.tags %}
  {% assign default_tags = default_tags | append: tag[0] | append: "," %}
{% endfor %}
{% assign default_tags = default_tags | split: "," | sort %}

{% assign learn_tags = site.learn | map: "tags" | join: "," | split: "," | uniq %}
{% assign all_tags = default_tags | concat: learn_tags | uniq | sort %}


<!-- Display list of combined tags -->
<ul class="_random random masonry">
	{% for tag_title in all_tags %}
		{% assign tag_slug = tag_title | slugify %}
		<li class="item"><a class="word" href="#{{ tag_slug }}">{{ tag_title }}</a></li>
	{% endfor %}
</ul>


<!-- Iterate over all unique tags -->
{% for tag_title in all_tags %}
  {% assign tag_slug = tag_title | slugify %}
  
  <!-- Collect items from default tags -->
  {% assign default_tag_items = "" %}
  {% for tag in site.tags %}
    {% if tag[0] == tag_title %}
      {% assign default_tag_items = tag[1] %}
    {% endif %}
  {% endfor %}
  
  <!-- Collect items from custom learn tags -->
  {% assign learn_tag_items = site.learn | where: "tags", tag_title %}
  
  <!-- Collect items from custom art tags -->
  {% assign art_tag_items = site.art | where: "tags", tag_title %}
  
  <!-- Combine both collections if default_tag_items is not empty -->
  {% if default_tag_items.size > 0 %}
    {% assign tag_items = learn_tag_items | concat: default_tag_items | concat: art_tag_items %}
  {% else %}
    {% assign tag_items = learn_tag_items | concat: art_tag_items %}
  {% endif %}
  
  <h3 class="center" id="{{ tag_slug }}"><a href="{{ '/tags/' | append: tag_slug }}">{{ tag_title }}</a></h3>
  {%- include grid.html items=tag_items list=true -%}
{% endfor %}

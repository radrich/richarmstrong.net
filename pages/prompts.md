---
title: Creative Prompts
subtitle: "Dunno what to create? Start here."
permalink: /prompts/
background_color: 'white'
image: 'img/prompts-thumb.jpg'
background_color: '#5426e8'
index: true
layout: single-center
sitemap: true
---

Here’s a range of creative exercises to get your creativity in shape.

{% assign prompts = site.prompts | where: "index", "true" %}
{%- include grid.html items=prompts -%}

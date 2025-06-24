---
title: "Creative Prompts"
subtitle: "Dunno what to create? Start here"
permalink: /prompts/
background_color: 'white'
image: 'img/prompts-thumb.jpg'
background_color: '#5426e8'
index: true
layout: single-center
sitemap: true
---

{% assign prompts = site.prompts | where: "index", "true" %}
{%- include grid.html items=prompts -%}

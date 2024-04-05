---
title: Creative Prompts
subtitle: "Dunno what to create? Start here."
permalink: /prompts/
background_color: 'white'
image: 'img/prompts-thumb.jpg'
background_color: '#5426e8'
index: true
---
# {{ page.title }}
## {{ page.subtitle }}

Give your brain a creative workout! Here’s a range of prompts, workouts, and creative exercises to get your creativity in shape.

{% assign prompts = site.prompts | where: "index", "true" %}
{%- include grid.html items=prompts list=true -%}

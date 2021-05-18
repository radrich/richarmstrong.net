---
title: Creative Workouts
subtitle: Get Your Creativity In Shape!
permalink: /workouts/
background_color: '#1165EB'
image: 'img/explosion1.png'
background_color: '#ff5500'
index: true
---
<h1>Creative Workouts</h1>

A bunch more coming soon. Sign up for updates!

{% assign workouts = site.workouts | where: "index", "true" %}
{%- include grid.html items=workouts list=true -%}

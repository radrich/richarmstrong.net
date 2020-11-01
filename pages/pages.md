---
title: Pages
subtitle: View all pages
permalink: /pages/
background_color: '#1165EB'
color: white
index: true
---
<h1>Pages</h1>

{% assign pages = site.pages | where: "layout", "page" | where: "index", "true" %}
{%- include grid.html items=pages list=true -%}

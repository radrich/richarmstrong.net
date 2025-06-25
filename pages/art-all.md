---
title: "All The Art"
subtitle: Neatly organised by project
description: 
permalink: /art-all/
image: 'img/doodleverse/78-drops-of-reflection.jpg'
background_color: 'black'
color: white
index: true
layout: single-center
---

{%- assign items = site.art | sort: 'date' | reverse -%}
{%- include grid.html items=items -%}
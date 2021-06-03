---
title: Creative Workouts
subtitle: Get Your Creativity In Shape!
permalink: /workouts/
background_color: '#1165EB'
image: 'img/creative-workouts-thumb.jpg'
background_color: '#ff5500'
index: true
---
<h1>Creative Workouts</h1>

**Drumroll! TapTapKaboom is now serving free creative workouts!** It’s all a work-in-progress, with new workouts and new features (like an on-screen timer) in the works. But it’s functional! So come test it out. Kick the tires. Tell us what’s working and what’s not. I’d love to get YOUR feedback and input.

[Sign up](https://ttkb.me/blast) for updates.

{% assign workouts = site.workouts | where: "index", "true" %}
{%- include grid.html items=workouts list=true -%}

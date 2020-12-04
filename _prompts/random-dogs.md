---
title: "Draw a Dog"
subtitle: "Start by Drawing a Dog"
desc: "Draw one of these random dgos."
image: "img/abstract-art-site-thumbnail.jpg"
background_color: "#ffdfd8"
---
# {{ page.title | widont }}

{%- include random.html sets="dogs" amount="3" type="inline" prepend="Draw one of these random dogs: " append=". Easy right?" -%}

{%- include random.html sets="colors" amount="10" type="inline" -%}

{%- include random.html sets="colors, colors, dogs" amount="2" type="inline" -%}

{%- include random.html sets="test" amount="3" type="inline" -%}

{%- include random.html sets="test, test" template="${} ontop of a ${}" amount="3" type="inline" -%}

{%- include random.html template="{{ test }} ontop of a {{ test }}" amount="3" type="inline" -%}
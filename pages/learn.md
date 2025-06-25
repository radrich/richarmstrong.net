---
title: "Learn with Rich"
subtitle: Get unstuck. Create. Level-up
description: Upskill Yourself in Creativity, Productivity, Animation, Coding & Illustration.
permalink: /learn/
image: 'img/rich/rich-timer.jpg'
background_color: '#1371fd'
color: white
index: true
layout: default
---

{% assign latest_items = site.learn | sort: "date" | reverse | slice: 0, 6 %}
{% assign popular_items = site.learn | sort: "popular" | reverse | slice: 0, 6 %}
{% assign free_items = site.learn | sort: "free" | reverse | slice: 0, 6 %}
{% assign latest_posts = site.posts | sort: "date" | reverse | slice: 0, 6 %}

<div class="content">
	
	<div class="center">
		<h1>Get unstuck. <span class="marker">Start creating</span></h1>
		<h2>Level-up with fun + practical courses, books&nbsp;&amp;&nbsp;tools</h2>
	</div>
	
	{%- include reviews.html -%}
	
	{% comment %}{% include notice.html notice="Check this out" %}{% endcomment %}
	
	<h2 class="filter-heading"><span>{{ page.title }}</span> <a href="#" class="cta" id="filterBtnsToggle">Filter</a></h2>
	<div class="filter-box" id="filterBox">
		
		<h4>Filter by type</h4>
		<div class="filter-btns">
			<a href="#" class="cta filterBtn" data-filter-type="type" data-filter="all">All</a>
			{% assign all_types = site.learn | map: "type" | join: "," | split: "," | uniq | sort %}
			{% for type in all_types %}
				<a href="#" class="cta filterBtn" data-filter-type="type" data-filter="{{ type | slugify }}">{{ type }}</a>
			{% endfor %}
		</div>
		<h4>Filter by category</h4>
		<div class="filter-btns">
			<a href="#" class="cta filterBtn" data-filter-type="category" data-filter="all">All</a>
			{% assign all_cats = site.learn | map: "categories" | join: "," | split: "," | uniq | sort %}
			{% for cat in all_cats %}
				<a href="#" class="cta filterBtn" data-filter-type="category" data-filter="{{ cat | slugify }}">{{ cat }}</a>
			{% endfor %}
		</div>
	</div>
	
	{%- assign items = site.learn | sort: 'date' | sort: 'priority' | reverse -%}
	{%- include grid.html items=items -%}

	{%- include signup.html title="Want Creative Insights in Your Inbox?" btn="Sign me up!" -%}
</div>
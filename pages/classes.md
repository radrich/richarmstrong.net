---
title: Take a Class
subtitle: Level up. Get your learning on!
description: Upskill Yourself in Creativity, Productivity, Animation, Coding & Illustration.
permalink: /classes/
image: 'img/rich-blue-doodle-bg-thumb.jpg'
background_color: '#1165eb'
color: black
index: true
---
<h1>Classes</h1>
<h2>Level up. Get your learning on. Create some awesome stuff. And have a butt-load of fun!</h2>

<p>I'm a ”Top Teacher” on Skillshare 🏆 but it's not the only reason I like <a href="https://skl.sh/2I3yuwd">Skillshare</a> a lot. Paying only $99 for unlimited classes on a range of topics is crazy-good value for money. <a href="https://skl.sh/2I3yuwd">You can watch all my classes (and all the others) free for 2 weeks.</a></p>

<p>And then there’s <a href="https://ttkb.me/school">TapTapKaboom School</a> where you can purchase single classes and access exclusive content!</p>

<p>Below are classes that thousands students have taken and given amazing reviews on. Hope you enjoy. I can't wait to see what you create.</p>

{%- assign classes = site.classes | sort: 'date' | sort: 'priority' | reverse -%}

{%- include grid.html items=classes -%}
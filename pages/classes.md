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

<p>I love teaching. Somehow, I still think that’s an understatement. I'm a “Top Teacher” <a href="https://ttkb.me/sk">on Skillshare</a>, where you pay yearly for a subscription and can take as many classes as you like—crazy good value for money! And then there’s <a href="https://ttkb.me/school">TapTapKaboom School</a> where you can purchase my classes as one-offs.</p>

<p>Below are classes that thousands of students have taken and given amazing reviews on.</p>

{%- assign classes = site.classes | sort: 'date' | sort: 'priority' | reverse -%}

{%- include grid.html items=classes -%}
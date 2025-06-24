---
title: "Synthetic Stop Motion Essentials"
subtitle: "Some theory on rocking stop motion in After Effects"
description: "Here’s some principles, tips, issues, and expressions used in the synthetic stop motion class."
background_color: "#2a0e4f"
color: "white"
image: 'img/synth-sm-icon.png'
categories: ['Animation', 'Coding']
tags: ['After Effects', 'Expressions', 'Stop Motion']
related:
  - /learn/procreate-animation
  - /learn/synthetic-stop-motion-in-after-effects
  - /posts/common-video-sizes
---

I love stop motion. But let's be honest. I'm lazy. Dealing with cameras and lights and moving things frame by pain-staking-frame? No ways. So I started figuring out how to create a stop motion look in After Effects, without actually having to do the hard work. I found that it was all *very* possible. So I made [a class](http://skl.sh/2tTgYGO) to show you how to do it too. This post is to discuss a synthetic stop motion principles, issues, expressions I use in the class, and things you should think about.

## Principles
- If there’s a lot of the same type of item on screen, focus attention on one at a time, or one row at a time, or one spot at a time. Build the scene, don’t jump straight into it.
- Once an item has animated position from one place to another it generally doesn’t move _that_ much anymore. Sometimes there’s a bit of wind or other movement, but they don’t generally move that much. So slow the frame rate down for that layer or property, or remove the wiggle for that layer from that point onwards, or make use of the last-straw technique.
- If an item is moving in close proximity to another item, the item that is _meant to be stationary_ has a good chance of moving—in both position and rotation. Think about a fat finger moving an object—there’s a good chance it will touch the other object. You may need to do some manual tweaking here. It’s the details that make your film that much more hand-made and character-filled.
- Elements can just appear—not _everything_ has to be animated in. But remember that when elements appear other elements may accidentally be moved.
- You can and should still use easing.
- Use continual movement to your advantage (palm trees, seas, etc.).
- Use sound, if you can, as it conveys a lot of depth and meaning.
- There is always room for manual animation and tweaking (eyes, mouths). Not everything has to be random and wiggled! The synthetic stop motion technique is just an added effect really.
- If there are many things to animate in or out, think about using a slightly higher frame rate or animting everything in really quickly.
- You can break any of these rules.

## Tips
- Change your composition's frame rate before animating otherwise you have keyframes sitting in-between frames.
- Posterize time, or change your composition’s frame rate, and use some form of wiggle as early as possible.
- Make use of an expression layer (null object with an expression effect applied) to keep your frame rate and other things organised!

## 3D issues when using the Posterize Time effect
- The Posterize Time effect makes 3D comp layers with collapse transformations 2D (even just having them as an effect, turned off). Solution: Use Time remapping.
- The Posterize Time effect on a 3D shape layer prevents shadows being cast on it. It almost becomes a 2D layer.
- The Posterize Time effect on a 3D layer does not effect the shadow. The shadow still moves at a regular speed.
- The Posterize Time effect on a 3D AI layer does nothing.

You can solve most of these issues by applying the Posterize Time effect on a precomp layer of your composition inside another composition, or by using the posterizeTime expression.

## Stop motion expressions
Expressions are amazing pieces of JavaScript code that you can write for layer properties in After Effects. Here are a few we use in the class:

{% highlight javascript %}
// Wiggle Expression
// wiggle(fps,amount);
wiggle(10, 20);

// Wiggle X and Y only for a 3D layer's position value
w = wiggle(10,5);
[w[0],w[1],transform.position[2]];

// posterizeTime expression (only for a layer's property, not the whole layer)
// posterizeTime(fps);
posterizeTime(10);

// Short straw technique
// generate random number between 0 and 10
random_number = random(0,10);
posterizeTime(10);

// set short_straw to false by default
short_straw = false;

if (random_number > 9) {
  short_straw = true;
}

if (short_straw == true ) {
  wiggle(10,.2);
} else {
  lightOption.color;
}
{% endhighlight %}
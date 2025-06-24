---
title: "Building My First React Native App"
subtitle: "From Idea to App Stores"
description: "Here’s my experience of creating my first React Native app, The Random Word Doodle."
background_color: "#111111"
color: "white"
image: 'img/first-rn-app-thumb.jpg'
header_image: 'img/rwd-react-native-process.png'
categories: ['Coding']
tags: ['Products', 'React Native', 'Behind The Scenes', 'Experiences', 'UX']
related:
  - /items/hand-code-your-first-website
  - /items/launch-a-rocket
  - /posts/sublime-text-is-awesome/
---

Let me tell you about my experience of developing my first React Native app—from the idea to having apps on the Play Store and App Store. If you want to know what kind of developer I am or why I don’t call myself one, then [read this post](/my-development-background)—just so you know who I am and where I’m coming from.

## The app

[The Random Word Doodle](http://onelink.to/2479kf) is an app based on a [course I made a few years ago.](/random-word-doodle) Doodling random words is a super great creative and mental boost. So, the app generates a bunch of random words and you choose 1 word (or word pair) to base your doodle on. Then you doodle it. You stop when the counter reachers zero.

The app allows you to change the amount of words it generates, whether it generates single or double words, and how long you get to doodle for. It’s really *very* simple.

## The user experience

I’m a product designer. Which means I know about user experience. And I can tell you right now that my app has 2 UX flaws:

- You cannot doodle in the app.
- It doesn’t help, or enforce, you to actually use the app to doodle.

I kind of knew this before I published the app. But it was confirmed when people started asking how they could draw *in the app.* It would have made more sense to people if the app had simply been a random word generator. But that’s boring. I wanted it to be fun and geared towards *doodling* random words. Over 10 thousand people have taken the course, in some form or another, and I wanted to give them an app they could use to get their words, that was as fun as the doodling. I also wanted to make a fun app, that wasn’t too dev-heavy, so that it would be fun learning React Native. Now that my React Native dev skills have levelled up, I can aim a bit higher in terms of dev-heaviness.

What I love about the web and app world is that you can always release a better version. I have a bunch of ideas on how to make the Random Word Doodle app better, but I didn’t want to cram it all into the first version. My aim was to get an app out into the wild as soon as possible. I wanted to use it. I wanted others to use it. I wanted to *ship.* And ship I did. And it felt really good. Besides the flaws I’ve mentioned, I’m super chuffed with my app – it looks awesome (IMO). There’s a bunch of hand-drawn elements. There’s a sweet transition from one screen to the other and it vibrates and chimes when the counter reaches zero.

Now that you know all that, let me talk about my experience.

## How I went about it

Initially, I did some thinking and ideating. And then wire-framing. And then thinking of what I could *actually* achieve with my current skillset. I did some initial user interface designs and some branding/doodling. Then I set off, trying to make a simple version of the app – just trying to get things working. I didn’t care how things looked. I just wanted things to work. I think this is how most developers think—it’s not about the experience, but about making things work. Once I had things working I had to shift my brain into *experience mode.* I had to think about colors, buttons, states, transitions, animations. I had to think about positioning, component structure, and hierarchy. When you’re coding for the experience it’s different to coding to make things work – it feels like they’re 2 totally different things. You really need 2 different brains.

{% include img.html img="img/rwd-wireframes.jpg" alt='Random Word Doodle app wireframes' caption="Some initial wireframes. You’ll see that some things got chopped (or left for a further release)." %}

Creating the assets and finishing the app was the toughest part for me (not the longest). Normally I design stuff and hand it over to developers, or I design something first and then develop it, or design while I’m developing in the browser. But this time, because everything was of hand-doodled nature, I had to create assets, export them, and try them out in the app. It was like the worst case of procrastination. But I beat it.

{% include img.html img="img/rwd-app-progress.jpg" alt='Random Word Doodle app progress' caption="You can see some of the progression here." %}

## From start to finish

To get going in this modern world of code is a nightmare. Things are not simple. Just look at how much jargon I use in the next few paragraphs. And things change like crazy! But, a basic React Native app was simple to get up and running. All I needed was [Expo](https://expo.io/), [Xcode](https://developer.apple.com/xcode/) (for the simulators) and [Sublime Text](https://www.sublimetext.com/) to write my code. Because I understand React, JavaScript, and CSS, it was *fairly* easy to create an app. I did spend more time on the internet than I did writing code, but this is usually the case when learning something new. Luckily I’d already gone through the nightmare of setting up Android Studio and Android emulators—I could test the app on Android once I figured out what terminal commands to run. And luckily, again, I knew about git and version control. I primarily use [Bitbucket](https://bitbucket.org/) for this. And thank God I know what [npm](https://www.npmjs.com/) is. And that I know that Yarn isn’t too different. I knew I’d be okay using npm via the command line to install a few other things I needed for the project.

At some point I needed to get my app out of simulators and into the real world. And you can’t just drag and drop your code into an FTP window like you can when making a website. So I had to run some terminal commands with Expo’s command line tool, which was pretty easy to do, to build and get my app files. I then used Apple’s Application Loader to upload the iOS app. And I simply uploaded the Android one to the Play Store (a bit easier). I then did a lot of hoop jumping and screenshot taking to make the App and Play Store accept my submissions.

This was not my first from start-to-finish app publishing rodeo and I’m not sure I would’ve come out sane if it was. I’m not even sure I could get this far with a clean installation of OSX, without all the stuff I’ve installed on it over the years. The only new thing, really, was Expo. Well, it was the only new thing with a user interface I installed.

## Expo

Let me start by saying that Expo makes it really easy to develop! With Expo, you can develop how things look really easily. It’s free, it’s easy to use, and it makes me happy because instead of typing commands into the command line, that I too often forget, I can just click buttons. Here’s a few other things I love about it:

- You can develop without having to open Android Studio or Xcode, which is a massive plus.
- It allows you to launch your app on simulators and on your own device, if you have the Expo app installed.
- The included libraries are pretty sweet and fill in most of the gaps that React Native itself doesn’t address.
- You can get it to reload when you save a file. In fact, you can get it to reload just the component you’re working in.

{% include img.html img="img/rwd-expo.jpg" alt='Expo' caption="This is the simplicity of Expo. It’s super sweet." %}

That’s not to say Expo doesn’t have its issues, but it worked really well most of the time. What the Expo app didn’t do was publish or build apps. I had to use the Expo command line tool for that. It was pretty easy and much better than going into Xcode or Android Studio.

## React Native

React Native has been mostly awesome to work with because, like React, it uses JavaScript for logic and a HTML-JavaScript-like combo for rendering the interface. And once you understand most of the standard components, and how to make your own, you’re all set! And it *feels* like a proper native app. It’s fast. It smashes Cordova apps hands-down.

Styling in React Native is a bit different from styling websites, especially if you’re used to precompilers like SASS. But, compared to making an iOS app in Objective-C, it felt super easy. I love how every component is self-contained. All the styling, all the logic, all the animation, and all the state management *can be* in one file.

When it came to animation in React Native, I was baffled at first. It took me a long time to understand. Animating using state is a weird concept to get your head around. But once you do it becomes easy to replicate and wield to your advantage. I’d say it’s fairly similar to using [GreenSock.](https://greensock.com/)

[React Navigation](https://reactnavigation.org/) made everything a lot easier. I really appreciated it once I’d finally given up my ways of transitioning from one screen to another. I didn’t want a regular transition – I wanted I really sweet one. Luckily, someone had written a great article on how to do it. Because I’m concerned with the entire experience, it’s the little things like custom transitions that make me happy—custom transitions FTW 🙌 

I found loading and dealing with assets weird. I couldn’t find out how to load a random image. I also found the asynchronous side of things weird.

Even though I’m stating that React Native was easy for me, I had *a lot* of issues. I broke all kinds of things. Expo froze. I had to restart emulators. I had to restart my computer multiple times. I deleted the entire project and restarted twice. I spent more time Googling stuff than coding—maybe this is what most developers actually do? I had a billion tabs open. Here’s a few tab categories:

- [React Native documentation site.](https://facebook.github.io/react-native/docs/getting-started) A great place to start and super helpful. And an even better place to come back to check what’s possible. My sticky timer is there because I went documentation skimming. It was really easy to implement.
- [React documentation site.](https://reactjs.org/docs/getting-started.html) Also, really helpful! It covers why a lot of stuff I wrote didn’t work. Things like prop types and component life cycles are great things to have a good understanding about.
- [Expo documentation site.](https://docs.expo.io/) Expo is awesome and covers a lot of stuff that React Native doesn’t. Their documentation was mostly good. Some of it stinks though.
- Stack Overflow (via Google). I don’t think I’ve ever asked an original question on Stack Overflow. I had common issues, and most of the time I could figure them out thanks to others who’ve gone before me.
- Medium articles. This is where nice humans write about awesome things you have no idea about, and that the official documentation does not *show* you how to do: animation, navigation, state management, asset loading, app publishing. There are some awesome humans in the world. And clever ones too.

Some things I researched because I had errors. Others I researched because I thought there must be a standard or better way to do something. And still other times, because I’d done it before and had since forgotten how to do it again. Remember, I don’t code apps everyday.

During the process of building the app, I felt I had what it took to offer a React Native app to one client, and offer my frontend React Native skills to another. I also started creating the native app for another personal project called Voochy.

But to be honest, if a developer had to look at my code they’d write me essays on how to code better. They’d explain all the rules I’d broken and start speaking Matrix at me. But I don’t care. It works. It looks good. And if it blows up and becomes a massive success, hopefully I can afford a super-coder to make things right.

## Android

I initially published only the iOS version. I didn’t have a look at the app looked like on Android until a month after publishing for iOS. I thought it would be like making a website work on Internet Explorer 6. But, it wasn’t. There were a few things I had to do, but it worked pretty well. Some of the issues:

- No drop-shadows.
- Not so nice emoji support.
- Sharing works differently.
- I had to put in a new view to get a black background color.
- An oversized splash image
- Expo includes a bunch of stuff like calendar, contacts and location service permissions. It’s not ideal, but I think that it pros outweigh the cons.

{% include img.html img="img/rwd-android-permissions.jpg" alt='Expo' caption="Expo people, if you read this, please take note!" %}

Although I did it prior to starting this project, I have to mention it. Setting up [Android Studio](https://developer.android.com/studio/) and getting the Android simulators working wasn’t fun. I spent a lot of time on Google trying to figure out how to do it (maybe that’s their ploy). I cannot recount the things I had to do to make it work. I may only have one kidney now. But I got it to work! And I got [Genymotion](https://www.genymotion.com/) working too! But they still don’t compare to a real Android device. I don’t have one of those. Anyone willing to donate one?

## Awesome humans

There is no way I’d have been able to do this without the help of awesome humans. They’re like a different species. Thank you to all the humans who take time to write awesome documentation, and to those who take time to explain how to do awesome stuff with code. We need more people like you. I’m hoping my classes and other stuff I make will help humans in a similar way.

Thank you to the people who make React Native and Expo and Xcode and all this other stuff. It gives me and people like me the opportunity to make stuff without having to know too much or be too technical.

## Conclusion

So, what am I trying to say? I conclude that the React Native journey has been a smooth*ish* journey *for me* because of all the parts that are similar to the stuff I’ve done in the past. My experience in making and deploying apps, as well as my experience in creating React websites, has played a massive role in how I’ve found the process. If you’re a human who likes the web and has experience in writing web code, like HTML, CSS and JavaScript, then React Native should be pretty easy to get into.

If you’re totally new to this all, here’s what I recommend you do: download Expo and download Xcode (which comes with iPhone Simulators). Install Xcode. Then create a project with Expo and run your app on a simulator. Then, download Visual Studio Code and open the project in it. Those 3 things are manageable. You should be able to have fun and learn a lot. Then, when you’re comfortable, figure out what to do next. Explore the official documentation. Google stuff. Ask people in a community. Contact me.

I think there are too many moving parts in this coding world, especially for beginners! Things are moving too quickly. But man, creating something that people can use is rewarding. It’s worth the hoop jumping, head scratching, and countless WFT moments.

## Takeaways

- The first takeaway is that experience is golden. Learn things that you can combine with other things. It makes learning new things related to those things easier. Learn how to write HTML and CSS. Learn JavaScript.
- The second is to be patient. With yourself. With technology. Things eventually work out.

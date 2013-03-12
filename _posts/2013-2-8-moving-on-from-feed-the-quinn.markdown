---
layout: default
title: Shipping!  Kind of.... 
---

I'm shipping my January game, Feed The Quinn, and it sucks as a game but I really need to move on. With that said, it's time for a little history and explanation. 

Let's start from the beginning, which is actually about a year ago, when I first became interested in HTML5 game development. I can't remember exactly what triggered it, but I became intrigued by the canvas.  I did some experimenting and wrote a little breakout clone (which is better than Feed the Quinn) and I taught an 8th Light University where I wrote an Asteroids clone in about three hours which is MUCH better than Feed the Quinn.  Then I started on.... Feed The Quinn.

The details of what I really want Feed the Quinn to be are probably fodder for another post, but let me tell the origins.  I work from home once a week with my two littlest children. My youngest, Quinn, can be extremely difficult. He is loud, energetic, demanding, and a bit clumsy. In addition my precocious 4 year old Leilani frequently antagonizes him, and also has her needs. They are VERY good at making a ton of noise during a meeting, especially if I'm at the center of it. One day I was losing it at home and emailed my wife saying something along the lines of:

_I have an idea for a game. You're a dad trying to get some work done but your son won't stop screaming unless you keep shoving food into his mouth, and your daughter keeps interrupting and then your teenagers need a ride and if you don't eventualy get some work done your head EXPLODES_

My wife responded along the lines of, "you know you should make that, but soon before Quinn grows up a little." At that point I began work, using HTML5 cause I thought it would be quicker than iOS to get to market. Ha! When I started working I had to big rules:

__Working Outside the Browser__

I'm a TDD zealot, and Jasmine in the browser drives me bonkers. I needed to be able to use the command line.

__Data Driven__

A couple years ago my game architecture course was in Java, and I wrote a variation of a different game using TDD. What became extremely frustrating was that my tests would constantly fail when sprite sizes changed or display order, and various other pieces of data that weren't relevant to my tests. I realized awful late that I needed a more data driven setup. I wouldn't make that mistake with Feed The Quinn.

This prompted me to start out with using node.js for development, even though I don't like node as a server. In fact the current game is completely client side (a problem at the moment). It also prompted me to fall into meta-fail, where I started very early on extracting a framework called Eskimo. Looking back at the history, I actually extracted a little for my breakout clone, which was way way way too early. Eskimo brought itself a whole host of problems, largely revolving around the system of loading objects and putting them into the level. It's been a disaster, I have essentially been refactoring it for the past year.  Frequently Feed the Quinn just didn't work because I had huge changes to make to Eskimo. A game that should have been a few hours (which you can see if you play) basically took over a year. I've learned a ton and when I've got better games built on it I'll probably feel better about it, but right now it's just a huge frustration point. 

Does this mean I'm killing Eskimo? Not at all. I still think HTML5 is the future of indie game development, but it does mean I still can't release it. The back end is going to change, and anybody who built a game on it now would be affected. It does mean I need a break from it. I'm gonna do my Febuary entry in Unity (I hope) and I think I may get back into iOS for March. Eskimo will still get some love during 8th Light Waza, because it's my OS project.

Does it mean I'm killing Feed The Quinn. Definitely not. I have some goals with this project, which I'll write about eventually, and one of them revolves around making the full version of this game that I really want to make. One with an actual game mechanic. But I need to move on and try something else. For Feburary I'm gonna try and do a very very mini RTS style game in Unity, at least as of right this moment. I'll write about that next time.

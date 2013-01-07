---
layout: default
title: Simplify Simplify Simplify
---

I'll write about the game I'm working on this month, but let me tell you the problem I've been trying to solve this weekend (intermittently):

 * I want a food item (in a sprite) to appear at random intervals.
 * I want my main character to be able to pick up the food
 * Then he can bring it to a baby
 
This is a pretty simple problem, something that could be done in a few hours if I had things setup right.  Unfortunately I do not.  Specifically my game system is way over-complicated and over-engineered.  I should know, I wrote it.  The way I specify levels is a json structure, and when I load that structure I identify any visible images in it and put them on the screen.  Then the game layer loads a level, and sees if it needs to create any custom objects from the structure a second time, and if any of them were already images or sounds it needs to recreate the images.......

Ugh you see where I'm going.  I spent the time I had this weekend simplifying the above.  When I have more time and motivation I'll document how the new system works, but the point is I wrote that system six months ago, maybe longer, and filled it with stuff I might need. I know better, and when you've got a one month deadline you need to spend a lot more time on a game and a lot less time on programmer masturbation. 

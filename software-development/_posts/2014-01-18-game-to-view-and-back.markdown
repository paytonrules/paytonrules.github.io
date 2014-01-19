---
layout: default
title: Scaling and Abstractions
---

Time to get a little blogging in.  Today I want to talk about scaling and leaky abstractions a bit. Let's take a look at one of my screenshot strategy images:

<img src="https://pbs.twimg.com/media/BdyhpNiCIAAg9QI.jpg" />

I'm moving the game to a new theme, to better fit with the existing graphics.  As I did that I restored the graphics to their original PlanetCute .png files, which were smaller than the ones I had scaled in GIMP.  You can see here nothing looks right - the buckets are now too far apart, the distances are huge, and if you see the stars in motion they are very very slow.  Now I have plenty of tweaking to do to these objects, and I don't want to update the code each time I fiddle with these objects.

Fortunately the Cocos2d framework knows things like screen-size and bounding boxes, so I can use data from the framework to properly scale things. Unfortunately Cocos is not testable without loads of effort that isn't worthwhile to put in. In addition making my game objects inherit from Cocos2d binds me to the framework in ways I simply don't want to do. Instead I have a set of game objects that the Cocos2d framework uses.  Anything that directly uses Cocos2d is in an untestable ["hole in the sheet"](https://www.youtube.com/watch?v=MkfsSUBlqUY), and mixing those objects will really break my design.

I've got a way to solve this that works okay. My game objects exist in a space that is 2048 x 1536. Anything that goes into the system from Cocos2d, such as bounding boxes or "height" in particular has to be scaled to the right resolution before being passed in.  That's done with a simple transformer object, and it retrieves the size of the screen through a ScreenSize service that is setup at the beginning of the game.  Anything that comes out is scaled from game units back to view units. This is similar to a 3D pipeline where coordinates go through several transformations before being rendered to the screen.

I'm concerned about a few things at the moment.

* Nothing enforces going through the transformer, so it the scaling is sprinkled through the code.
* The scaling operations should really all happen at once, to be done in parallel on-chip. I have no idea how to do this sort of 3D-style operation in Cocos2d.
* Height and Bounding boxes are 2D abstractions that are leaking into the game layer.

It's possible I need a translation layer between my 2D game view and my game logic, perhaps decorating the un-polluted objects with 2D specifics. Of course that is only necessary if I ever make a 3D version.

Screenshot Time:

<img src="https://pbs.twimg.com/media/BeR4rD5CIAAGRwg.jpg" />

Checkout that cool shopping cart in the corner.  Time to buy Texture Packer.

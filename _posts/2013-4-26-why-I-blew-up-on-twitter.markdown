---
layout: default
title: My Twitter Explosion
---

<h2><blockquote class="twitter-tweet"><p>I shoulda been a farmer.</p>&mdash; Eric Smith (@paytonrules) <a href="https://twitter.com/paytonrules/status/326932031193894913">April 24, 2013</a></blockquote></h2>

Earlier this week I did something I'm not really proud of, I had a bit of a twitter meltdown. I tend to use twitter as an outlet, which is a bad habit generally and a terrible one when I'm really upset. In this case I had a huge run of bad luck with Unity3D, Mono, MonoGame, Xamarin, XCode, Windows, XNA and 3D models. I may have left something out. It was a rough week.

<h2><blockquote class="twitter-tweet"><p>Upgrade XCode, MonoDevelop doesn't build.Upgrade MonoDevelop, project doesn't build anymore.Computers are broken.</p>&mdash; Eric Smith (@paytonrules) <a href="https://twitter.com/paytonrules/status/326894653850927104">April 24, 2013</a></blockquote></h2>

There's probably nothing wrong with the occsasional rage tweet, and my friends get a laugh out of it, but if I was following myself on twitter I certainly wouldn't have thought "Well I'm gonna go to his talk, then I'm gonna work with him!" As much I learn from giving presentations, the fact is that they are marketing. As a consultant bitching about at your toolset is hardly the right approach.

## So what the hell happened?

<h2><blockquote class="twitter-tweet"><p>Why is getting 3D models imported always such a pain in the ass, regardless of technology?</p>&mdash; Eric Smith (@paytonrules) <a href="https://twitter.com/paytonrules/status/325761134705659904">April 21, 2013</a></blockquote></h2>

Sometime in Febuary I started using Unity3D again. I've had some troubles with Unity in the past, because it likes to corrupt the scene files, so I was reluctant. When it's working it's great, but when it crashes you're screwed. Still I made a little progress and even got a TDD loop working with the C# code. I submitted a talk about it to Chicago Code Camp, and began working on a demo. 

March was interrupted by some project work, so it was really April when I started really making progress on my project. I had a demo done last weekend, last Saturday to be precise, with only one bug to fix. I was stumped so I fired up the MonoDevelop debugger.

That's when it happened.

<h2><blockquote class="twitter-tweet"><p>Unity has corrupted my project again, forcing me to recreate it from scratch.This is the third time this has happened.</p>&mdash; Eric Smith (@paytonrules) <a href="https://twitter.com/paytonrules/status/325627138051031041">April 20, 2013</a></blockquote></h2>

Unity3D crashed as soon as I attached the debugger, corrupting the scene file. As I mentioned in the tweet this has happened to me before, and while I have learned a bit about how git can work with Unity (thanks @citizenparker) since then it still make me reluctant to use the tecnhnology. Given its popularity and the fact that I don't see others reporting this issue, I assume I'm doing something wrong. That said this should never ever happen, and I'm extremely reluctant to continue using Unity.

Fortunately I had a solution, one that fit well with my upcoming talk. The general workflow I use is to have a seperate assembly for all my game logic and import that into Unity. If my approrach was valid I should be able to take that assembly and write a MonoGame version of the app. So I spent the weekend porting the game over to MonoGame. Now I'm familiar with XNA and MonoGame was working pretty well, so it was looking good. I wouldn't have a lot of time to actually make the presentation, but it was going to work.

On Tuesday I was working my day job when OSX informed my that I could upgrade XCode. I hit the button and then didn't give a second thought, until that evening.

<h2><blockquote class="twitter-tweet"><p>Upgrade XCode, MonoDevelop doesn't build.Upgrade MonoDevelop, project doesn't build anymore.Computers are broken.</p>&mdash; Eric Smith (@paytonrules) <a href="https://twitter.com/paytonrules/status/326894653850927104">April 24, 2013</a></blockquote></h2>

I was upset enough at this point that the tweet isn't actually correct. What happened was the upgrade to XCode caused my MonoGame version of the project to stop building. I upgraded Xamarin, and then the buid started crashing. I tried manually building MonoMac, but it wouldn't build. Then I uninstalled everything (including Unity, which has its own version of mono) only that didn't work either.

I was hosed on MonoMac unless I migrated my version of XCode backwards. Fun. At this point I actually tried using Windows, but couldn't reliably get models I got off the internet to show up. So I went back to Unity. Thursday morning I had refinished the product and could start preparing the slides. I'm shocked the presentation went well, because by the time Thursday came around I had little to no sleep. Frankly I'm tried from writing this blog recreating the experience.

## Will I use Unity again?

Probably yes, with reservations. When Unity works it's _FUCKING AWESOME_. Writing the MonoGame port took a weekend and an evening, which seems short, but 90% of that time was trying to get various models to work. There is a gigantic difference between dragging and dropping an asset to see if it works, and writing a bunch of code to see that model and then wondering if the model or the code is the reason it's not showing up. There's also a lot of other things it provides that you don't think of when you set out to write it yourself. My collisions didn't work well in MonoGame because it doesn't have a built-in Mesh Collider like Unity does, and I had to write my own mouse "click" code since MonoGame doesn't have that event.

### Source Control

In order to get past the frequent isssues with Unity corrupting my scenes, I need source control. Unity naturallyer recommends their asset manager, which costs money and is centralized. Yuck. I want to use git and thanks to [Scott Parker](http://spparker.com) for showing me how to use it correctly with Unity3D. You'll want to follow [these directions](http://docs.unity3d.com/Documentation/Manual/ExternalVersionControlSystemSupport.html) and probably tweak your git ignore file. That should at least give you a restore point when thigns go bad. 

### Automatic Backup

On top of the source control I started using Scott Chacon's script to automatically backup to a hidden git repository every five minutes. You can find it in his [A Tale Of Three Trees](http://threetrees.heroku.com/#104) from Strange Loop last year. This means if Unity decides to give me the middle finger again, I can properly restore to five minutes ago. I shouldn't have to do this of course, but until Unity stops doing this to me, this is my workaround.

## Will I use MonoGame again?

I kinda glossed over the problems with MonoGame, because this blog has gotten longer than I expected. MonoGame was what I call "tantalizing" technology, which is worse than bad technology. MonoGame works great when it works. I've enjoyed XNA in the past and I enjoyed writing the port until it stopped working. There's two issues that would prevent me from using it in the future, at least for 3D dev.

### Model importing

I'm a Mac user, but the XNA Content pipeline hasn't been ported to MonoGame so that means using Visual Studio to import the models. This is an exceptionally tedious process: 

* Download a free 3D model from OpenGameArt or Turbo Squid
* Copy it to my Windows VM
* Go to Visual Studio
* Add the model to my Content Build
* Build the project
* Get the built file and copy it back to my real MonoGame project
* Run the game and see if the model works
* It doesn't, so repeat.

It doesn't help that XNA can import FBX files, but most of the models I'm grabbing appear to be converted to FBX from software like Maya or 3D Studio. Furthermore XNA's Content importer works with a specific version of the FBX format (2011.6) which is no longer the most modern. It's a nightmare to get a model into the system.

There is work being done getting the model importer to Mac, which would help enormously, but until they have that working I couldn't imagine doing MonoGame for 3D games. I've written an FBX converter before, so if the time presents itself I may help out, but don't hold your breath.

### Xamarin vs. MonoDevelop vs. XCode

The other problem with MonoGame is the dependency issues. MonoDevelop has recently been superceded by Xamarin, and Xamarin has a Xamarin.mac that is a pay for platform. They also distribute MonoMac.dll, the open source version, but they don't update it as frequently. That means that when XCode was upgraded and broke the MonoGame library, the fix wasn't immediately distributed with Xamarin updates. In fact it still [isn't as of this writing](https://github.com/mono/MonoGame/pull/1576#issuecomment-16044236). Now maybe this is just a one time incident, but I'd feel pretty uncomfortable fighting this battle on a side project. I write iOS code at work and can't avoid upgrading XCode.

That said I like XNA a lot, especially for 2D work. I like the idea of one code base for a Mac Game, iOS, Windows and I'm comfortable patching open source software when I'm not completely panicked by a presentation deadline. So I probably will use it again, but not in the near term.

## Moral of the story

As a community developers have way too high a tolerance for yak shaving. None of this should have happened. Xamarin + MonoMac should just work. Unity should just work. Building MonoMac should just work. You get the idea. That said a lot of people work really hard on these projects, and many of them are free. So maybe, if you want to be a highly paid professional consultant, you probably shouldn't bitch on twitter so much.

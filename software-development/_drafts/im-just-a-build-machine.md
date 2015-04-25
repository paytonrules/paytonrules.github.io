---
layout: ebomb
title: The Build Doesn't Work!
---

I was recently working with a team who was having massive build troubles. Stop me if you've heard this before, but they said the build:

* Had false positives.
* Took forever to run.
* Was frequently broken for hours.

A bad build machine[^1] causes all kinds of side effects. Developers may not want to check in frequently because they don't want to wait. They may avoid writing tests in order to make sure their code gets in, or add the "ignore" flag to get the build passing. Conscientious developers may find themselves "punished" because they are constantly fixing the build while other developers seem to get more "done". Eventually everybody will ignore the build and you'll ship broken ones to customers.

Can you imagine buying a car that way? "This car failed several of our tests but we just removed the tests. Here you go!" Of course it's actually worse with software. An individual car may come off the assembly line with a defect while the rest of the cars our fine. In the case of software we have a 100% failure rate.

Fixing the build process involves changing the behavior around the build, and changing the code and build machine itself to make it easier to follow the good practices. Essentially you make things difficult, then fix the code to make the difficult easy.

## Improve the Behavior

The build got this way because developers haven't been valuing it. On a brand new project you may be able to hand-select a team that will make it a priority and keep things green, but you aren't on a brand new project. It's time for some heavy-handed changes to prompt best practices.

### Don't Ship Broken Builds!

So you've got a busted build. It's causing all the problems above and probably more. Step one is to take the build _seriously_! If you're reading this then you probably do spend an inordinate amount of time on the build machine, but if you ship with a broken build you're making it clear that you don't trust the build.

And if my audience, the kind of people that are often pushing TDD at large companies, is willing to say "yeah the build is broken but we can ship anyway" then nobody else will take it seriously either.

When the build fails it cannot be shipped. Ever. It's the same as a compiler error. Make this abundantly clear to whoever you have to.

## Build Shame

If you can't ship a broken build then people will make sure the build passes, but only at the moment of shipping. They might be perfectly happy to spend months developing against a broken build only to "fix" it at the last moment. This defeats the purpose of a build machine, which is to make sure you're always working on cleanly integrated software. Build shame can take a few forms:

* Donuts for the team
* Team wide-notification of "who" broke the build
* Silly hats
* Ugly souvenirs

On one team we had a giant picture of a [Rams Head Snuff Mull](http://tour-perth-scotland.blogspot.com/2010/08/tour-perth-antique-rams-snuff-mull.html) we would send to the offender and everybody else on the team. It's as ugly as it sounds.


## Improve the Process




[^1]: By build machine I am referring to a continuous integration environment where the entire system is built and automatically tested. A build machine might run unit tests, might run integration tests, and sadly might not run any of those things. It means more than compiling the code. See [here](http://en.wikipedia.org/wiki/Continuous_integration) for more details.


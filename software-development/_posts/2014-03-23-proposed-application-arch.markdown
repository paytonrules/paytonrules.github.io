---
layout: ebomb
title: iOS does not support unit testing
---

I'll say it again:

_iOS does not support unit testing_

This is a pretty bold statement coming from me considering that I've [devoted](http://pragprog.com/magazines/2010-07/tdd-on-iphone-diy) [much] (http://vimeo.com/5765266) of the last [few years] (http://blog.8thlight.com/eric-smith/2009/05/11/tdd-and-iphone-nstimer.html) to teaching people how to do TDD on that very platform, but it's the truth. For years Apple used this definition for Unit Tests:

> You use logic unit tests to perform exhaustive, highly tailored testing of your code. With application unit tests
> you test your code within an app running in a simulator or on a device, with access to the resources available
> in the Cocoa framework in Mac apps, and the Cocoa Touch framework in iOS apps.

These two definitions imply that Apple thinks "Unit Tests" run all the way through the application stack, if they are _application_ unit tests. This is a contradiction in terms. In reality what Apple called application unit tests were really just functional tests wrapped in a unit testing framework, and these were the only tests supported on iOS. This is why when you use XCTest/OCUnit or anything built on top of those frameworks (such as Kiwi or Cedar) you get the glorious simulator popping up every single time you run a test. Apple no longer uses these two definitions but the simulator is still there, ruining your TDD flow and causing much (if not most) of the testing on iOS to be done with the tests written after the code.

A few of us, such as the maintainers of OCDSpec and Google Toolbox for Mac and a few others, have tilted at this particular window year after year. The Google Toolbox folks have a script that allow you to run your tests in the simulator headlessly, which drastically reduces the amount of time spent waiting for tests to run, and OCDSpec uses a variation of this script. Unfortunately every single time a new vesrion of XCode/iOS/Objective-C comes out this script is broken. I am conceding defeat, and am not going to continue to try and get it working anymore. Apple has won this battle.

But I intend to win the war.

## A New Architecture

Now I said iOS doesn't support Unit Testing, but I said nothing about Objective-C. Let's look at a very tiny class diagram:

![Alt text](/images/simpleclass.png)

This is a classic way I design applications while sticking with the Dependency Inversion Principle. Rather than depending directly on the GUI the application talks via an interface, or uses the observer pattern. In either case their is no direct dependency from the app to the GUI. In iOS applications I've taken to creating an iOS directory underneath my project directory, where all this iOS-specific code goes. I do this to emphasize that iOS is a _detail_ of the application not the primary part of the system. Early in an applications the development this is pretty weird, because most of the early development has iOS dependencies. Over time the application is where the system grows, and it grows larger and larger than the iOS component.

Now you can imagine drawing a hard line around the concrete GUI. This is where you view controllers and segues go, and this cannot be test driven. You can and should use the XCTest framework, or one of its derivatives, to write tests for it. You should write these as "application" or what I would call functional tests. The application component cation can be built as a command line Mac application. It can run tests fast! It can be test driven. It is where happy development lives.

At this point you are probably wondering how you get this OSX application into your app. You have a few options. You can create a separate target for iOS static library in your testing app, or you can just include the files via a submodule. You could even be so bold as to write your application code in C or C++ and build it as a tradtional library. What you can't do is use the Cocoa Touch Static Library and write unit tests against that, as it will start spawining your simulator again and turn these unit tests into functional ones.

## Worth It?

Truthfully I don't know. Setting up a project this way is a lot of up front work for a benefit that is unclear, but I do know that the current setup is untenable for Unit Testing on iOS. Instead of fighting against Apple, I'm willing to roll in the direction of less resistance and get an improved architecture out of it.

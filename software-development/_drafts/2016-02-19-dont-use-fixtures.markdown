---
layout: ebomb
title: Please Don't Use Fixtures
---

Fixtures are a really attractive feature, particularly for developers that have been doing TDD for a little while and are starting to see ugly tests. What's a fixture? If you don't know the kind of fixture I'm referring is any testing tool that allows you to setup data outside of the tests themselves. They take tests that might look like this:

```javascript
```

and turn them into this:

```javascript
```

This example is in JavaScript and is loading DOM but another common use for test fixtures to load database data quickly into the database. This appeals to us as developers because it's definitely cleaner. It's DRY, and removes 'noise' from the tests. The problem is it is tightly coupled to the test itself. Let's take the test above and add another test case.

```javascript
```

That means changing the fixture:

```javascript
```

Oops the first test is now failing!

```javascript
```

So to make one failing test I had to write a new test, update the fixture, then update other tests that failed for an unrelated reason. This suffers from a test smell of _unneeded setup_. The tests that don't care about our new test are being affected by it because the fixture changed. This scales terribly, as systems that make heavy use of fixtures will share those fixtures across the system. One change for one test can cause dozens of test failures.

As a writer I should be able to write my next unit test in a self-contained way. It should not be affected by other tests, and I shouldn't have to understand a bunch of unrelated tests just to write the new code. So how do we fix this code? Well start by making the test wet - allow the duplication.

```javascript
```

Now the duplication is ugly but the reason for that duplication is incidental. The tests don't really share setup, they only shared that setup because the code used fixtures. So fix up the tests so they only use the code they need.

```javascript
```

Now git rm that fixture file.

I think this version of the code is easier to understand and works better in isolation. Now this example is small and you might _need_ your fixtures in your codebase, or think you do. For instance you might have objects that require a ton of setup. This happens a lot with database code:

```javascript
```

You don't want to sprinkle that setup throughout your tests. But by putting that code into a fixture you actually ignore one of the benefits of TDD. Remember TDD provides several forms of feedback. First and foremost is "does the code work" but a close second is "is my design working?" And if you need to copy and paste the code above your design isn't working. The simplest fix for this is a factory - a factory _in the app_.

```javascript
```

Your clients (the tests) are using this code all the time, there's no reason it shouldn't be first class code.

I try hard to avoid saying things are "good" or "bad" in this blog, but I have yet to find a use for fixtures that wouldn't have been better served by keeping test setup within the tests.

---
layout: ebomb
title: Where are Good Examples of TDD?
---

Learning has TDD at a great feedback loop when you're a beginner. You write a simple test, you make it pass, you write the next one. Your first test will probably take hours. Your second one takes an hour. Your third takes minutes and you have your aha! moment. This is why I [recommend katas](http://paytonrules.com/software-development/2015/01/13/how-to-learn-tdd.html) as an early step to get started. If you do the [prime factors kata](http://butunclebob.com/ArticleS.UncleBob.ThePrimeFactorsKata) you'll see value really quickly.

So that's point A to B, and if you follow the "how to learn TDD" path you'll get from B to C as well, but a lot of developers still want to see what a good unit test should look like. They sense problems in their tests but can't put their finger on it. I have my own opinions on what a test should look like but that's not what I'm gonna talk about today. My style is not your style or anybody else's.

## How to Find Good Examples of Tests

It shouldn't be hard to find good examples of tests. You should be able to pick any project on Github or Bitbucket and find good tests. But of course many codebases don't have tests, and those that do may have crappy tests. How do you evaluate what makes a good test vs. what makes a bad test? After all if you knew how to do that then you wouldn't need to look at examples now would you?

What if you could find example test suites by known experts in TDD in about two minutes? You could browse, take notes, and learn. You could probably even download them and tweak them. You could even _disagree_ with them! Lord knows they disagree with each other.

## This is Easy

There are of course a large number of open source test suites that meet this criteria - they are the test suites for test frameworks! Take a look at the test suites for:

* [JUnit](https://github.com/junit-team/junit)
* [RSpec](https://github.com/rspec/rspec)
* [Jasmine](https://github.com/jasmine/jasmine)
* Your Favorite Framework!

Look for how they organize their tests. How they setup data. How they solve the hard parts of testing things like threading and time. See how they bootstrap themselves, that is to say how do you test the testing framework when the framework doesn't exist yet.

Notice the different styles. RSpec makes use of cucumber for features, while JUnit doesn't use a mocking framework. Look at the organization of test files and individual test cases themselves. Do they use one assert per test? Where do they put helper functions and classes? Are the tests for the test framework in a different directory or side-by-side. Do they have one test per class? Take a look at the commit history. You might be surprised at were they started from. For instance the first commit of Mockito checks in EasyMock

Finally recognize that their tests are probably better than yours, but not _all_ of their tests are better than _all_ of your tests. You can take some notes and learn some things, but maybe your desire for these perfect test examples is because you think your tests suck. They probably don't, unless they don't exist.


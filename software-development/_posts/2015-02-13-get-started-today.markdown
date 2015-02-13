---
layout: ebomb
title: Write Tests Now
---

Many of you have been generous enough to answer a few questions from me when you sign up for my newsletter, the responses tend to look a lot like this:

>I'm a software developer and I think TDD is great, but I have tons and tons of legacy code and I don't know how to get started. The organization wants to be Agile but they won't test the millions of lines of software already written. How do I get started when all this code is already there?

There's no question that trying to get a huge codebase under test is a daunting task. When you look around and see the communities that started with tests talking about fearless refactoring and continuous deployment it's easy to think "We'll never get there!" Meeting your schedule, fixing your bugs, and writing new features all while adding TDD seems impossible. I know, I get it, I've been there. The temptation to rewrite the WHOLE thing is strong.

DO NOT LISTEN!

Let me be blunt.  If you didn't use TDD when you built your current system and you can't use TDD now, then you won't get a brand new system right either. Instead you're gonna screw things up and blame the tests.

Start using tests now on your existing code. Here's a few ways to make things simpler.

#### Don't Add Them To the Old Code

The first thing many teams do when adopting TDD is to try and add tests to all the existing code. This does almost no good. It reinforces a bad design, encourages bad habits, takes an enormous amount of time, and prevents very few defects. There's no "Drive" in the development here, just a mandate.

If there is an initiative to write unit tests for everything, end it. It's not worth it.

#### Perfect is the Enemy of Good

Any unit testing initiative will run into problems. Maybe everybody shares the database so you can't test it. Maybe too much of the business logic is in the UI so you can't test that. Maybe everything depends on a JSON server running. Really there's any number of problems you could run into that prevent unit testing, all of which are probably solvable but not necessarily in a reasonable time frame.

Unfortunately many times the team will give up on unit tests entirely because of these issues. 50% code coverage is better than 0% code coverage. If you can't cover the entire system with tests extract the logic you can cover and test it. Let's look at a simple example. I was recently writing a web app that uses HTML5 video. Unfortunately the tests couldn't use an HTML5 Video DOM element because PhantomJS doesn't support it. The test I wanted to write looked something like this:

{% highlight javascript %}
it ("fires the callback when the video makes progress with time in ms", function() {
  callback = createStub();
  videoWrapper.progress(callback);

  $("video").fire!("progress", 30);

  expect(callback).toHaveBeenCalledWith(30000);
}
{% endhighlight %}

The failure was that HTMLDomElement (as opposed to HTML5VideoElement) did not support a progress event. Upon further evaluation I didn't need to test that progress would work as a callback. I couldn't really be sure that the callback was wired correctly until I tried the app anyway, but I did need to be sure that progress was converted into milliseconds. So I wrote this test:

{% highlight javascript %}

it("fires the progress callback with seconds as milliseconds", function() {
  callback = createStub();

  videoWrapper.progressEvent(callback, 30);

  expect(callback).toHaveBeenCalledWith(30000);
});

{% endhighlight %}

Does this mean I've given up on writing the tests I want for HTML5 video permanently? Hell no! Each time I update that section of code I'll evaluate whether I can test again. Anybody else who sees that code should do the same.

This brings me to my second point...

#### Test What Changes

Don't add tests to everything, test what changes. Simple. You know what changes a lot? Stuff that's broken! You know what doesn't change a lot? Stuff that works! This limits the tests to the things that really need it.

#### Review the Tests First

You won't get perfect coverage on your initial tests. You'll probably skip the data store, or the UI, or both. That's okay. You'll start extracting logic into a domain model that's not just a reflection of the database. The design will start to look weird. That's also okay - provided the team understands why the hell you're doing it.

That's why you need to review the tests.

I've coached teams that do regular code reviews, as a team, and they would skip presenting the unit tests as part of their development. Why did they do this?

Cause they were skipping the tests entirely of course.

TDDers tend to write very few comments, because our tests should document our code. That means you should be able to present your code from the context of your tests. You should be able to say "this is how it works - see!" and show examples.

In addition be up front about the tests that weren't written. Discuss problems that you ran into. Discuss successes. Explain the parts the were easier to do because you had tests. This is how you get better.

Finally don't let people do a code review without the tests.

#### Higher Level Tests

Sometimes higher level tests are needed so you can break up code into testable bits. Go ahead and write them. Use what ever language is simplest for you to write them in. Use Cucumber, use Selenium, use your test framework, use a bash script I don't care. You're looking for safety so you can make changes.

The point isn't to build a huge amount of integration tests. It's to allow you to make changes without breaking the existing code. Do whatever is necessary to ensure safety and get feedback - FAST.

#### Sprout New Code

When you're making new changes create new code. Everybody always wants to make the greenfield project where everything is perfect. Well every time you use File->New Class you've created your own tiny greenfield project. Write new code and call into it.

#### Add CI

Finally once you have a few tests add this to your build process. Ideally you should stop the build every time the tests fail. This won't happen at first, because people will make mistakes in the tests and they won't trust the build, but eventually you'll see that every time the CI fails it's because you just caught a bug before QA or your customer did. You'll see the number of tests going up and you'll want to make more.  It's fun, and it encourages the good behavior.

Everything I wrote about, except for CI, can be done now, with your next feature. It was probably harder to write 1200 words than it will be for you to write your next test. If your environment is bad now, it will only get better if you start making it better. Bitching never gets you anywhere.

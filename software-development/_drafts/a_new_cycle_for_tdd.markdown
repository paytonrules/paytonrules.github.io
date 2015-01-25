---
layout: ebomb
title: A New Cycle For TDD
---

Earlier this week I stumbled across an entertaining [list of TDD Anti-Patterns](http://stackoverflow.com/questions/333682/unit-testing-anti-patterns-catalogue), and had some fun reading through them. One I liked in particular was this:

>*Second Class Citizens* - test code isn't as well refactored as production code, containing a lot of duplicated code, making it hard to maintain tests.

To a certain extent this happens in every codebase I've ever seen. Test code has a different purpose than production code and as code becomes more complex tests become harder to write. Part of your job as a software developer is to mitigate that, to keep code clean and simple so that others can understand it, but when a system grows it has more dependencies and objects. More stuff is more confusing, and there's only so much we can do to help that.

So when new code is being written the developers have to spend some time understanding the tests. This often involves tweaking the existing tests to see what happens, and finally writing a new test by copying and pasting the previous one. Since the cycle of TDD is supposed to be:

![Alt text](/images/test_drive_refactor.png)

a bad habit develops. The new test is copied and pasted from the old test, the test is made to pass, and the code refactored. Then the next test is copied and pasted from the previous, without any changes. The developer gets on a roll making a bunch of tests that are probably useful at the time, but are going to be hell to understand later. That's why I propose a different cycle:

![Alt text](/images/test_drive_refactor_refactor_test.png)

It's obvious when you look at it, that you should refactor your tests, but it's a step we frequently forget. In fact I would say you shouldn't start with Refactor Test. When you are looking at those tests, trying to make sense of them, clean them up. Don't go too crazy - tests that are overly DRY can be as hard to understand as tests with a ton of duplication - but make sure you do a few things.

#### Rename Mercilessly

Fortunately you already read my [blog](software-development/2015/01/24/one-practice-to-adopt-today.html) about this. Half the time the reason a test is confusing is the names made sense when they were written when the developer had context, and now you don't have that. Rename things to fit.

#### Extract Judiciously

Every test system, except perhaps writing a main function and using assert, will have a `setUp` or `beforeEach` option. This is a tempting place to extract any noise of of the test(s). What's noise? Any setup that is required for the object under test to work but not relevant to the test. For a pseudocode example:

{% highlight java %}

public void testDatabaseSave() {
  database = DB.create(IN_MEMORY);
  loadDatabase(database);

  user = User.new();
  user.save();
  user.reload();

  assertNotNil(user.id);
}

{% endhighlight %}

In this test the database setup is noise. You need an in-memory database, but you don't care about it. There's two guidelines to extracting noise from tests:

* Only put it in `beforeEach` if it's used in every single test.
* Extract it to a function if it is not necessary to understand the test.

The first guideline is self-explanatory, but the second is a bit harder to follow. Let me demonstrate with a counter example:

{% highlight java %}
public void testUserRelations() {
  setupUserDatabase();

  user.addChild(this.child);

  assertEquals(user.childCount, 3);
}

{% endhighlight %}

Again this is highlighted like Java but it's pseudocode. Let's look closely at the test. Notice how the assertEquals checks if the childCount is 3. Why three and not 1? Because something in setupUserDatabase must add two more children. In addition this.child must be setup in setupUserDatabase too, unless it's in a beforeEach, and don't get me started on nested describes. So the second guideline could be phrased by it's counter-guideline:

* If you need to look at the internals of an extracted function to understand a test, consider inlining the function.

The good news about the test, code, refactor, refactor-test cycle is that none of your decisions are permanent. One time you're in a section of code you may want to inline methods, another you may want to extract them. The key thing is that you work to keep tests clean.

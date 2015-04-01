---
layout: ebomb
title: My Boss Won't Let Me Clean Code, Now What?
redirect_from:
  - /
---

I hear it all the time. The lament goes something like this:

> I don't have time for clean code because my deadlines are _insane_! My boss thinks I'm wasting time with all this testing and my coworkers think I'm a perfectionist. Clean code can't happen in my company because everybody is stupid! What do I do now?

If you're test infected the reaction tends to be to evangelize. You start telling everybody that they *should* or *must* write tests, because if they don't they are lazy. Implying your co-workers are lazy and that your boss is a moron rarely ends well, so maybe it's time to start a different approach.

## Empathize

Start with standing in your bosses shoes. If your deadlines are _insane_, which everybody's are, then she's under a lot of pressure to deliver on time and has very little actual control over it. You're now advocating for a practice that sure sounds like it's going take a lot more time. Your boss has probably seen developers (including yOU) "refactor" for weeks on end, and has been a part of huge rewrites that ended up just as crappy as the original product. You probably think it's time to send management a link to [evidence for TDD](http://paytonrules.com/software-development/2015/03/06/evidence-for-tdd.html) but in point of fact trying to convince people to change their mind of something often makes them dig in deeper[^1].

So instead look from their point of view and recognize that in order to write clean code with tests you'll need to be sure it won't take longer. Fortunately you've read the evidence for TDD so you know it won't. So do your job and test your code, without making it a problem for your boss.

Now let's step into your coworkers shoes. Coworkers that are probably smart and have lives and are also under the same _insane_ pressure that you and your boss are, and the last thing they need is more work. No what they need is to get done faster and get on with their lives. TDD will help them with that, but don't talk about it, show them.

## Write Dirt Simple Tests

I go into detail on this approach in [The Guide](http://paytonrules.com/book.html) but ultimately you are responsible for testing your code. You can run it manually and step through the debugger like most developers do or you can run tests. Since you're reading this I don't have to sell you on tests, but I probably have to stop you from adding a lot of overhead. So don't:

* Download a test framework.
* Start evaluating which framework is best.
* Read up on mocking frameworks.
* Pick out your favorite refactoring tool.
* The continuous builder...

This is exactly what your boss is worried about! You're importing yaks precicely so you can [shave them](http://en.wiktionary.org/wiki/yak_shaving). It feels good, it seems like the right way, and it's totally unnecessary. At least for you to write tests.

Instead you are gonna do this:

* Create a main function.
* In your main function call your code.
* Use assert for tests.
* Use [Self Shunt](http://c2.com/cgi/wiki?SelfShuntPattern) and simple fakes for mocking.

This solution means you won't have things like beforeEach or data driven testing. You'll have to hand roll your own features but frankly that's not that hard, and you should not do that right away. You should have a main method that looks something like this:

{% highlight java %}
  public class EmailValidatorTester implements Logger {
    ...

    public void testValidEmail(String email) {
      EmailValidator validator = new EmailValidator(email);
      validator.setBlacklist(blacklist);

      assert (validator.isValid());
    }

    public void testInvalidEmail(String email) {
      EmailValidator validator = new EmailValidator(email);
      validator.setBlacklist(blacklist);
      validator.setLogger(this);

      assert(!validator.isValid());
    }

    ...

    public static void main(String [] args) {
      EmailValidatorTester tester = new EmailValidatorTester();
      tester.testInvalidEmail("");
      tester.testValidEmail("paytonrules@paytonrules.com");
      ...
{% endhighlight %}

This is obviously a snippet with a bit cut out but the basics are there. EmailValidatorTester is the test class and it implements Logger because the EmailValidator needs a logger. It doesn't pollute the source code with some scaaaary testing framework and has no needless complexity. It's easy to get started with and most importantly it is nearly impossible to object to, any more than management could object to using the debugger.

Don't expect anybody else to maintain this, it's your responsibility, and don't try and write tests for uncovered code. Use this to write tests for your code and your bug fixes because you have an ethical obligation. It's simple, it's unobtrusive, and it works.

## Refactor Considerately

The mental feeding frenzy that starts at "my boss won't let me use a testing framework" and ends at "my coworkers are morons" tends to enable a bad attitude. Logic dictates that if you are surrounded by morons then you have to fix *everything that they do!* Of course you aren't surrounded by morons, well probably, just people who value different things than you do. When you refactor follow a few simple guidelines and you should avoid pissing off your coworkers. Refactor:

* ONLY the code you are changing, not random other parts of the code.
* ONLY the code that is tested or to make the code testable.
* Code that won't cause extra work for QA (retesting).

And finally:
* Do the refactoring as you develop and NOT as a seperate step at the end.

Avoid saying "Well I'm all done except for the refactoring," because what everybody else hears is "I'm all done." You refactor as the third ([or fourth](http://paytonrules.com/software-development/2015/01/30/a-new-cycle-for-tdd.html)) step in TDD and not as a seperate step at the end. You need to be considerate to the people you work with and for, and that means turning in the best code you can and not prolonging deadlines so you can "fix" other people's or your own.

Continuous refactoring keeps the boss from feeling the need to reign you in, which your boss needs to do once in a while. When you make refactoring a seperate step you are turning it into gold plating. Gold plating can be dropped, refactoring can't.

## Don't Force This on Others

You can check in these tests, or you can keep them for yourself as your own little test bed, but the important thing is to show other people. Don't force them on others, just demonstrate how you're getting work done. Solve problems with your fellow developers using these tests and they may want to work this way too. Don't start a CI server, don't complain if people don't update your tests, and don't imply everybody in your vicinity is a moron or lazy because you write tests and they don't. Show other people how easy it is and how you can make changes safely and easily. Eventually people will start to come around, but if they don't you still can get your work done the right way.

TDD doesn't work as a company wide initiative, top down, but as a grassroots effort coming from the developers. That's developerS not one developer yelling against the wilderness.

[^1]: See [this study](http://www.dartmouth.edu/~nyhan/nyhan-reifler.pdf) and [this one](http://pediatrics.aappublications.org/content/early/2014/02/25/peds.2013-2365). While neither study is about software development they reach the same conclusion, which is that if you try to convince someone they are factually wrong they will dig in deeper to their original position. Humans are dumb. Including you and me.


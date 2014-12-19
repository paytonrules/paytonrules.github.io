---
layout: ebomb
title: Limiting Mocks with Fakes
---

I saw this on programming.reddit.com the other day, in a converstation about unit testing practices:

> No more than one mock per test? If you're trying to isolate a specific thing, you should mock out everything that's not that thing, right?
> --<cite>[horse\_continuum](http://www.reddit.com/user/horse_continuum)

I answered there, but I wanted to take a moment to expand my answer. The first is the simple answer, that you shouldn't verify more than on mock object. This can occasionally be sneaky. I'll use this example from a psdeudo-ruby:

{% highlight ruby %}
user_mock = make_mock(User)
mailer_mock = make_mock(Mailer)

user_mock.expect(:get_email).and_return("me@me.com")
mailer_mock.expect(:mail).with("me@me.com", "message")

sender = new MailCoordinator(user_mock, mailer_mock)
sender.mail("Message")

user_mock.verify()
mailer_mock.verify()
{% endhighlight %}

This test will run super fast and verify I get the email from the user and send it to the mailer ..buuttt ... it doesn't teach me about the design, it forces the design. There's no real way to make this pass other than getting the email from the user and sending it to the mailer. Refactoring? Nope can't do that. Would break the test. And do I know this actually works? Heck no! I have to actually run the app to be sure my code works. Which means I'm not getting any useful feedback from this test. It's even hard to read the test.

So let's refactor this test a bit. Let's make the assumption that we're going to stick with MailCoordinator taking the two dependencies. In a real situation you'll want to evaluate whether you want the dependencies at all, but let's save that for another email. We're also going to assume that the mailer needs to be stubbed out because it actually sends an email.

So lets look at User first. There's two possibilities here:

* User always accesses the database if you create one.
* User does not require the database just to create one.

The first option isn't usually true, but if it is you can replace user with a stub:

{% highlight ruby %}
    user = make_stub(User, :email => "me@me.com")
    mailer_mock = make_mock(Mailer)

    mailer_mock.expect(:mail).with("me@me.com", "message")

    sender = new MailCoordinator(user_mock, mailer_mock)
    sender.mail("Message")

    mailer_mock.verify()
{% endhighlight %}

Now we're no longer verifying on user, so we're not coupling the test to the exact implementation. We're still dependent on the API of the user, but we're not nearly as explicit about it. In a language with explicit interfaces when that API changes we'll get a compiler error. The test is simpler and easier to read. This is improved, but it's not all the way there.

What if making the User object doesn't have any side effects?

{% highlight ruby %}
    user = User.new(:email => "me@me.com")
    mailer_mock = make_mock(Mailer)

    mailer_mock.expect(:mail).with("me@me.com", "message")

    sender = new MailCoordinator(user_mock, mailer_mock)
    sender.mail("Message")

    mailer_mock.verify()
{% endhighlight %}

It's pretty similar, but there's a huge improvement here in that now we don't have any dependencies on the user's API in the test. If the method to get an email changes its name we'll know immediately, rather than getting a false positive because a stub still had a method called get\_email. This test is no slower than the original, and actually verifies some behavior. We still don't know that an actual mail is sent, but if this is a mailer we've been using for a while we can be reasonably sure.

I would be far more confident shipping the above code, rather than the original test. The moral of this story? The more dumb objects you can make, the simpler your testing will be.

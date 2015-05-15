---
layout: ebomb
title: Build Broken? Stop Using Your Database!
redirect_from:
  - /
---

Your build machine. It's a damn mess. It's broken all the time. It's flaky. It makes developer's sit and wait for _hours_ just to make sure that their code passes, only to find out the build failed because somebody else's code broke it. If you followed the rule of "we don't ship broken builds" you'd never ever ship. So you ship and the customer(s) finds bugs.

Sound familiar?

You aren't alone. Build machines can be extraordinarily difficult to maintain as a project grows, and it actually can become a problem even when a build is small. Here's an example:

{% highlight bash %}
vagrant@vagrant-ubuntu-trusty-64:/vagrant/todo$ time npm test

> todo@0.0.0 test /vagrant/todo
> NODE_ENV='test' mocha --recursive

  User Model
Executing (default): CREATE TABLE IF NOT EXISTS `Users` (`id` INTEGER PRIMARY ...
Executing (default): PRAGMA INDEX_LIST(`Users`) ...
Executing (default): CREATE TABLE IF NOT EXISTS `Tasks` (`id` INTEGER PRIMARY ...
Executing (default): PRAGMA INDEX_LIST(`Tasks`)
Executing (default): INSERT INTO `Users` (`id`,`username`,`createdAt ...
  ✓ can be created
Executing (default): INSERT INTO `Users` (`id`,`username`,`createdAt`, ...
Executing (default): SELECT `id`, `createdAt`, `updatedAt`, `UserId` FROM  ...
Executing (default): INSERT INTO `Tasks` (`id`,`createdAt`,`updatedAt`,` ...
Executing (default): SELECT `id`, `createdAt`, `updatedAt`, `UserId` FROM  ...
  ✓ has many tasks

2 passing (71ms)

real    0m1.564s
user    0m0.404s
sys     0m0.660s
{% endhighlight %}

That's actually the output from a test run for a ToDo list app I'm writing as part of [http://paytonrules.com/book.html](The Guide to Real World TDD). It's 1.5 seconds long which doesn't seem bad but there are TWO tests. TWO! And those log entries about SQL are in the output as well. This build is on it's way to becoming very bad. Your build is probably much much worse.

Fortunately you can do a few quick things.

## Use Objects Not the Database

Fixtures. FactoryGirl[^1]. These two patterns have their place in a testing framework for tests that require the database. But what about tests that require database models from your ORM but never actually test the database.  Do you have tests like this:

{% highlight javascript %}

it("has a full name from its first and last name", function(done) {
  models.User.create({first_name: "Eric", last_name: "Smith"}).then(function(createdUser) {
    expect(createdUser.fullName()).to.equal("Eric Smith");
    done();
  });
});

{% endhighlight %}

This seems like a perfectly reasonable test but look at the `create` call. Does this actually need to hit the database? The `fullName` method probably just concatenates strings. What if you took the database out of the equation?

{% highlight javascript %}

it("has a full name from its first and last name", function(done) {
  models.User.build({first_name: "Eric", last_name: "Smith"}).then(function(createdUser) {
    expect(createdUser.fullName()).to.equal("Eric Smith");
    done();
  });
});

{% endhighlight %}

This may seem obvious, but I've seen teams save HOURS by doing this throughout the codebase. Ruby on Rails apps are notorious for this but anybody can do it. Don't put objects in the database unless you need to. It's slow.

## Wrap Database Objects

If you're using an ORM wrap database objects in their own classes that use your own language and your own domain. I usually call these objects entities. The may seem like a hassle, because this:

{% highlight javascript %}
models.User.create({username: "Eric"}).then(function(createdUser) {
  createdUser.getTasks().then(function(tasks) {
    expect(tasks.length).to.be(0);
  });
});
{% endhighlight %}

...seems so straightforward. But is it really? You're creating a user here and then making sure it doesn't have any tasks. Wouldn't I just write a wrapper that says the same thing.

But of course you wouldn't.

Developers of database frameworks, be it ActiveRecord or Entity Framework or Hibernate, have to solve all things to all people. The only thing they know about your system is that it will use a database, so they have to give you a wide interface that solves every possible problem. On the other hand your system can begin narrowing that interface to features you use. You can also modify the naming convention to better match your problem domain. Finally if you wrap database objects in another object you've taken ownership over that code. Code you own, and by that I mean code where you can change the interface, is code you can mock. So in this case you might write an object like this:

{% highlight javascript %}
entities.User.prototype.getTasks = function(username) {
  models.User.create({username: username}).then(function(createdUser) {
    createduser.getTasks().then(function(tasks) {
      return tasks;
    });
  });
});
{% endhighlight %}

Of course I've now taken a method that was asynchronous and made it synchronous. Maybe that's okay, maybe it's not, but the important things is I the developer of the system made that decision, not the developer who wrote the ORM.

Now in any test that needs a User you can use the User _entity_ and stub all it's methods. Since you control the User entity's interface you can be reasonably certain you're using it correctly. Prefer telling to asking, because it makes your tests easier to mock and more robust.

You'll still have slow tests that use the database on the User entity, because that's the only way you can be sure it works, but you won't need to propagate that slowdown everywhere.

## Don't Mock SQL

A quick no no. I've seen, and I'm embarrassed to admit I've written code that looks like this:

{% highlight javascript %}
it("should select the users from the database where the name is Eric", function() {
  expect(User.select).toHaveBeenCalledWith({name: "Eric"});

  User.findEric();
});
{% endhighlight %}

What exactly is this testing? It's testing I typed what I said I would type. No more. It doesn't tell me if I wrote the right method (is it select?) or the right parameters. This is usually what happens when somebody _doesn't_ wrap a third party dependency like an ORM but wants to speed up their tests. They start mocking the third party dependency directly. Unfortunately this provides no benefit. It doesn't verify you got the code right, and it doesn't validate your design. You're letting the third party API dictate your design. It also makes it harder to refactor. This is the exact opposite of the goals of TDD.

## Your Build Doesn't Have to Suck

Take control of your database, and the code that access your database, and your build can be an asset instead of an impediment. It will give you fast integration feedback multiple times every day.

You don't even have to hate it.

[^1:] If you are unfamiliar, FactoryGirl is a Rails Gem that allows you to easily create objects in the database. It is popular enough in Rails that it's grown to other communities.

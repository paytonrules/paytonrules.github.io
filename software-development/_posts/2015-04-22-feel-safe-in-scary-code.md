---
layout: ebomb
title: I'm Afraid to Change This Code!
redirect_from:
  - /
---

We've all been there before. You're working in your spectacularly complex codebase[^1] and you discover code that looks something like this:


{% highlight java %}
public void OnOk() {
  DatabaseDriver db = new ForeignDB();
  Webservice ws = new Webservice();

  // DON'T DELETE THIS!
  for (int i=0; i < 1000; i++) {
    sleep(1);
  }

  db.open();
  db.sendRawSQL("Update id in TABLE where INNER_JOIN %1", this.CompletedQuery);

  db.close();

  db.open();
  ws.open();

  var retVal = ws.sendTo("http://www.google.com", db.Contents())


  switch(retVal) {
  ... 1000 line case statement ...
  }
  /* Uncomment this code when appropriate
  throw NotImplementedException(); */
{% endhighlight %}

Okay I got carried away when I sent the contents of the database to google, but the rest of this is semi-realistic. We've got code that you're not allowed to delete, code you are supposed to uncomment "someday", databases being sent raw SQL and being left open while we make a webservice call. And even a sleep in OnOK, which is probably called when the user clicks `OK`.

This code is terrifying to change. Even if this was test-driven it's very possible that the tests look like this:

`public void testOnOkSleepsFor1000Seconds`

`public void testRawSQLIsSentToDB`

`public void testDatabaseContentsAreSentToGoogle`

and of course:

{% highlight java %}
/*
Uncomment this test when you uncomment the code.
public void testYouThrowAnException() {
 ...
 }
*/
{% endhighlight %}

These tests are too coupled to the implementation and don't tell you why the code was written the way it was. Take that sleep statement at the beginning. Some of the reasons that was created could be:

* You can't open the database for an unspecified period of time after constructing the DB object.
* The developer was debugging and forgot to take this out.
* It was accidentally copy pasted from another place by mistake. The test was added by another dev who assumed it was needed.
* A developer secretly hides code like this so it can be "optimized" later.

So the reason could be anything from a naivety to malice, but what do you do now when you're supposed to write a feature in that damn case statement. The tests aren't trustworthy, they take forever (THERE'S A SLEEP!), and is super confusing. You need to refactor, but you can't because you're bound to break something. When it comes to code like this you break it, you bought it.

## Make this Visible

For code like this it's probably passed through dozens of hands. Each dev who touched it probably got scared and made the bare minimum changes to make their feature work. They may have complained, but they didn't take any steps to address it. In short they were unprofessional. You can't do that. You also can't announce "This code is shit and I have to refactor it! My story is gonna take 3 months."

Congratulations! You've insulted your coworkers and made your boss think you're stupid. After all they all got features done in this code! Why can't you?

Instead take care of this professionally. Go to your team lead (and QA if your team has it) and point out this code. It is almost certainly a hotbed of bugs (THERE'S A SLEEP! SQL INJECTION!). It needs to be addressed. Find those bugs. They are either in your bug tracking software or the kind everybody "knows" about but has given up on. You can tackle this redesign as part of attacking the bugs.

## Do your new feature

You've found a huge problem in the context of your new story, but your story isn't written yet. Write as much of the feature as you can in new code, using Sprout Method and Sprout Class. Then call your code from the existing code. Try to make the code one or two lines, so it's unlikely to break.

This approach may bother you. You see bad code, you should fix it! The instinct is right but the assumption that it's suddenly your job to fix everything is not. At this point that nasty code reflects how things work, and changes are dangerous. Shipping your feature and _then_ attacking the nasty code both gets the present job done and allows you tackle the new task without creating a rabbit whole.

## Write integration test(s)

You're afraid to change this code, so I'm assuming it either has poor testing or no testing at all. You need to fix that but avoid adding unit tests at this point, especially mock-heavy ones, isn't going to provide any benefit. They will be hard to write and may even make the code harder to change, because the implementation will be reflected in the tests.

The tests you need now are the kind that give you the confidence to make changes. Sweeping changes, like ripping out large chunks of the code, which means you probably need integration tests. Get with the QA people who write integration tests for this code and find out how to execute them, or write your own. Use the database, automate the GUI, make webservice calls whatever. When you start to make these changes you need to have confidence that the changes will not break anything. If you create bugs you more than cancel out any code improvement you might be doing.

Once you have enough tests that you know that if you break anything the tests will catch it, you can start refactoring.

## Start Cleaning

but...

## Ignore the existing unit tests

Yup I said it. Now that you know you what the app is supposed to do, delete terrible code and see what fails. Add that exception back. If you can delete code and the unit test fails but the integration tests don't either:

* Delete the offending unit test.
* Write a unit test the verifies the desired behavior. Don't verify you sleep for 1000 seconds. Write a unit test that verifies you "don't crash by opening the database too soon." and delete the old one.

Code that can't be trusted has tests that can't be trusted.

## Make bigger changes

Don't do all this work and then rename variables. Aim high. Get the code really cleaned.

## Focus on cleaning unit tests

Unit tests give better feedback than integration tests on refactoring. If you can make the unit tests reflect the behavior ( and not the implementation) you can make them useful again.

If you had to choose between making the code "perfect" and making the unit tests "perfect" then fix the unit tests. You can always refactor more later, but only if you have trustworthy unit tests.

## Run the integration tests for a while

Even after your best effort you probably can't completely trust the unit tests or the code yet, because it's history exerts a pressure on the existing codebase that is hard to completely destroy. Keep those integration tests for a while...but not forever.

## Eventually reduce or delete the end to end tests

A dialog box can develop really nasty and hard to change code. It does not require end to end integrations through the GUI. After a month or two, when you know the new code is clean, you can start deleting those integration tests. Those integration tests aren't a best practice, and will eventually become costly.

## Takeaway
When your feature takes forever because you found other people's code and start changing it first, you become the team's "problem." When you ignore the problem you add to it. Instead deliver your feature, and tackle the nasty code with end to end integration tests that can be trusted. Then, eventually, remove the end to end tests.

You'll have improved the code for further generations without impeding your team.

[^1]: I'm still waiting for the team that thinks their code is simple and common. Everybody's app is a snowflake.

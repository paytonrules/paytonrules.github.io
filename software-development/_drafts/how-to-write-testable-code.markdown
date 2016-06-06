---
layout: ebomb
title: Testing Untestable Code
---

When it comes to TDD one of the problems is hard to test or "untestable" code. New and even intermediate practitioners often struggle because standard exercises like "Bowling Game" don't reflect a real world environment. So when they struggle with databases, UIs, crummy code and other they start to wonder if TDD can really work for them.

How do you write more testable code? Do TDD! How do you make TDD easier? Write testable code. Oh bother.

Teaching code is written to be easy to test avoid confusing the student, but when it comes to the real world how do we write testable code?

Let's take a quick example that is an issue, in pusedoRubyJavaScript:

```
function sendFromEmail(fromId, toId) {
  let fromUser = User.find(fromId);
  let toUser = User.find(toId);

  EmailService service = new EmailService();

  service.send("Hello #{toUser.name}," +
    "Welcome to my cool new service. Hope you love it!" +
    "Thanks #{toUser.name}");
}
```

This is pretty simple code by is pretty gnarly to test. One (bad) way people solve this is mock hell.

```
itSendsAnEmailFromAndTo() {
  fromId = 1;
  toId = 2;
  mockFromUser = mock(User, name: "From", id: fromId);
  mockToUser = mock(User, name: "From", id: toId);
  User.stub(:find).with(fromId).andReturn(mockFromUser);
  User.stub(:find).with(toId).andReturn(mockToUser);
  allowAny(EmailService).toReceive("Hello From, Welcome to my cool new service. Hope you love it! Thanks FromP");

  sendFromEmail(fromId, toId);
}
```

Whomever wrote this code was well-intended. They wanted to test, and they knew they wanted to avoid the database and the email server, so they went mock crazy. Unfortunately this code doesn't actually test anything! The developer decided what they wanted to write very specific code, then wrote a bunch of mocks to match it. It's the equivalent of `1.shouldRecieve(:+).with(2).andReturn(1)`.

To fix this identify the actual behavior that needs to be tested. What I see here:

* Finding Users properly (hmmm.....)
* Composing the email
* Sending the email

I'm gonna take on the second one first - composing the email is probably the most important part of the system. Let's start by extracting a method:

```
function sendFromEmail(fromId, toId) {
  let fromUser = User.find(fromId);
  let toUser = User.find(toId);

  EmailService service = new EmailService();

  let message = createMessage(toUser, fromUser);

  service.send(createMessage(toUser, fromUser));}
}

function createMessage(toUser, fromUser) {
  return "Hello #{fromUser.name}," +
    "Welcome to my cool new service. Hope you love it!" +
    "Thanks #{toUser.name}";
}
```

Now createMessage doesn't actually depend on any data. No need to make it private - let's go ahead and write a test for that. You might claim this breaks encapsulation, but I'd argue this doesn't encapsulate anything. You might want to create a new class, but I don't want to go too far yet. At least not until I have tests.

```
itCreatesMessageWithToAndFrom() {
  let fromUser = new User(name: "from");
  let toUser = new User(name: "to");

  expect(createMessage(fromUser, toUser)).to
    eq("Hello #{fromUser.name}," +
    "Welcome to my cool new service. Hope you love it!" +
    "Thanks #{toUser.name}");
}
```

At this point you're probably annoyed with two things. The string should really be a constant, and OH YEAH THAT TEST WILL FAIL WITH A BUG! It turns out the message used the fromUser twice. This is the kind of bug that can happen when your tests are terrible, and I left it in intentionally.

Now that we've refactored the first bit and gotten a bit more under test let's look at our todo list:

* Finding Users properly (hmmm.....)
* Sending the email

I put hmmm next to the users because I have to wonder, why are we finding the users here? Let's refactor the code to use actual users instead of the find function. This reduces the dependencies here, and means you don't need mocks just objects.

```
itSendsAnEmailFromAndTo() {
  mockFromUser = new User(name: "From");
  mockToUser = new User(name: "To");

  allowAny(EmailService).toReceive("Hello From, Welcome to my cool new service. Hope you love it! Thanks To");

  sendFromEmail(fromId, toId);
}
```

Wow that really shrank the test up to be more clear. I fixed the issue where both names were "From" because I could see it. Let's modify the test to use the other function we created:

```
itSendsAnEmailFromAndTo() {
  mockFromUser = new User(name: "From");
  mockToUser = new User(name: "To");

  allowAny(EmailService).toReceive(createMessage(mockFromUser, mockToUser));

  sendFromEmail(fromId, toId);
}
```

So now this test is focused, it only tests sending the email properly. If the createMessage function changes this test stays passing. It's easy to read and fails for one reason. The only object I have is that EmailService isn't injected, but I can live with that for now.

So how do you make your code easier to test?

* Manage your dependencies (the DIP).
* Make sure your functions are focused and only change for one reason (the SRP).

Code that is easier to test is easier to TDD, and vice-versa.





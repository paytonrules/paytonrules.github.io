---
layout: ebomb
title: The Mock Broke Again
---

You've written your big cool feature. You've written every single line with TDD,
and of course the tests pass. You tried out the feature locally, and it worked there
too. Then you deploy it to production - and it breaks immediately. Humiliated you
start debugging the problem and you see something like this (in ES6 flavored JavaScript):

```javascript
it("saves a user to the database", () => {
  let database = new FakeDatabase();
  let user = new User(database);

  user.save();

  expect(database.find(user.id)).toEqual(user);
});
```

You investigate further and find this:

```javascript
class User {
  ...
  save() {
    this.database.save(this);
  }
  ...
}
class FakeDatabase {
  ...
  save(object) {
    this.inMemoryStore[object.id] = object;
  }
  ...
}

class Database {
  ...
  save(id, object) {
      // Doesn't really matter, since this is never hit
  }
  ...
}
```

Look at the two save methods - the signatures don't match! And since you read that
a unit test doesn't hit the database you're never testing that method![^1] Even
your dev environment uses the in memory version. Now you're embarrassed, you're team
is pissed at you, and your boss is wondering why you wrote all these tests if your
code doesn't even fucking work!

## The Cop Out

Pure "Mockist" or "London School" TDD practitioners will often say that "it's not
about testing" and then point out you should have had integration tests around your
setup. I call this about 50% bullshit. First of all the mockist folks evolved "Classical"
or "Detroit" TDD from the work of Beck and others, and for those guys TDD was absolutely
about tiny tests that validated both design and correctness[^2]. Finding, correctly,
that the Detroit school had maintenance problems as a system grew they introduced
[mock objects](http://www.ccs.neu.edu/research/demeter/related-work/extreme-programming/MockObjectsFinal.PDF)
as a way to promote isolation and loose coupling. Then they began emphasizing the
design aspect of TDD, and downplaying correctness to the point where suddenly
correctness didn't matter anymore.[^3]

It's bullshit. Correctness still matters, ultimately _more_ than design. So don't look
at the bug at the beginning of this blog and claim it doesn't matter. Furthermore full integration
take time and rarely cover as much code as unit tests do. Because they are so expensive
and often written by other people who deserve our respect, we owe them our best effort
to fix this problem. Fortunately there are a few fixes.

## Use a Mocking Framework that checks

In the example above I wrote a fake database. Well I wrote a bunch of psuedo-JavaScript
in a blog but we can assume I wrote an actual fake database. Work with me here.

I could have used a mocking framework like [sinon.js](http://sinonjs.org/). Sinon.js
does a certain amount of checking to make sure you don't mock a function that doesn't
actually exist. In other dynamic languages tools like this [exist](https://github.com/JoshCheek/surrogate)
and of course in static languages you should mock an actual interface, but the extremely
dynamic nature of JavaScript means you need to be cautious with this approach. For
instance Sinon can't reliably catch the error above, because JavaScript itself doesn't
actually have function arity. So while a good mocking tool is helpful, it is not a
silver bullet.

## Contract Tests

If you've got a fake be it a database, webserver, or other, and it needs to match
a real object identically you can write a series of tests that verify both the fake
and real versions have the same API and preferably with matching behavior.

For instance if you have a database object with a method that does this:

```javascript
class Database {
  ...
  select(filter) {
    dbConnection.open();
    let results = dbConnection.execute(`SELECT ${filter} FROM THAT_TABLE`);
    dbConnection.close();
    return results;
  }
  ...
}
```

Yes that code is terrible. It's insecure, it's broken, it's stupid. You and I both
know that's not the point of the example, don't be pedantic.[^3]

That code probably has a test or more, that looks like this:

```javascript
describe(Database)

  it("should select from a database", () => {
    let database = new Database();
    database.update('THAT_TABLE', {filter: "test value"});

    results = database.select("filter");

    expect(results).toEqual([["test value"]]);
  });
```

So you test that an update is reflected in a select. Seems legit. Now why not take
that code and _execute it on your fake_. Writing a bunch of duplicate tests for your
fake may seem redundant, and it is, but instead you should identify all the the tests
that are truly black box and rerunning them against your fake. This will remove
tests that look like this:

```javascript
it("should update", () => {
  let database = new Database();
  database.update('THAT_TABLE', {filter: "test value"});

  dbConnection.open();
  let results = dbConnection.execute("SELECT * from THAT_TABLE");
  dbConnection.close();

  expect(results).toEqual([["test value"]]);
});
```

But typically only the first couple tests of big classes (like those that you'd fake)
will be like this. The rest will probably be able to be rewritten to be black box
with little trouble. Now you might say "but what if the class is provided by a third
party?"

Well you forgot my first rule. _Don't mock what you don't own!_ You make sure you
have a wrapper object (or objects) that reduce the broad interface a third party
API will provide to the smaller amount you actually need. You test drive that using
the third party dependency, then you make sure your fake passes those tests.

## Targeted Integrated Tests

I ranted a bit at the beginning about end-to-end integration tests, which is a typical solution to this problem, and I stand by that. Integration tests on every part of the system are slow, hard to write, prone to failing for the wrong reason, and expensive.

However in the event you get bugs in the same areas nothing is preventing you from writing targeted integration tests that validate the real object. You can often do this by taking a few places where you stub out a dependency, like the database, and replace them with the real object. You can either do this in a separate run or as
part of your normal unit tests, provided that the real object can pass reliably.

## Mock Fun

Mock Objects can be essential in using TDD on a complex real system. A real system
has dozens, hundreds maybe thousands Since we're
not developing the Bowling Game it's vital that we are able to get feedback on our
code quickly, and Mocks/Fakes/Doubles are vital in this regard. They are also
dangerous, particularly in languages that don't help you with a compiler. With a few
tricks above you should be able to take targeted approach and fix areas where Mocks
are giving you trouble.


[^1]: Just a reminder - when Michael Feathers wrote his definition of a Unit Test and said "If it hit's the database, it's not a Unit Test" he also added, "That doesn't mean that tests that [hit the database] aren't valuable or shouldn't be written, just that they are not Unit Tests."
[^2]: "Clean Code that works -- now" That's the first line of the back cover of Kent Beck's [TDD by Example](http://www.amazon.com/Test-Driven-Development-Kent-Beck/dp/0321146530/ref=sr_1_1?ie=UTF8&qid=1446473371&sr=8-1&keywords=test+driven+development). 
[^3]: I am _drastically_ oversimplifying the situation and history here and portraying an adversarial relationship that doesn't exist. While I do think that many mockists dismiss correctness as an important feature of TDD, I don't think any don't care if their stuff works. I just think it's gone too far. I would provide examples, but I don't want to be seen as calling out developers individually. For explanations of the differences between both schools see [here](http://programmers.stackexchange.com/questions/123627/what-are-the-london-and-chicago-schools-of-tdd).

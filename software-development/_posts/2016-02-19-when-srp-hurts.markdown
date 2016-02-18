---
layout: ebomb
title: You're getting SRP Wrong
---

The Single Responsibility Principle, or SRP states that a every module or class in a system should have "one reason to change". Unfortunately that often gets misread as "do only one thing" and that can lead to massive problems in your design. Let's take a look at an example:

``` javascript
var Router = function(dtoFactory, serializerFactory) {
  this.createUser = function(params) {
    var dto = dtoFactory();
    dto.userName = params.userName;
    dto.password = params.password;
    serializerFactory().serialize(dto);
  };
  return this;
};

var Serializer = function(dataStore) {
  this.serialize = function(dto) {
    dataStore.insert(dto.username, dto.password);
  };
  return this;
};
```

The code for this isn't particularly straightforward. What we have here is a `Router`, presumably for some kind of web application, that is constructed with a `dtoFactory` and a `serializerFactory`. These two functions are used to create DTOs (Data Transfer Objects) and Serializers naturally. The `Serializer` then inserts objects into the `dataStore` which is itself passed into the constructor for the serializer. Now because the `dataStore`, `dtoFactory` and `serializerFactory` are all injected we don't have to define them here. This code only depends on their interfaces.

Now the tests for these two objects might look like this:

``` javascript
describe("The Router", function() {

  it("creates a DTO object", function() {
    var dto = {};
    var dtoFactory = function() { return dto; };
    var fakeSerializer = {
      serialize: function() {}
    };
    var serializerFactory = function() {
      return fakeSerializer;
    };
    var router = new Router(dtoFactory, serializerFactory);

    router.createUser({
      userName: "me",
      password: "insecure"
    });

    assert.equal(dto.userName, "me");
    assert.equal(dto.password, "insecure");
  });
```

I've only reproduced one test because they are so long. Long tests, with complicated setup, are a smell. Anybody that uses your router needs to provide the two dependencies and is likely to find it cumbersome to work with. Furthermore nobody is likely to actually change what the dependencies are, in particular it's always going to be the same `dtoFactory`. Keep this in mind.

You can see from the tests that the objects truly only do one thing. Now ask your self what you have to do to order a add another field to the router, like first name. Well you're going to need to change `Router` and whatever the DTO is and `Seriaizer`, which means modifying tests for all those things. This is a classic example of how over-designing a feature can lead to problems. In fact it's the exact kind of thing skeptics will point to in order to argue for the status quo of large objects without tests. In a sense, they have a point.

## Why SRP?

The SRP exists to prevent fragility and rigidity in system development. That's a fancy way of saying that code that does too much is hard to change. If you do change it, it breaks (fragility) so you don't change it (rigidity). If you forget the reasons why we have this principle, if you instead treat it as a _rule_, you're likely to create systems that are just as rigid and fragile than you would have if you hadn't otherwise heard of the principle.

Now let's look at the example above. As you can see almost all the objects change for one reason, but it's the _same_ reason. They change in parallel and as such some things should probably merge. Yes the new objects might do more than one thing but they will only change for one reason, satisfying the SRP but more importantly making it easier and safer to change the system.

## What to Look For

You can almost always identify this problem during estimation. No really. When a dev says "well to add that new feature I've gotta add to class [A], object [B] and switch statement [C]" you might have a problem. More practically look for places in the codebase that change simultaneously all the time. It's likely that the reason to split the object into two ore more objects made sense, and had a good reason, but was probably split along the wrong lines. Merge the objects together, and try again, this time spitting across true responsibilities.

This scenario usually happens when you don't listen to the tests. Perhaps you heard a talk on [Screaming Architecture](https://blog.8thlight.com/uncle-bob/2011/09/30/Screaming-Architecture.html) and decided in advance to design your entire system this way, or you just became so focused on SRP you couldn't see the forest from the trees. So you decide on a design in your head and even though the tests are telling you "WRONG WRONG WRONG" you're hell bent on proving it's right. If you find yourself justifying this to coworkers a lot, you might need to rework your system.

## Fix

The SRP should be applied _when_ a system changes, and not before. Early abstraction can be as dangerous as no abstraction. Oftentimes the solution here is to actually inline everything. So let's start with that:

```javascript
var Router = function() {
  this.createUser = function(params) {
    var serializer = new Serializer();
    serializer.serialize(params.userName, params.password);
  };
  return this;
};
```

Almost there, let's go farther.

```javascript
var Router = function() {
  this.createUser = function(params) {
    var dataStore = new DataStore();
    dataStore.insert(params.username, params.password);
  };
  return this;
};
```

Well that's a whole lot simpler than what we had. There is a problem here though, in that in order to test the `Router` we actually have to test what the `DataStore` saves to. I don't really want to do that, and now I'm willing to introduce an abstraction.

```javascript
var Router = function(dataStore) {
  this.createUser = function(params) {
    dataStore.insert(params.username, params.password);
  };
  return this;
};
```

Now it's arguable that the insert method should be more generic, that it should take an object so that the Router is more insulated from change, but I don't want to make that change yet. This is good enough for now. What do the tests look like?


```javascript

describe("The Router", function() {

  it("saves the username and password to the data store", function() {
    dataStore = {
      insert: function(username, password) {
        this.username = username;
        this.password = password;
      }
    };
    var router = new Router(dataStore);

    router.createUser({
      username: "me",
      password: "insecure"
    });

    assert.equal(dataStore.username, "me");
    assert.equal(dataStore.password, "insecure");
  });
});
```

It ain't perfect but it's a whole lot simpler. We've gotten rid of three objects and made the code easier to read to boot. Remember if premature optimization is the root of all evil, then premature abstraction is the tree. Or something. Metaphor is hard.

[^1]: https://drive.google.com/file/d/0ByOwmqah_nuGNHEtcU5OekdDMkk/view

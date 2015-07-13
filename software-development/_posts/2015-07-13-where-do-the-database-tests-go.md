# Should You Really Ignore Your Database?

Recently I wrote about getting your unit tests [off your database](http://paytonrules.com/software-development/2015/05/15/im-just-a-build-machine-and-i-dont-work.html) for the sake of your build. In particular I wanted to address two problems that happen on build machines:

* Builds fail because of "stray" data in the database.
* Builds fail because of parallel data in the database.

The problem presents itself when hundreds or even thousands of tests directly depend on the database. A huge part of fixing this problem is getting off the database any place it isn't absolutely necessary, and it's probably not as necessary as you think. Go read the article for more.

I got a question back from this, and I'd like to address it. Paraphrasing:

> I don't get what the difference is between tests that require your ORM objects and tests that require your database.

This is an important question so let's take a tour of the differences.

## Tests That Require Your Database

Let's take a look at a classic example, a TODO list. Creating a task might have a test that looks like this:

``` javascript
describe("todolist", function() {
  // Note: This is just a sample theoretical ORM. Don't try this at home.
  it("should create todo item", function() {
    TodoController.create({title: 'Write this blog'});

    expect(Todo.find({where: {title: "Write this blog"}})).toExist();
  });
});
```

This code tests whether a Todo is created. On a simple project you probably just use an ORM and create the object in the controller. It's one line, and that's completely fine. Use your database. Later as your TODO list program grows you're going to create a large number of reports. But later you may have a much more complicated system. Let's say you have a screen that looks something like this:

![Dialog](https://www.evernote.com/l/AAY2iEJMZyRHSqSmLgebNTWRy6i5J73lX-gB/image.png)

You've got usernames, priority, a deadline, etc. It's gonna grow too of course. So you wisely wrap this in a presenter object that takes the database model.

``` javascript
var presenter = TodoPresenter.create(todo);
```

Good on you! Now what about your tests?

``` javascript
describe ("Todo Presenter", function() {

  it ("displays the name by joining the first and last name", function() {
    var todo = Todo.create({firstName: "Eric", lastName: "Smith"});
    var presenter = TodoPresenter.create(todo);

    expect(presenter.fullName).toEqual("Eric Smith");
  });
});
```

AHH! Do you see the problem? The ToDo is being created even though there's no reason for it. And of course you probably don't just have one test that looks like this, you have hundreds. In fact this isn't uncommon:

``` javascript
describe ("Todo Presenter", function() {

  it ("displays the name by joining the first and last name", function() {
    var todo = Todo.create({firstName: "Eric", lastName: "Smith"});
    var presenter = TodoPresenter.create(todo.id);

    expect(presenter.fullName).toEqual("Eric Smith");
  });
});
```

See the difference? Now I'm passing the id to the presenter, so it can then do a find on the todo item. Gah! If you parallelize your tests this has multiple points of failure on a build, and it's even slower on the actual system! Plus it inhibits refactoring when you start passing keys everywhere. If you pass an object you can replace that object with another that satisfies the same interface, but a key is a key is a key. Even worse:

``` javascript
describe ("Todo Presenter", function() {
  it ("displays the name by joining the first and last name", function() {
    var todo = TodoFactory(:eric);
    var presenter = TodoPresenter.create(todo);

    expect(presenter.fullName).toEqual("Eric Smith");
  });
});
```

Now I'm using a Factory to create a known Todo in a fixture ….somewhere… with some data. Some data that could be changed for any individual test anywhere that has nothing to do with your test. It's a lazy approach honestly.

## Too Easy?

Probably, but I've seen teams save HUGE amounts of time in their build by getting rid of patterns like these. Hours, not minutes, and it limits the problematic tests to those that _actually_ require the database. Sometimes when you're trying to find a needle in a haystack, it helps to shrink the haystack.

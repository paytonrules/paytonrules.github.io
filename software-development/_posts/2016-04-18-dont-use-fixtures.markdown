---
layout: ebomb
title: Please Don't Use Fixtures
---

Fixtures are a really attractive feature, particularly for developers that have been doing TDD for a little while and are starting to see ugly tests. The first tests you write using fixtures will be simpler and easy to read but over time they make tests slow, confusing and brittle. They are a bad idea.

What's a fixture? Since this is software there are naturally several definitions but what I'm referring is any testing tool that allows you to setup test data in a seperate file than the tests themselves. They take tests that might look like this:

```javascript
describe ('todo list modal', function() {
  it ('inserts an item into the list', function() {
    var element = document.createElement('div');
    element.id = 'todo-list';
    document.body.appendChild(element);

    insertTodo("write the rest of this app");

    var firstTodoItem = document.querySelector('.todo-item');

    assert.equal('write the rest of this app', firstTodoItem.innerHTML);
  });
});
```

and turn them into this:

```javascript
import fixture from 'specs/fixtures/todolist.html!text';

...

it ('inserts an item into the list', function() {
	loadFixture(fixture);
	insertTodo("write the rest of this app");

	var firstTodoItem = document.querySelector('.todo-item');

	assert.equal('write the rest of this app', firstTodoItem.innerHTML);
});
```

The TodoList html file is:

```html
<ul id='todo-list'>
</ul>
<button>New Todo</button>
```

In this example we're loading a known DOM tree onto a web page, because this example is in JavaScript, but another common use for test fixtures to load database data quickly into the database. This appeals to us as developers because it's DRY. The problem is that test data is frequently tightly coupled to the test itself. Let's take the test above and add another test case.

```javascript
it ('deletes a todo list item', function() {
	loadFixture(fixture);

	deleteTodo("Existing Todo");

	var todoItem = document.querySelector('.todo-item');
	assert.deepEqual("", todoItem.innerHTML);
});
```

This test actually passes on the first try, which is bad in a TDD cycle. That's because nothing is called "Existing Todo". I could add a todo to the tests, but in the spirit of keeping tests small and using fixtures let's update the fixture. Where's that at? Oh yes `specs/fixtures/todolist.html`. Let's add the todo item:

```html
<ul id='todo-list'>
  <li class='todo-item'>Existing Todo</li>
</ul>
<button>New Todo</button>
```

Okay great now my second test is failing and - wait what about my first test?

```bash
todo list modal
inserts an item into the list ‣
AssertionError: "write the rest of this app" == "Existing Todo"
    at Context.eval (specs/example-test.js!transpiled:40:18)
deletes a todo list item
```

It's also failing! No code is broken, yet kaboom. The way to fix this is to change the first test, but why should I be looking at the first test anyway. In fact to make this test fail properly I had to:

* Write the test
* Update the fixture
* Fix the first test to account for the new fixture data

The TDD cycle is meant to be Test, Drive, Refactor but this is more like Test, Futz With Tests, Maintennance, Forget what the hell I was doing in the first place. It sucks.

I should be able to write my next unit test in a self-contained way. It should not be affected by other tests, and I shouldn't have to understand a bunch of unrelated tests just to write the new code. So how do we fix this code? Well start by making the test WET instead of DRY - allow the duplication.

```javascript
describe ('todo list modal', function() {
  it ('inserts an item into the list', function() {
    var todoList = document.createElement('ul');
    todoList.id = 'todo-list';
    document.body.appendChild(todoList);
    insertTodo("write the rest of this app");

    var firstTodoItem = document.querySelector('.todo-item');

    assert.equal('write the rest of this app', firstTodoItem.innerHTML);
  });

  it ('deletes a todo list item', function() {
    var todoList = document.createElement('ul');
    todoList.id = 'todo-list';
    document.body.appendChild(todoList);
    insertTodo("Existing Todo");

    deleteTodo("Existing Todo");

    var todoItem = document.querySelector('.todo-item');
    assert.equal({}, todoItem);
  });
});
```

At the top of each test go ahead and insert the todo list. At this point some of you are screaming that I haven't cleaned up the todo list between DOM tests. That's true, and we need to fix it.

```javascript
var todoList;

beforeEach(function() {
	todoList = document.createElement('ul');
	todoList.id = 'todo-list';
	document.body.appendChild(todoList);
});

afterEach(function() {
	document.body.removeChild(todoList);
});

it ('inserts an item into the list', function() {
	insertTodo("write the rest of this app");

	var firstTodoItem = document.querySelector('.todo-item');

	assert.equal('write the rest of this app', firstTodoItem.innerHTML);
});

it ('deletes a todo list item', function() {
	insertTodo("Existing Todo");

	deleteTodo("Existing Todo");

	var todoItem = document.querySelector('.todo-item');
	assert.equal(null, todoItem);
});
```

I've taken the duplicated code and put it into a `beforeEach`. Now you might argue that `beforeEach` is no better than a fixture, as it has some of the same problems. I wouldn't object if you decided to add a helper function the two tests share, but I'd argue that `beforeEach` has advantages that a fixture doesn't. The entire setup is in the test itself, no switching between files and no searching through the codebase for said file. The second is that this setup can't unintentionally or accidentally infect other tests. Fixture files can be shared across tests, and the benefits of that are far outweighed by the negatives. There's just one rule about a `beforeEach` - everything in that `beforeEach` (or `setup`) must apply to every single method in the test suite. Fortunately this is easier to see when you're doing the work manually.

So now that we've duplicated the code we still have one failing test - the right one git rm that fixture file.

I think this version of the code is easier to understand and works better in isolation. This is why unless you have to, avoid fixtures.

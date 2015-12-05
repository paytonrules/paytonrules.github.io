---
layout: ebomb
title: UI hard? Write it last.
---

TDD on a UI can be extremely difficult. UI's change constantly, they've got strange interfaces that aren't easily mocked, and most importantly tests don't provide they kind of fast feedback they do on back-end code. Specifically you don't really know if you got a UI right until you see it. That leads to a Workflow where you write the code to see the change in the UI, then write a test for it. Then when you need to update the UI you update it first, then fix any broken tests.

This approach is much better than abandoning testing entirely, but by testing after we lose many benefits from TDD such as design feedback and ensuring code coverage. On the other hand one of the primary reasons to use TDD is fast feedback, and if looking at the UI is faster then we should use that. How do we get both?

We write the UI last.

## What?

We all know to separate presentation from the UI layer. That's why we have patterns like MVC, MVP, MVVM, and my favorite MVVMVPM. Okay I made that last one up. The point is we have these patterns, and frameworks to encode those problems, but as long as we're thinking in view we're going to end up writing view code everywhere. Let's take a famous example, the Bowling Game:

![A Bowling Scoreboard](/images/bowling_score.png)[^1]

Normally when we do this kata we end up with one class that calculates the score, with no dependencies. But that's not how the real world works. In the "Real World" we have a computerized scoreboard that is overhead or at a table, and it updates as you bowl. For the sake of simplification we'll assume you have a web form that you enter the pins you knocked down into, and once you do it updates a score like the one above. We'll also assume you call some object called `BowlingGame` with `roll` and the number of pins you knocked down, then query it for the current score. This means you'll end up with something like:

![Design](http://yuml.me/d4b32daa)

I think it's worthwhile to note that I've put interfaces in the system, even though JavaScript doesn't support explicit interfaces I like to work as if they do. The clients depend on their interfaces, not the concrete object. Of course if you look closely this means that the system technically has a circular dependency. This means it's important, when changing this code later, to remember the intended interfaces. I'll try and make those interfaces visible through naming. Now you would start the tests with something like this:

```javascript
it("rolls a ball on the model", () => {
  let view = new FakeView();
  let cont = new BowlingController(view);
  let game = new BowlingGame();
  cont.game = game;

  cont.roll(10);

  expect(cont.game.score()).toEqual(10);
});
```

The goal is to write as many tests as you can without manipulating the DOM or making Ajax calls. That means interacting with the view exclusively through method/function calls, or even observers, and it means not binding your models to your Ajax calls as most frameworks do. When you're done you can wire your view to your controller, and then it is perfectly acceptable to write tests after or to "fiddle" without tests.

TDD your behavior, tweak your GUI. And if you do your GUI last you'll already know the behavior works.

[^1]: Borrowed from this git repo: https://github.com/hontas/bowling-game-kata - which is not my own.

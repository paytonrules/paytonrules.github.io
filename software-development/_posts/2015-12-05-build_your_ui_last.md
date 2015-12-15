---
layout: ebomb
title: UI hard? Write it last.
---

TDD on a UI can be extremely difficult. UI's change constantly, they've got strange interfaces that aren't easily mocked, and most importantly tests don't provide they kind of fast feedback they do on back-end code. Specifically you don't really know if you got a UI right until you see it. That leads to a workflow where you write the code to see the change in the UI, then write a test for it. Then when you need to update the UI you update it first, then fix any broken tests.

This approach is much better than abandoning testing entirely, but by testing after we lose many benefits from TDD such as design feedback and ensuring code coverage. On the other hand one of the primary reasons to use TDD is fast feedback, and if looking at the UI is faster then we should use that. How do we get both?

We write the UI last.

## What?

We all know to separate presentation from the UI layer. That's why we have patterns like MVC, MVP, MVVM, and my favorite MVVMVPM. Okay I made that last one up. The point is we have these patterns, and frameworks to encode those patterns, but as long as we're thinking in terms of view elements (like the DOM) we're going to end up writing view code everywhere. We need try and thing in terms of what the business rules are for that view, instead of the particulars of the view itself. Let's take a famous example, the Bowling Game:

<img style="max-width: 100%;" alt="A Bowling Scoreboard" src="/images/bowling_score.png" />

Normally when we do this kata we end up with one class that calculates the score, with no dependencies. But that's not how the real world works. In the "Real World" we have a computerized scoreboard that is overhead or at a table, and it updates as you bowl. For the sake of simplification we'll assume you have a web form that you enter the pins you knocked down into, and once you do it updates a score like the one above. We'll also assume you call some object called `BowlingGame` with `roll` and the number of pins you knocked down, then query it for the current score. This means you'll end up with something like:

![Design](http://yuml.me/d4b32daa)

I think it's worthwhile to note that I've put interfaces in the system, even though JavaScript doesn't support explicit interfaces I like to work as if they do. The clients depend on their interfaces, not the concrete object. Of course if you look closely this means that the system technically has a circular dependency, which we'll get around by making sure to inject our dependencies instead of explicitly creating them. We'll also want to make sure our naming reflects a dependency on an interface and not on the concrete object. Here's a first test:

```javascript
it("rolls a ball on the model", () => {
  let view = new FakeView();
  let game = new BowlingGame();
  let cont = new BowlingController(game, view);

  cont.roll(10);

  expect(cont.view.updatedScore).toEqual(10);
});
```

The BowlingController is what doesn't exist and it's what we're testing here. Note how we have a fake view, but a real game as the model. I could do this with multiple mocks but I know the `BowlingGame` model isn't dependent on any third party code and is fast so there's no real reason to make a mock here. Let's make that pass:

```es6
class FakeView {
  constructor(game, view) {
    this.updatedScore = 0;
  }

  updateScore(score) {
    this.updatedScore = score;
  }
}

class BowlingController {
  constructor(game, view) {
    this.view = view;
  }

  roll(pins) {
    this.view.updateScore(pins);
  }
}
```

It's a little more than I'd like to write to make one test pass, but I've got a controller updating a view - a dumb one. If you'd like you can use an observer here, go for it, but do a simple solution first. Continuing until we finish I get:

```javascript
describe("BowlingGame Controller", () => {
  let view, game, cont;

  beforeEach(() => {
    view= new FakeView();
    game = new BowlingGame();
    cont = new BowlingController(game, view);
  });

  it("updates the view on the first roll", () => {
    cont.roll(10);

    expect(cont.view.updatedScore).to.eq(10);
  });

  it("updates the view with the updated score after multilpe rolls", () => {
    cont.roll(1);
    cont.roll(1);

    expect(cont.view.updatedScore).to.eq(2);
  });

  it("notifies the view if the roll is < 0", () => {
    cont.roll(-1);

    expect(cont.view.error).to.eq("Invalid Roll -1");
  });

  it("notifies the view if the roll is > 10", () => {
    cont.roll(11);

    expect(cont.view.error).to.eq("Invalid Roll 11");
  });
});

class BowlingController {
  constructor(game, view) {
    this.game = game;
    this.view = view;
  }

  roll(pins) {
    if (this._isValidRoll(pins)) {
      this.game.roll(pins);
      this.view.updateScore(this.game.score());
    } else {
      this.view.sendError(`Invalid Roll ${pins}`);
    }
  }

  _isValidRoll(pins) {
    return pins >= 0 && pins <= 10;
  }
}
```

It's a pretty simple implementation, and it probably won't be perfect when I put a View on it, but it's damn close. If I was using react I could set the score property or set the error property. If I'm not using a framework, my view can do my DOM manipulation. I could manipulate an Ember component. I can pretty much do whatever I want and I have my behavior decoupled from my view. If need be, I'll write integrated tests for my view, but I was able to practice TDD for the majority of the code.

## TDD in a GUI

The goal is to write as many tests as you can without manipulating the DOM or making Ajax calls. That means interacting with the view exclusively through method/function calls, or even observers, and it means not binding your models to your Ajax calls as most frameworks do. When you're done you can wire your view to your controller, and then it is perfectly acceptable to write tests after or to "fiddle" without tests. There is no assert pretty after all.

TDD your behavior, tweak your GUI. And if you do your GUI last you'll already know the behavior works.

[^1]: Borrowed from this git repo: https://github.com/hontas/bowling-game-kata - which is not my own.

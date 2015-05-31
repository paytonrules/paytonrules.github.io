---
layout: ebomb
title: Simple Mock Objects in Go
redirect_from:
  - /
---
And almost any other language...

## I Don't Have a Mocking Framework!

Let me paraphrase what I read on a golang-nuts thread:

_Go doesn't have a built in mocking framework, and gomock is not mature enough for production! When will we be able to do TDD in Go?_

C'mon man. Of COURSE you can do TDD without a mocking framework. People do that every day. Gomock is a mocking framework, not an HTTP server, which means "mature enough for production" is a much lower bar to clear. Finally you can do TDD in Go right now, and you can do it without using gomock at all if you don't like it.

The overall problem here is the attitude of the developer asking the question. "I do not have these things - provide them for me or I will skip TDD!" This dev likely isn't lazy or stupid, Go is an emerging language and isn't likely to attract either of those types, but they sure are acting it. My irritation aside the truth is this question was probably written not of malice, but of habit. Developers coming from different environments, particularly corporate sponsored ones like C#, are used to having the "official" tools handed to them. When they don't exist, they wait for them, and that's just not acceptable.

I've ranted long enough. Assuming that gomock is the only mocking framework available and that there's no way to make it palatable, is that a valid reason to avoid TDD? Of course not. Let's look at a Go example where we write our own fake collaborators.

## Writing Your Own "Mocks"
Let's go through one of my favorite examples - A Game Loop[^2]. Almost every video game has the same basic loop:

{% highlight golang %}
while (true) {
  processInput();
  update();
  render();
}
{% endhighlight %}

This is a terrible game loop, because it doesn't take into account frame rates or the time for each loop for physics, but for some simple games it actually works. Let's see how we could test drive this algorithm.

Let's start with a first test:

{% highlight golang %}
package gameloop

import "testing"

func TestLoopUpdatesOnStart(t *testing.T) {
  gl := &GameLoop{}

}
{% endhighlight %}

That doesn't compile until I create a GameLoop object which I'm going to do. I don't want this email to reach 1000 pages like my last article on this so I'm going to skip over the very simple steps from now on. So the first real test is:

{% highlight golang %}
func TestLoopUpdatesOnStart(t *testing.T) {
  game := &PhonyGame{}
  gl := &GameLoop{Game: game}

  gl.Update()

  if true != game.Updated {
    t.Error("Expected game to be updated, but it wasn't")
  }
}
{% endhighlight %}

Line 46 creates a pointer to `PhonyGame` with no parameters. What's `PhonyGame`?

{% highlight golang %}
type PhonyGame struct {
  Updated bool
}
{% endhighlight %}

Well where did that come from? Some sort of magic mocking framework? Maybe I forgot to show you go get? Um ..no.

{% highlight golang %}
func TestLoopUpdatesOnStart(t *testing.T) {
  …
}

type PhonyGame struct {
  Updated bool
}
{% endhighlight %}

Yes it's an object, well a struct. A struct with a boolean value that represents when Update is called. How do we set it?

{% highlight golang %}
func (g *PhonyGame) Update() {
  g.Updated = true
}
{% endhighlight %}

This is of course right under the PhonyGame struct definition. All I am doing is creating a fake object that gets updated, but what about the real code? Well:

{% highlight golang %}
type Updater interface {
  Update()
}

type GameLoop struct {
  Game Updater
}

func (g *GameLoop) Update() {
  g.Game.Update()
}
{% endhighlight %}

Updater is a terrible name, but I haven't thought of anything better. What's it do? It updates. The GameLoop object operates on a Game object of type Updater, which is an _interface_. That interface is implemented by the PhonyGame object in my tests. This is one of the ways that Go really shines. The [Interface Segregation Principle](http://www.objectmentor.com/resources/articles/isp.pdf) strongly implies that the client drives the interface, I like to say the client "Owns" the interface. Well in Go you can define an interface anywhere and if an object conforms to that interface it just works without any "implements" directive. This approach pairs the interface with the client that uses it, which is what you should really be doing in your code regardless of language.

What does that mean? Well it means I can test my game loop by using fake objects I create in my test, as long as they implement my interface(s). The example I have is pretty useless, so let's extend it a little. The game should stop updating when it's over, but should update and draw on each loop. Let's write those tests:

{% highlight golang %}
func TestLoopUpdatesOnEachUpdate(t *testing.T) {
  game := NewPhonyGame()
  gl := &GameLoop{Game: game, Canvas: game}
  game.SetTurnsUntilGameOver(1)

  gl.Start()

  AssertTrue(t, game.Updated())
}

func TestLoopDrawsOnEachUpdate(t *testing.T) {
  game := NewPhonyGame()
  gl := &GameLoop{Game: game, Canvas: game}
  game.SetTurnsUntilGameOver(1)

  gl.Start()

  AssertTrue(t, game.Drawn())
}

func TestLoopDoesntUpdateWhenTheGameIsOver(t *testing.T) {
  game := NewPhonyGame()
  gl := &GameLoop{Game: game, Canvas: game}
  game.SetTurnsUntilGameOver(0)

  gl.Start()

  AssertFalse(t, game.Drawn())
  AssertFalse(t, game.Updated())
}

func TestLoopUpdatesUntilTheGameIsOver(t *testing.T) {
  game := NewPhonyGame()
  gl := &GameLoop{Game: game, Canvas: game}
  game.SetTurnsUntilGameOver(2)

  gl.Start()

  AssertEquals(t, 2, game.DrawCount)
  AssertEquals(t, 2, game.UpdateCount)
}

type PhonyGame struct {
  UpdateCount   int
  DrawCount     int
  IsOverAnswers []bool
}

func NewPhonyGame() *PhonyGame {
  g := &PhonyGame{}
  g.IsOverAnswers = make([]bool, 0)
  return g
}

func (g *PhonyGame) Updated() bool {
  return g.UpdateCount > 0
}

func (g *PhonyGame) Update() {
  g.UpdateCount++
}

func (g *PhonyGame) Drawn() bool {
  return g.DrawCount > 0
}

func (g *PhonyGame) Draw() {
  g.DrawCount++
}

func (g *PhonyGame) SetTurnsUntilGameOver(turns int) {
  for i := 0; i < turns; i++ {
    g.IsOverAnswers = append(g.IsOverAnswers, false)
  }
}

func (g *PhonyGame) IsOver() bool {
  if len(g.IsOverAnswers) > 1 {
    answer := g.IsOverAnswers[0]
    g.IsOverAnswers = append(g.IsOverAnswers[:0], g.IsOverAnswers[1:]...)
    return answer
  }

  if len(g.IsOverAnswers) == 1 {
    answer := g.IsOverAnswers[0]
    g.IsOverAnswers = make([]bool, 0)
    return answer
  }
  return true
}

func AssertTrue(t *testing.T, value bool) {
  if !value {
    t.Error("Expected true, got false")
  }
}

func AssertFalse(t *testing.T, value bool) {
  if value {
    t.Error("Expected false, got true")
  }
}

func AssertEquals(t *testing.T, expected, actual int) {
  if expected != actual {
    t.Errorf("Expected %d but got %d", expected, actual)
  }
}
{% endhighlight %}

This is a pretty long example so let's hit the most complicated test.

{% highlight golang %}
func TestLoopUpdatesUntilTheGameIsOver(t *testing.T) {
  game := NewPhonyGame()
  gl := &GameLoop{Game: game, Canvas: game}
  game.SetTurnsUntilGameOver(2)

  gl.Start()

  AssertEquals(t, 2, game.DrawCount)
  AssertEquals(t, 2, game.UpdateCount)
}
{% endhighlight %}

I replaced the references in the tests to `&PhonyGame{}` to the `NewPhonyGame` factory function. This is because the `PhonyGame` now has a slice in it and I want to ensure it's initialized. The next line initializes the `GameLoop` with a game object (the `Updater`) and a `Canvas` (the object we draw). These are two different interfaces but `PhonyGame` implements them both. I actually believe a user of `GameLoop` is likely to use the same object for `Draw` and `Update` but I also believe they should be decoupled in the loop. Therefore it's two interfaces. The function `SetTurnsUntilGameIsOver` will tell the `PhonyGame` object to return `true` from the `IsOver` function after two "turns" are taken in the game. In a dynamic framework we might write `game.stub(IsOver).andReturn([false, false, true])` and I actually think this reads better. That said there is more implementation in the mock object than I'd like, mostly because there's no built in Queue type. It's extremely likely I'll write one and include it in my program.

Oh and I wrote a couple Assert helpers, for readability.

The actual code:

{% highlight golang %}
package gameloop

type Updater interface {
  Update()
    IsOver() bool
}

type Canvas interface {
  Draw()
}

type GameLoop struct {
  Game   Updater
  Canvas Canvas
}

func (g *GameLoop) update() {
  g.Game.Update()
  g.Canvas.Draw()
}

func (g *GameLoop) Start() {
  for !g.Game.IsOver() {
    g.update()
  }
}
{% endhighlight %}

The code isn't too hard, and the tests outnumber it by far, but note that `!g.Game.IsOver()` check. That's behavior, and behavior I can get wrong. A proper game loop will have limiting on frame rate, take input, and might make sure it's update loop runs in it's own thread (or goroutine) separate from draw. In short complicated behavior that has to be tested, and can be tested in isolation.

## You Can Do This in Any Language

I regularly talk to developers be they my coworkers, students, or random people on the internet who complain that the reason they can't do "good" TDD is a lack of tooling. Let me be clear - NO tool is required to do TDD. When was this quote written:

> The first attack on the checkout problem may be made before coding is begun. In order to fully ascertain the accuracy of the answers, it is necessary to have a hand-calculated. check case with which to compare the answers which will later be calculated by the machine.

The reference to "the machine" might give you a hint. It's from [1957](https://arialdomartini.wordpress.com/2012/07/20/you-wont-believe-how-old-tdd-is/). So remember when your architect says you can't use a mocking framework or your IDE doesn't have a runner, these people did it with PUNCH CARDS!

[^1]: I suppose I should point out I know that Go does not have classes. It has structs, and those structs can be the receiver of function calls. If that sounds like a class to you, it does to me too.
[^2]: I wrote about this on the [8th Light blog](http://blog.8thlight.com/eric-smith/2014/08/18/test-driving-the-game-loop-part-1.html), in C#. I based that work largely on this [great article](http://gameprogrammingpatterns.com/game-loop.html).

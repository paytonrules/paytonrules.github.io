---
layout: ebomb
title: JavaScript This - A Simple Test
---

Ahhh JavaScript, everybody's favorite language to hate. You have `==` and `===`, but not classes. Your module system is non-existent. It's a functional language, but everything is mutable. Don't get me started on the way it does type coercion. But maybe the most confusing part is:

## THIS ##

In every other language in the history of earth `this` or `self` has a pretty clearly defined meaning, the class you're executing in. JavaScript has no classes, which can lead to some surprising results. Take the classic:

{% highlight javascript %}
var a = {
  thingToDo: function() {
    this.a = "thing";
  }
};

setTimeout(a.thingToDo);
{% endhighlight %}

What does this code do? You might think it sets a.a to = "thing", and it does when you call it directly, but when you call it via callback function like setTimeout "this" is bound to the owning object. In a setTimeout function the owning object is the global window or undefined, depending on if you are in strict mode and your browser. So this test:

{% highlight javascript %}
it("is the owning object context in a callback", function(done) {
  // In one millisecond call a.thingToDo
  setTimeout(a.thingToDo, 1);

  // In five milliseconds check the value
  setTimeout(function() {
    assert.equal(a, "thing");
    done();
  }, 5);
});
{% endhighlight %}

PASSES! Now you might think this is a silly example, and it is, but that doesn't mean you can't make this mistake in your real code. It's a common error in JQuery callbacks.

{% highlight javascript %}
// BUG is coming....
$("element").onclick(this.myHandler);
{% endhighlight %}

Iterators in JQuery actually rebind this, causing the issues to get even more peculiar.

Now a common piece of advice for fixing this problem is to learn the language. Essentially "there's nothing wrong with _this_, you're just lazy." I call BS on both counts. The language treats a common keyword differently than every other common language, and you're not lazy. That said my advice is the same, learn the language, with a twist.

## Flashcards ##

Did you ever learn a language? No not a programming language, but a language your fellow human beings actually speak. What did every class ever taught[^1] use for memorization? Flashcards. Flashcards work because you do them over and over again, but they have a flaw in that there's no way to be sure you're giving the right answer unless a teacher is present. If you keep studying that the word for hat is zapato then you'll memorize the wrong answer.

Fortunately we're not making cards on a piece of paper and hoping we're getting it right. Our flashcards will be tests. Let's return from our horrid high school Spanish memories and look at `this` again.

## Making Your Flashcards ##

Remember the two examples of this above? I'm going to encode them into tests:

{% highlight javascript %}
  describe("What Is This?", function() {
    var assert = chai.assert;

    it ("is the simple object context on method invocation", function() {
      a.thingToDo();

      assert.equal(a.a, "thing");
    });

    it("is the owning object context in a callback", function(done) {
      setTimeout(a.thingToDo, 1);

      setTimeout(function() {
        assert.equal(a, "thing");
        done();
      }, 5);

    });
  });
{% endhighlight %}

I used [lineman](http://linemanjs.com/) because it is super simple to setup with tests, and I used [mocha](http://mochajs.org/) + [chai](http://chaijs.com/api/assert/) because I like mocha's way of doing asynchronous testing. In mocha you mark an asynchronous function as done by calling the done function that is passed into every test. If you don't make done a function parameter, then mocha doesn't worry about it. Jasmine 2 has that behavior, but it's not bundled into the version of lineman I'm using. The point is that it was VERY easy to set this up. Don't try and write a test framework, don't set one up if it's difficult, and don't go writing the [Ruby Koans](http://rubykoans.com/).  Give yourself a very quick setup and start writing some tests.

Let's continue for a moment. There are other situations where this is confusing. I'll write another test:

{% highlight javascript %}
  it("does something in an anonymous function", function(done) {
    setTimeout(function() {
      a.thingToDo();
    }, 1);

    setTimeout(function() {
      assert.equal(a, "thing");
      done();
    }, 5);
  });
{% endhighlight %}

Now this test also passes. I didn't expect it to because I was in an anonymous function, and I know why. Quick fix:

{% highlight javascript %}
var a;

describe("What Is This?", function() {
  var assert = chai.assert;

  beforeEach(function() {
    a = {
      thingToDo: function() {
        this.a = "thing";
      }
    };
  });
{% endhighlight %}

It's just good testing practice to reset the state in a before each, but on a quiz like this having separate files for testing isn't a good idea.  I'm not writing production code, I'm writing a little quiz for myself to both learn how `this` works and to practice.

## Practice ##

So how does this work for practice. Well once I've written myself a few tests to answer my questions about the  `this` variable, I go back and remove the answers. Leaving something like this:

{% highlight javascript %}
  it ("is the simple object context on method invocation", function() {
    a.thingToDo();

    assert.equal(a.a, _);
  });
{% endhighlight %}

I commit this AFTER I figured out the answers. This way I have two things, a quiz to practice on and a reference that is just a git revert away.

This process isn't particularly time consuming. This example took about 2 hours to setup and that's with me writing about it as I went. I have another public one I call the [PointerKoan](https://github.com/paytonrules/PointerKoan) that I wrote in a 45 minute train ride. In that case I'd taken a pointer quiz and was embarrassed at how poorly I'd done. I wrote this on the way home to make sure I never did that again. Notice how it has no test framework, just asserts. The key is to make sure it's easy to create, or you won't do it.

Now pick something you're struggling with, and write your own quiz. I'd love to hear about them!

##  Reference ##

A great read on JavaScript's this from [Yehuda Katz](http://yehudakatz.com/2011/08/11/understanding-javascript-function-invocation-and-this/).

The [Clojure Koans](www.clojurekoans.com) actually inspired this practice.

And of course my early quiz: https://github.com/paytonrules/what-is-this

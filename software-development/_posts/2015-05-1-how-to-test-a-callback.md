---
layout: ebomb
title: How To Test A Callback
redirect_from:
  - /
---

Function Callbacks, or lambdas, or blocks, can frequently be nasty to test. Or at least they _feel_ nasty to test. Let's take a simple JavaScript example:

{% highlight javascript %}
$("button").click(function() {
  $("p").html("Warning! A button has been clicked!");
});
{% endhighlight %}

This can seem impossible to test, or nearly impossible. In fact callbacks can be really difficult for even experienced TDD practitioners to test. Fortunately it's really not that hard.

## Option 1 - Invoke the Callback

JQuery actually makes this pretty easy with clicks. You can just call $("button").click() in a test and it works. This is by far the preferred option. Sometimes you'll need to take some extra measures to get the callback invoked. Take an ajax call for instance:

{% highlight javascript %}
// Hat tip to the JQuery documentation
var jqxhr = $.ajax( "example.php" )
  .done(function() {
    $("p").text( "success" );
  })
  .fail(function() {
    $("p).text( "error" );
  })
  .always(function() {
    $("p").text( "complete" );
  });
{% endhighlight %}

How would you get this under test? Well you could use [sinon.js](http://sinonjs.org/) to simulate the responses you want - and you should - but what if you didn't know that existed? What if in your preferred language it doesn't exist?

## Option 2 - Stubbed Implementation

Functional languages really like callbacks, so let's use Clojure for this example. What if you wrote a function that takes a callback, something like:

{% highlight clojure %}
(defn on-progress [callback]
  (callback @my-progress))
{% endhighlight %}

That code is tested. It's awesome honestly, even with that strange ref in there. But now you're writing code like this:

{% highlight clojure %}
(defn my-func []
  (on-progress (fn [prog]
                (when (> prog 0)
                  (save-state *db* :started)))))
{% endhighlight %}

Assuming that *db* is some kind of global testable database, how are you gonna test this?  You've got a conditional in that callback and you're saving state so you sure better test it. Well heck just stub it:

{% highlight clojure %}
(with-redefs [on-progress (fn [callback] (callback 0))]
  (my-func)

  (should= :not-started (:state *db*)))
{% endhighlight %}

Note I didn't say mock it - this "test" redefines on-progress as another function and just makes the callback. Since it's making the callback with a progress of "0" I expect that the state of the *db* will be :not-started. As opposed to started I suppose.

This is one of the more common patterns you'll follow. If you (or your team) _own_[^1] the code you can replace the function/method that takes a callback with test code that just makes the callback. This works with things like the promises above too. You can resolve the promise however you want to make sure you hit `done`, `failed` and `alert`.

Except you can't do that, because you don't own JQuery. If JQuery changes you won't know, you won't update your mock, and everything will blow up in production. This is exacerbated in a language like JavaScript because of it's lack of types, but it's true generally. So how do you handle that case?

## Option 3 - Wrap then Stub

Looking at that ajax function again, what does it have to do with the application around it? You don't know because it's using the domain language of JQuery, not the language of the application it's in. That's not a fault of JQuery. JQuery is written in it's own language, your app is written in yours. It's your job to translate. That's why you don't mock what you don't own. Well that and if you mock an object you didn't write yourself you have no idea if used it correctly. You're just encoding your guess.

So listen to the hard test tell you and write your own object - it can look like whatever you want.  Maybe it's this:

{% highlight javascript %}
function GetExample(success, failure, always) {
  $.ajax( "example.php" )
    .done(function() {
      success();
    })
    .fail(function() {
      failure();
    })
    .always(function() {
      always();
    });
{% endhighlight %}

Or maybe you'll use promises in your own method. The point is you'll write your _small_ wrapper around the offending third-party code, and write mock tests against that. If you can't get a good test around the small wrapper for the third party library - like $.ajax - the world won't end because you're only calling that in one place.

## Option 4 - Extract a Method

When all else fails you can just make a named callback method and test that. It's not ideal, because you don't have the function call itself under test, which is why I leave it for last. It is the simplest.

## Why is This a Struggle?

Whenever I suggest these techniques to people they have the same reaction. It involves a forehead slap and usually some repetition of the phrase "I'm so stupid!" Relax you aren't stupid. The reason you had trouble is you probably didn't write this code test _first_. You knew you were going to write the callback, and then tried to figure out how to test it. That's why so few people wrap these kinds of dependencies like they should. They don't listen to the design pain and few it as a technical challenge.

It is a technical challenge, but it's also a design one. Remember callbacks [get confusing](http://callbackhell.com/) and should be used when your design calls for it. For instance if you test drove the ajax function above from nothing you might have written tests for:

* Making th ajax call
* Handling success
* Making sure success happened as a response to the ajax call.

This might have led to a promise, or a callback, or something else. The point being if you were thinking test first you wouldn't run into the trouble. Everything is harder when the test can't influence the design. But as you can see, not that hard.


[^1]: Own means "we can change it to fit the interface we desire." That means you don't own third-party API's, but it might also mean you don't own code developed in house too. Sounds like a topic for another post....


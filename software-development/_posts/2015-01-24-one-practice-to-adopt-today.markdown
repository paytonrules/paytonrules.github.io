---
layout: ebomb
title: The Most Important Refactoring
---

My readership comes from a wide range of development backgrounds. There's my fellow 8th Lighters who went through apprenticeships drilling TDD into their head and then spent years of their careers making projects the "Agile" way. There's experienced developers who want to apply TDD effectively in their organization, which may be hostile to the practice. There's brand new programmers who don't know a thing about anything, but they know it, and of course there's my Mom. Hi Mom!

This diversity in readership means some of my posts appeal to more of my readers than others. My Go Generics and Test Yourself tips were for the more experienced developers, whereas last weeks post about Learning TDD were for newer devs. This tip is not like those. This tip can help anybody understand existing code, write cleaner code, and gradually improve their existing codebases. Are you ready for this _One Weird Trick_?

### Rename Stuff

I'm gonna take an example from an earlier post:

{% highlight javascript %}
it("is the owning object context in a callback", function(done) {
  setTimeout(a.thingToDo, 1);

  setTimeout(function() {
    assert.equal(a, "thing");
    done();
  }, 5);
{% endhighlight %}

Now it's been a few weeks since I wrote this so I have to figure it out. Let's ignore the description for a moment and try to understand the test. As I read the test I say to myself aloud, and yes I say it out loud, what it does. It sounds something like this:

> Okay so first a set a timeout on thingToDo to happen in one second. What is the thing to do? Why do I set a timeout?
> Then I set another timeout for five seconds ...oh wait milliseconds ... from now where I check that a equals the string "thing". Why would a be "thing" now?
> Okay wait these callbacks do something like this = 'a' right?

{% highlight javascript %}
var a = {
  thingToDo: function() {
    this.a = "thing";
  }
};
{% endhighlight %}

> Ah okay so this might be set to the global window object, or it might be the object 'a'. I get why I named this variable something generic but surely I could have come up with a better name than a. Let's call this objectUsingThis because that's what I'm testing for. What does thingToDo do - well it sets the property 'a' - well let's call that property - to the string "thing" ugh that's awful. That's an arbitrary value for the property so let's call it property value.

Now I make those changes based on what I said out loud.

{% highlight javascript %}
it("is the owning object context in a callback", function(done) {
    setTimeout(objectUsingThis.setTestProperty, 1);

    setTimeout(function() {
      assert.equal(window.objectUsingThis, "Property Value");
      done();
    }, 5);
{% endhighlight %}

There's one other change I made which was to explicitly check that objectUsingThis is attached to the global window object. If you recall this was a JavaScript quiz I wrote for myself so I wouldn't continue screwing up `this` in JavaScript programs. This is test verifies one of the common bugs. Finally I can give the test a better description:

{% highlight javascript %}
it("sets the global objectUsingThis when setTimeout is passed an objects function directly", function(done) {
{% endhighlight %}

Wow is that better.

## Advantages of Renaming

Renaming adds clarity to the code by removing a translation layer, the part where you translate the code from what's on the page to an understanding in your head. That part where I said things out loud? That's the translating. It also changes exactly 0 behavior, and can be done with inadequate testing. Indeed in a compiled language you don't need tests at all to to this refactoring! It's a refactoring with virtually 0 risk. Provided you don't go around renaming everything, it's unlikely to hurt anyone. Remember there are only two hard problems in Software Development: cache invalidation, naming and off by one errors.

## Cultural Fun

Some developers do not like having their variables renamed on principle. They think of the code as "theirs" and don't want it changed. Furthermore oftentimes by renaming you're making the code easier for you to understand but you may be making it harder for them to understand.

The general solution to this is to work together on the rename. If you're going through code with somebody who doesn't like it when you change "their" stuff, go over to them and work on a solution together. Perhaps you can come up with names that help BOTH of you understand. Don't be critical. Don't say "your code is shit I don't get it" but come to them for help. Ask them to help walk you through the code and propose new names as you go. Listen. It's really not that hard.

Some people are just jerks, but most aren't outside of politics. You can work this out.

## Two No Nos

Don't rename things in code you're not actively working in. Wandering around the entire codebase renaming all the variables is a not-so-subtle way of telling your co-workers that they are stupid. It wastes your bosses time. The purpose of this is to work faster because you can understand the code you are in better, not to perfect the names of the entire system.

Don't get touchy when people rename your variables. What's good for the geese is good for the gander.

## Now Go Rename

I've said before that 90% of software development problems boil down to bad naming. I'm exaggerating but it's not that far off. Don't keep that understanding you've developed by reading through the code, embed it right in there. It takes moments and saves hours.

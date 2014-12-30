---
layout: ebomb
title: Write Your Own Generics in Go
---

Go, the systems programming language from google, doesn't have generics. That means in order to collect over a list instead of doing this like in C#:
{% highlight C# %}
list.Select(i => i + 2);
{% endhighlight %}

You "have" to do to this:

{% highlight Go %}
numbers := []int{1, 2, 3}
newSlice := make([]int, 0, 3)

for _, num := range numbers {
  newSlice = append(newSlice, num+2)
}
{% endhighlight %}

This causes [no](http://stackoverflow.com/questions/3912089/why-no-generics-in-go) [small](https://functionwhatwhat.com/go%E2%80%99s-type-system-is-an-embarrassment/) [amount](http://yager.io/programming/go.html) of consternation in the Go community and even more in the Go sucks community. I've used generics in their various forms in a multitude of programming languages and miss them when they're not there. On the other hand I was a professional programmer for about six to seven years before I knew generics were a thing! To listen to some developers a program cannot be built without generics, but you know what else doesn't have generics? C. The language that built ..oh everything. Perhaps we can live with the constraints of our language of choice.

## Quit Bitchin' Start Fixin'

Now that I've scolded you for complaining about Go it's time to address the real concern. When you find your language, or environment, is missing a feature you are used to there's a simple set of questions you should ask yourself.

_Does this missing feature outweigh the pros of using this language?_

The biggest pro of using any language is usually that you're already using it, but assuming your project is very new you should ask yourself if the other pros of the language outweigh the negative.

In the case of Go I'm using it to write a game that I want to see play on the Raspberry Pi in my basement. I needed a language that had easy interfaces to C, compiled quickly (my C++ project was painful), and would start fast on the Pi. Java takes forever on the Pi so I decided to use Go.

I miss generics, but the alternatives are not likely to run on the Pi.

_Can I implement this feature?_

The most common use case, for me, for generics is iterating over a list. Functions like filter and map. I'm not sure I would want those features in a game because those features typically make a new copy of the list. Efficiency is at a premium in my use case so I wouldn't want to do that. That said I wouldn't mind having those features for smaller lists.

Can I implement the feature? Well some [other](http://bouk.co/blog/idiomatic-generics-in-go/) [people](http://blog.jonathanoliver.com/golang-has-generics/) have done variations on it. So I'm gonna say yes.

_Should I implement this feature?_

Most developers stop at step two but step three is inarguably more important. Let's assume for a moment you've written the loop above. You've thrown up a little in your mouth, you've bitched to a neighbor, and then you've moved on. Is there any reason to start writing a full fledged generics library for Go? HELL NO! That's your inner programmer solving problems you don't have yet. Wait until there's duplication. THEN make a small library to solve the problem.

Go has a cool feature where you can attach functions to any type including primitive types. This means that once you write the same algorithm two or three times you can make a small library for it, but you do not need to make a fully generic library. If you are mapping over ints then write one that does it over ints. Don't write a generic list comprehension library - make the Go folks do that - solve the problem you actually have in front of you.

## The Problem I Have

So assuming I'm mapping over a slice of values frequently in Go I can more easily deal with this by adding a small snippet of code:

{% highlight Go %}
func collect(numbers []int, f mapper) []int {
  newSlice := make([]int, 0, len(numbers))

  for _, num := range numbers {
    newSlice = append(newSlice, num+2)
  }

  return newSlice
}
{% endhighlight %}

Now I can call it this way:

{% highlight Go %}
numbers := []int{1, 2, 3}

newSlice := collect(numbers, func(x int) int {
  return (x + 2)
})
{% endhighlight %}

And that solves the problem in front of me. This library can be extended, and made more generic _as I need it_. Remember in Real World development we don't write perfect theoretical constructs, we get things done.

## Reference

I haven't tried it, but [underscore.go](https://tobyhede.github.io/go-underscore/) seems legit.



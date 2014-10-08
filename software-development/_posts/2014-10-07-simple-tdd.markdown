---
layout: ebomb
title: Simple Test? Just Write It!
---

When writing in a Test Driven style, especially when you're a newbie, it's very common to write tests that look very much like the production code. I saw this question asked recently on Jeff Langr's google group for his [new book](https://groups.google.com/forum/#!category-topic/modern-cpp-with-tdd/how-to/ZopESeV5EOk):

> I have two structures, and I need to write function to convert OldUgly into NewFancy, e.g.:  Do I need to write incrementally 3 test (for each field) or can I write simply one test?
> Another concern that such test will looks almost exactly like the function itself, but with assertions instead of assignments. Is it good?

For context the person asking had three fields in each class (OldUgly and NewFancy), but the details don't matter as I get this kind of all the question with apprentices I mentor and students I teach. It isn't really the question they want to ask. What they want to ask, without soundling like a jerk is:

> Aren't I just going to write a bunch of stupid tests that don't find anything?

The answer to this question is unquestionably no. Let's take our example here. Will the first test probably mimic the implementation? Yup. So what? If you need that code you need a test or more. Now you might want to ask yourself why you are writing that converter in the first place. Maybe you're not listening to your tests very well, maybe you've already decided on a design that "needs" this converter. If so - so what? I'd rather have a tested imperfect design than one that has holes but feels "ideal".

People new to TDD are always concerned about really simple code like this. Should they test constructors? How about getters and setters? The root concern is that they are gonna spend so much time working on tests for code that is gonna work anyway that they won't get any real work done. The reality is twofold. One is that people frequently don't write tests for code like this because the code being created is needed for some other purpose, so an explicit test isn't necessary. A getter ends up being called in code for instance, so you don't need an explicit test to verify it works. The other thing that they don't consider is that these tests are super-fast to write, super-fast to run, and add almost no overhead to understanding. They're harmless, and I generally recommend newbies write them anyway as a way of staying in the TDD habit.

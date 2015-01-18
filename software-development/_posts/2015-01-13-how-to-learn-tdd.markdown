---
layout: ebomb
title: The Path to Learning TDD
---

It's a common refrain. You've heard about TDD and about it and you want to learn, but when you try to apply it to an actual project you can't see how to do it. For example see [this question](http://www.reddit.com/r/dotnet/comments/2nnlnv/what_is_the_best_way_to_learn_tdd/) on reddit or heck the premise of [my website](http://paytonrules.com).

Fortunately it's not that hard to learn TDD, to the point where you'll no longer be worried about getting "good at TDD" but will move in to "good at software" in a few weeks. If you completed this program you wouldn't be an expert, but you'd be able to apply Test Driven Development to your projects and see benefits.

##### Introductory Reading

Yeah you have to do a little reading. Active Reading - where you follow along with the code examples. I think the best introductory book is still [Test Driven Development By Example](http://www.amazon.com/gp/product/0321146530/ref=pd_lpo_sbs_dp_ss_1?pf_rd_p=1944687402&pf_rd_s=lpo-top-stripe-1&pf_rd_t=201&pf_rd_i=0131016490&pf_rd_m=ATVPDKIKX0DER&pf_rd_r=0H780E8DQN01E2G9GQ8V) by Kent Beck. The examples in it aren't very real world, but the techniques are.

##### Basic Practice

When I first read about TDD in the Extreme Programming Explained book I immediately tried to apply it to my real world job. This led to frustration and confusion when the codebase I worked on didn't match up nicely with an "XP" codebase. The truth is I needed to practice the techniques and didn't know it. The best way to practice TDD is through performing a [Code Kata](http://en.wikipedia.org/wiki/Kata_%28programming%29) and the one I give to beginners is [Prime Factors](http://butunclebob.com/ArticleS.UncleBob.ThePrimeFactorsKata). Prime Factors has the advantage of being complicated enough to require testing but simple enough to be repeatable.

Do this kata daily for a couple weeks, first thing in the morning. You're trying to make test-first a habit and that can only be done through repetition. You'll know when you've got it when you really want to write tests for your other development. While you're doing that kata...

##### Reading on Systems

It's time to read [GOOS](http://www.amazon.com/Growing-Object-Oriented-Software-Guided-Tests/dp/0321503627/ref=sr_1_1?ie=UTF8&qid=1420816222&sr=8-1&keywords=growing+object+oriented+software+guided+by+tests). While I don't agree with every aspect of their approach, I think it's a great way to start working with a real application, drilling down from higher level tests to lower level tests. You might have to read this one more than once for it to sink in. This is the advanced version of your first book.

##### Practice Libraries

When you've read GOOS it's time for a new kata, the [String Calculator](http://osherove.com/tdd-kata-1). Where the first kata just had you solve a simple problem in a test-first way, this one will force you to use the String libraries of you preferred environment and wrestle with the problems of a real application. I use this kata each time I switch environments (for instance .NET to Java) to re-familiarize myself with the new setup. It's significantly harder than Prime Factors.

When you feel ready I highly recommend recording a screencast even if you don't show anybody. Kata's are meant to be performed, and the attempt at performance will prove just how good you are at the kata.

##### A Test Application

This is the step where you are most likely to fail, especially if you just read a book and started writing your new 3D engine for Oculus Rift in it. You'll get confused, the tests will get painful, and you'll give up. You might decide TDD is too hard, when it reality it's software development that is hard not TDD.

No you need a test application with known boundaries. Something large enough to force you to design good software and wrestle with challenges, but small enough that you're finished before we're all dead. A good example is to write the game [Mastermind](http://en.wikipedia.org/wiki/Mastermind_%28board_game%29). It has complicated rules, user input, but is simple enough to get working. Especially since you ARE going to keep it to the command line. Your goal is to practice TDD and you'll learn Mastermind to do it. If you add a UI framework on top you've now got to learn two different things at the same time, plus the challenges of testing a GUI, and you're extremely likely to fail.

##### Your Own Project

Now that you've made Mastermind and it's working and wonderful, pick your project. By now you'll have seen the benefits of TDD, and you'll have spent some time researching any issues you had when building Mastermind. You should be ready to pick that open-ended project you've always wanted to write. In the meantime....

##### Bring it to Work

You're ready to start doing TDD at your job. The challenges will be different of course, but you'll have done the research and practice necessary to be ready to tackle them. Will you be perfect? No. There's plenty more learning to do, like there always is in software, but you've got enough "test infection" to be successful.

This plan, assuming you're already a developer with some experience, should really only take a few weeks. It's two books and one fairly simple application. When you're done you'll have the foundational knowledge (from books) and practice (from katas) to practice TDD confidently.

##### Further Reading

There's a ton of good resources on TDD. Anything by Uncle Bob is good. Working Effectively With Legacy Code by Michael Feathers is a fantastic book. And of course you can sign up to my mailing list to get early access to my upcoming book!

---
layout: ebomb
title: Testing Private Methods - Yet Again
---

I guess it's that time of year again - time to write about testing private methods. It's a constant question because it sounds like a game changer. The logic goes something like:

* TDD tests public methods.
* Most of my code is in private methods.
* Can't do TDD. Baby - meet bathwater.

My last [blog](http://paytonrules.com/software-development/2015/10/02/why-test-private-methods.html) gave a very specific solution to this problem. This time I'm going to try a more general approach. There's really two cases for this situation.

## Greenfield

I'm defining greenfield development as writing new code and not modifying existing code, even if the code is in a legacy codebase. In this situation the solution is easy and I'll quote something Bob Martin said to me when I took a TDD course 10 years ago.

>If the code can't be reached through the public interface, why are you writing it?

I felt extremely stupid on getting this answer, because he's obviously correct. When doing TDD you write each test _first_ and write the code to pass one at a time. The private methods are extracted, as opposed to the approach of writing a ton of private methods then creating your public method from them and hoping it's all working. When you extract private methods they are usually small, easy to reach, and already tested by the previous tests.

So if your code is new then write the code to pass in the public method and extract a private method for clarity or to remove duplication, if necessary.

## Existing Code

If you're working with existing code you need to change code in private methods and it may be unclear or impossible to reach those private methods from a unit test. Now you've got a deal with the issue. So you follow a process. Your a developer, you know processes, so here's one you can use for testing private methods. Start by commenting out the code in the private method and running them.

**If no tests fail**

Belive it or not this is often easier than if there are one (or more) failing tests. If no tests fail then simply make the method public, and test it directly. If anybody gives you grief about it tell them that you couldn't be sure that tangled mess was working without testing it. If they still give you grief than refactor it to a new class. You can do that now, since its tested. And if they _still_ give you grief than use one of the many language-specific methods (such as friend classes) to test private methods. I normally don't recommend those, but sometimes you have to work within the constraints of your team.

**If they fail**

In this case you need to pick the simplest test that's failling. Find one that fails for a reason similar to your reasons for changing the private method and copy and paste that test. Restore the code in the private method, and then modify your copied to test to fail for the reason you need it to, and write the new code to pass the test.

Now you need to extract liberally in the code and the tests. Testing a private method should be straightforward, and if it isn't then it means either your code, tests or both are hard enough to understand that some refactoring is necessary. Consider extracting the newly publicized method into a new class.

In fact the most common reason we are concerned with testing private methods is that a class has grown too big, with large private methods. These responsibilities often need to be refactored into their own objects in their own right, because they are not cohesive with the object containing them.

So there you have it - that's how you test private methods. It's really not so hard - go forth and test through the public interface!


### Comment Out The Code

You can't always tell if code is tested our not, so comment out the code in the method and run the tests. If the tests don't fail then nothing is testing the method you want to change. Now it's time to find out what is calling that private method. I Comment out the code and run the tests. This will help you see if anything is actually testing the code you want to change.



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

If you're working with existing code you need to change code in private methods and it may be unclear or impossible to reach those private methods from a unit test. Now you've got a deal with the issue. So you follow a process. Your a developer, you know processes, so here's one you can use for testing private methods.

1. Comment out the code in the private method.
2. Run the tests.
3. If tests fail then pick one to either edit or copy-paste into a new test.
    1. Restore the code.
    2. Run the tests, make sure they still pass.
    3. Edit the test you found to make it fail (because you haven't written the new code you need).
    4. Make it pass.
    5. Refactor Code AND TESTS to make this process simpler next time.
4. If no tests fail then go ahead and make the private member public.
    1. TDD new code.
    2. Consider extracting the newly publicized method into a new class.

In the case where tests are present you probably need to do some heavy refactoring, so that the next time you make changes to that section to the codebase it's obvious where the tests are and what they do. In the case where there are no tests executing the private method you almost certainly need a new object.

In fact the most common reason we are concerned with testing private methods is that a class has grown too big, with large private methods. These responsibilities often need to be refactored into their own objects in their own right, because they are not cohesive with the object containing them.

So there you have it - that's how you test private methods. It's really not so hard - go forth and test through the public interface!


### Comment Out The Code

You can't always tell if code is tested our not, so comment out the code in the method and run the tests. If the tests don't fail then nothing is testing the method you want to change. Now it's time to find out what is calling that private method. I Comment out the code and run the tests. This will help you see if anything is actually testing the code you want to change.



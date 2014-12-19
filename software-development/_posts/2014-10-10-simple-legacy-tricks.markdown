---
layout: ebomb
title: 3 Simple Ways to Test Legacy Code
---

We've all been there. Maybe you've read a TDD tutorial, taken a TDD course or attended a Code Retreat and have become "test-infected." You write tests first now. On Monday you're even excited, until you sit down to deal with the beast. Fifteen thousand lines of code in one function, and you have to write a test for line 11,398. The mere thought of writing tests is depressing, defeating. You resign yourself to being a glorified factory worker, add one more if statement, and die a little inside.

I really wish I was exaggerating.

Fortunately it doesn't have to be quite so terrible. If you've ever asked somebody what to do about Legacy Code they've probably told you to read this [book](http://www.amazon.com/s/ref=nb_sb_ss_c_0_16?url=search-alias%3Dstripbooks&field-keywords=working%20effectively%20with%20legacy%20code&sprefix=working+effectiv%2Caps%2C169) and wandered off. And you should read that book, it's a hell of a book. But while Michael Feathers's work is fantastic it's also long so I'm here to boil down for you the simplest steps you can take to write tests for Legacy code right now!

## Make Private Methods Public
One of the most common questions I get is "how do you test a private method?" Well in code that's been test driven since day 1 the answer is easy, you do it through the public interface. Private methods only exist via refactorings created for readability, but Legacy code tends to be built bottom up, with many private methods created and then assembled together at the very end.  This makes those private methods difficult to reach. The answer is simple - make 'em public! Testing beats encapsulation, and any private method that is so hard to test is really another class struggling to come out anyway. Start the process by making that private method public and testing it.

## Extract Static Method
Imagine an if statement, buried in a million lines of code.  Maybe it's this:

```
if (x > 2)
  x++;
```

You know that the correct code is:

```
if (x >= 2)
  x++
```

But writing a test that will jump through the previous million lines of code to get to that if statement is nearly impossible. Are you forced to skip writing a test? No, especially if you have automated refactoring tools. Extract a static public method:

```
x = NewValueForX(x);
```

Now you can write tests against NewValueForX.  It's simple.

## Subclass and Override
In GUI applications it's common for objects to intermingle UI and business logic, particularly when using a framework. Take this iOS example:

{% highlight objective-c %}
-(void) signInUnTestable:(id) sender
{
  if (!authenticate(self.emailAddress.text, self.password.text)) {
    UIAlertView *alert =[[[[self class] alertViewClass] alloc] initWithTitle:@"Sign In Unsuccessful"
      message:@"Invalid Credentials"
      delegate:NULL
      cancelButtonTitle:@"OK"
      otherButtonTitles:NULL];
    [alert show];
  }

}
{% endhighlight %}

Now that UIAlertView won't work unless you start automating the GUI, and that's bad. But what if you did this?

{% highlight objective-c %}
-(void) signInTestable:(id) sender
{

  if (!authenticate(self.emailAddress.text, self.password.text)) {
    [self showAlert];
  }
}

-(void) showAlert {
  UIAlertView *alert =[[[[self class] alertViewClass] alloc] initWithTitle:@"Sign In Unsuccessful"
    message:reason
    delegate:NULL
    cancelButtonTitle:@"OK"
    otherButtonTitles:NULL];
  [alert show];
}
{% endhighlight %}

Now you can make a class in your tests that overrides showAlert:

{% highlight objective-c %}
@interface TestableViewController : SignInViewController

@end

@implementation TestableViewController
-(void) showAlert {
}
@end
{% endhighlight %}

This isn't a recommended practice on Test Driven code, but it works great to get Legacy code under test. I use also use it when coding against third party frameworks, as those often weren't designed with testability in mind and give me fewer options. In short frameworks are often Legacy code.

## Summary
Testing Legacy Code doesn't have to be hours of slog through tons of code with little value. If you set your sights on small victories with small changes you will be able to make safe changes to that crappy codebase. You might even enjoy it.

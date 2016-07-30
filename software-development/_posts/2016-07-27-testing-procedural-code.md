---
layout: ebomb
title: Testing Procedural Code
---

*This answer was originally posted on the Programmers Stack Exchange. I've reproduced it here, but more generically as I don't have the permission of the original questioner. As such I've changed the code to be unspecific. If you want to see the original, it's [here](http://programmers.stackexchange.com/questions/318369/unit-test-for-void-which-copies-data-from-one-location-to-another/325905#325905).*

When it comes to TDD some of the simplest code can be the hardest to test. Let's peek at an example:

```c#
public void CopyCustomers()
{
  var sourceCustomers = _sourceRepository.GetAllActiveCustomers();

  List<Customer> customers = new List<Customer>(sourceCustomers
    .Select(o => new Customer
      {
        Code = o.code,
        Name = o.name,
        Telephone = o.telephone,
        LastUpdated = DateTime.Now
      }));
  _targetRepository.Add(customers);
}
```

The above code is in C# but is straightforward even if you don't know the syntax. You can safely assume `_sourceRepository` and `_targetRepository` are injected which means we don't need to use database driven repositories. We just need to ensure that the customers make it from the source to the target, with an updated date. So what's the problem? Besides the fact that I already have the code when I should have written the test first of course.

Unfortunately a lot of new, and even experienced TDD practitioners, will write the test to look something like this:

```c#
public void TestCustomersAreMoved()
{
  _customerManager.CopyCustomers();
  _sourceRepository.Verify(mock => mock.GetAllActiveCustomers(), Times.Once());
  _targetRepository.Verify(mock => mock.Add(It.IsAny<List<Customer>>()), Times.Once());
}
```

The problem with this test? Well let's ask ourselves a few questions:

* If I only add the first customer from the original select, will this fail?
* If call `GetAllActiveCustomers` more than once the test will fail, should it?

The answer to both of these questions is really "no". You don't care how many times `GetAllActiveCustomers` is called, probably, but you do care that the right customers are added to the target repository. In other words this test verifies that you wrote the implementation you said you would, but it doesn't verify that the implementation is _correct_. This is a sign that you probably wrote the code first, instead of the tests, or at least decided what the code would be before you wrote anything.

Let's do this in a test-driven fashion, but with one rule: only mock one object per test, stub anything else (or use real data).

We'll start the test like this:

```c#
public void TestCustomersAreMovedFromSourceToDestination()
{
  _sourceRepository.stub(mock => mock.GetAllActiveCustomers().andReturn([customerOne, customerTwo]):
}
```

Obviously this test isn't finished yet. `customerOne` and `customerTwo` don't exist yet. What it does do is create a **stub** of the data coming from your repository query. Why a stub? A stub corresponds roughly to a `Given`. "Given that there are two active customers" might make for a good cucumber test. In this case you don't want to test the way your query is called or that it's called, you want to test what your code does when there are multiple customers in the database. You can make this test pass without using `GetAllActiveCustomers` of course, but it would be more difficult than actually calling the method.

Continuing:

```c#
public void TestCustomerDataIsMovedFromSourceToDestination()
{
  var customer = new Customer();
  customer.code = "CODE";

  _sourceRepository.Setup(mock => mock.GetAllActiveCustomers()).Returns([customer]):

  _customerManager.CopyCustomers();

  _targetRepository.Verify(repository => repository.Add(It.Is<Customer>(customer.code == "CODE")));
}
```

Now you'll notice I only checked one property on the customer to make sure it matches. You'll also notice I switched from returning two customers to one customer. That's because this test is focused on correctly mapping the customer from the source repository to the destination repository, and I didn't recognize that it was important until I started writing that down. You probably in one test would want to make sure you get a customer with the three fields that are mapped: code, name and telephone. That will force the code to take the _first_ customer out of `GetAllActiveCustomers` and map the three fields. You'll want to write another test that verifies you map more than one customer. Something like this:

```c#
public void TestAllCustomersAreMovedFromSourceToDestination()
{
  var customerOne = new Customer();
  customerOne.code = "customer code 1";
  var customerTwo = new Customer();
  customerTwo.code = "customer code 2";

  _sourceRepository.Setup(mock => mock.GetAllActiveCustomers()).Returns([customerOne, customerTwo]):

  _customerManager.CopyCustomers();

  _targetRepository.Verify(repository => repository.Add(It.Is<Customer>(customer.code == "customer code 1")));
  _targetRepository.Verify(repository => repository.Add(It.Is<Customer>(customer.code == "customer code 2")));
}
```

Now in that test you *don't* validate every single field is mapped. Just one is enough to be certain you are storing the right customers. I'd only add those assertions again if there's actually a bug because somebody didn't map all the fields when returning more than one customer. To create that bug you'd almost have to do it on purpose, and I wouldn't worry about it yet.

Finally you'll want to make sure you're mapping the date. This seems like it's the reason you're actually writing this loop and creating cloned customers, which is why I have it as a separate test. Now you can't use DateTime.Now in a unit test directly, because "now" is constantly changing during the run of the test. There's numerous ways to extract time into an abstraction, so you can stub it, and in this case I'm going to create the `customerManager` with a "now" object.

```c#
// Production Code
public interface NowProvider {
  DateTime Now();
}

// Production Code
public class DateTimeNowProvider : NowProvider {
  public DateTime Now() {
    return DateTime.Now();
  }
}

// TEST CODE
public class TestNow : Now Provider {
  public DateTime now;

  public DateTime Now() {
    return now;
  }
}

public void TestCopyCustomersUpdatesTheTime() {
  var nowProvider = new TestNow();
  nowProvider.now = DateTime.Now() ;
  _sourceRepository.nowProvider = nowProvider;

  var customer = new Customer();
  _sourceRepository.Setup(mock => mock.GetAllActiveCustomers()).Returns([customer]):

  _customerManager.CopyCustomers();

  _targetRepository.Verify(repository => repository.Add(It.Is<Customer>(customer.LastUpdated == nowProvider.now)));
}
```

Now this interface is far from the only way you could abstract time, it's just the first one that comes to mind, and works. Note how `now` is set to a fixed time now, so we won't have flaky tests.

Here are a few guidelines I used to break this into multiple tests:

* Break down the responsibilities you need to test.

In this code there is a loop, there is a mapping of new customers, and there's the mapping to the date. You can usually identify these kinds of things as you articulate the requirement(s) you're writing. This is best done by writing *no code* without *one* failing unit test. When your unit test gets huge or complicated you're probably trying to test more than one thing.

* [Zero/One/Many](http://agileinaflash.blogspot.com/2012/06/simplify-design-with-zero-one-many.html)

This is just an old guideline. I skipped zero here, because it does nothing, but when testing a loop you'll want to make sure you test the cases with an empty list, one entry, and many.

* One Mock Per Test

Can't remember where I got this guideline, it might be [Roy Osherove](http://artofunittesting.com/) but a mock contains assertions. Just as there should usually be one (logical) assertion per test, there should be one mock object per test. Mocking every collaborator means you're really just validated you implemented what you said you'd implement. It doesn't validate any of that is even slightly correct. Replace collaborators with stubs, and mock only one of the objects at a time.

In general I recommend newbies avoid mocks as much as possible. The original tests can lead to systems that run tests blindingly fast - and with no idea if anything works yet.

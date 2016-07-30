```
Here's another example that may be more fruitful. Consider a function that does nothing but coordinate other objects or functions. For example:

function bakeCookies(dough, pan, oven) {
    panWithRawCookies = pan.add(dough);
    oven.addPan(panWithRawCookies);
    oven.bakeCookies();
    oven.removePan();
}
How should a function like this be unit tested, assuming you think it should? It's hard for me to imagine any kind of unit test that doesn't simply mock dough, pan, and oven, and then assert that methods are called on them. But such a test is doing nothing more than duplicating the exact implementation of the function.

Does this inability to test the function in a meaningful black box way indicate a design flaw with the function itself? If so, how could it be improved?
```

Robert,

A long time ago I would have tested this function with mocks, exactly the way you described, and a lot of people still do. IMO you are right and they are wrong, that is to say testing this with a mock pan or a mock oven means you'll just "type what you said you were gonna type". In order to have any idea if what you were doing actually worked you'd have to execute the code manually, and that's exactly what we're trying to avoid with TDD.

Instead to test this I'd start with real objects. The test might look like this:

```
testCookiesGetBaked() {
  let dough = new Dough();
  let pan = new Pan();
  let oven = new Oven();

  bake(dough, pan, oven);

  assert(dough.baked?());
```

I'm assuing that with a real dough object there's a way to be sure it's baked. If you need to ensure the contract that `removePan` is called then check the end result - is the oven empty?

Now maybe the problem is that the Oven class is connected to a real Oven, so every time you run this test the oven turns on there have been several explosions. Meanwhile creating a new Pan places an order for new pans that keep getting shipped to your office. So you think, I need mocks!

This is why we write the tests first. See if you write the test first you'll get to the difficulties constructing an Oven and you'll fix the problem _in oven_! Ditto the problem in Pan. Given what you're trying to do in this setup it should be straightforward to test the function directly, without mocks. In this way you aren't tied to thie implementation of bakeCookies. So that when the oven can start baking other things you can change the function to read as:

```
function bakeCookies(dough, pan, oven) {
    panWithRawCookies = pan.add(dough);
    oven.addPan(panWithRawCookies);
    oven.bakeAt(400);
    oven.removePan();
}
```
The tests will still pass.


http://programmers.stackexchange.com/questions/318369/unit-test-for-void-which-copies-data-from-one-location-to-another

```
Still learning and getting my head around Unit Testing, (also trying to get into TDD, though I appreciate it isn't the same thing) and in many ways it is changing/improving my code. But I come across scenarios where I am unsure how to test a piece of functionality. Which leaves me wondering whether it's my code design that is the issue, or my knowledge of unit testing (plus mocking etc). It could be either here, so I'm looking for advice how to change my code or how to test it, whichever is the right thing to do.

In this case I am writing a void which takes data from one database and loads it into another (both use EF6).

So my _manager.UpdateHissOfficersFromSource() calls the source repository, which gets the data, then calls the target repository to insert the data. The only thing I can think of that might help test it is if the Insert returned a count, which I could then check in the Test.

    public void UpdateHisOfficersFromSource()
    {
        var sourceOfficers = _sourceRepository.GetAllActiveOfficers();

        List<Officer> officers = new List<Officer>(sourceOfficers
            .Select(o => new Officer
            {
                Code = o.officer_code,
                Name = o.officer_name,
                Telephone = o.officer_telephone,
                LastUpdated = DateTime.Now
            }));

        _targetRepository.Add(officers);
    }
I'm using Mock, but I doubt that matter which I'm using.

UPDATE:

So based on the replies, this is what I've done, which passes. Is it sufficient?

public void UpdateActionOfficersDataFromConfirm()
    {
        _officerManager.UpdateHissOfficersFromConfirm();
        _sourceRepository.Verify(mock => mock.GetAllActiveOfficers(), Times.Once());
        _targetRepository.Verify(mock => mock.Add(It.IsAny<List<Officer>>()), Times.Once());
    }
```

Okay so the problems with these test have already been pointed out, but allow me to pile on for a moment. The test you have here has quite a few flaws, in fact it's arguably not "self verfying" (see the S in [FIRST](https://pragprog.com/magazines/2012-01/unit-tests-are-first) below breaks a rule of good unit tests - it should be "Self Verifying." What does that mean? Well at its simplest level it means that the test should have an assertion and shouldn't require manual intervention or interpretation to verify if it's right or wrong. But I believe there are few ways that a test can have assertions and not be self-verifying. As you self a couple questions:

  * If I only add one officer from the select, will this fail?
  * If call GetAllActiveOfficers more than once the test will fail, should it?

The answer to both of these questions is really "no". You don't care how many times GetAllActiveOfficers is called, probably, and you do care that the right officers are added to the target repository. In other words this test verifies that you wrote the implementation you said you would, but it doesn't verify that the implementation is _correct_!.

Now mocks are confusing, but I think you correct this by following two simple rules.
  1) Only mock one object per test, stub anything else (or use real data).
  2) Write your test _first_!

Okay you knew that second one, but let's take a quick example anyway. What if you started the test like this:

```
public void UpdateActionOfficersDataFromConfirm()
{
  _sourceRepository.stub(mock => mock.GetAllActiveOfficers().andReturn([officerOne, officerTwo]):
}
```

Now I don't know the Mock syntax but I'll assume it has some way to stub. officerOne and officerTwo don't exist - create them before the stub. I'll leave that as an exercise for you. Why a stub instead of a mock? Because I a stub corresponds roughly to a `Given`. "Given that there are two active officers" might make for a good cucumber test. I can make this test pass without using `GetAllActiveOfficers` of course, but it would be more difficult than actually calling the method.

Continuing:

```
public void UpdateActionOfficersDataFromConfirm()
{
  var officer = new Officer();
  officer.officer_code = "CODE";

  _sourceRepository.Setup(mock => mock.GetAllActiveOfficers()).Returns([officer]):

  _officerManager.UpdateHissOfficersFromConfirm();

  _targetRepository.Verify(repository => repository.Add(It.Is<Officer>(officer.officer_code == "CODE")));
}
```

Please note I'm writing this in markdown, so any syntax errors are accidental.

Now you'll notice I only did once property on the officer to make sure it matches. You probably in one test would want to make sure you get an officer with the three fields that are mapped: officer\_code, officer\_name and officer\_telephone. That will force the code to take the _first_ officer out of GetAllActiveOfficers and map the three fields. You'll want to write another test that verifies you map more than one officer. Something like this:

```
public void UpdateActionOfficersStoresAllOfficers()
{
  var officerOne = new Officer();
  officerOne.officer_code = "officer code 1";
  var officerTwo = new Officer();
  officerTwo.officer_code = "officer code 2";

  _sourceRepository.Setup(mock => mock.GetAllActiveOfficers()).Returns([officer]):

  _officerManager.UpdateHissOfficersFromConfirm();

  _targetRepository.Verify(repository => repository.Add(It.Is<Officer>(officer.officer_code == "officer code 1")));
  _targetRepository.Verify(repository => repository.Add(It.Is<Officer>(officer.officer_code == "officer code 2")));
}
```

Finally you'll want to make sure you're mapping the date. This seems like it's the reason you're actualy writing this loop and creating duplicate officers, which is why I have it as a separate test. Now you can't use DateTime.Now in a unit test directly, because "now" is constantly changing during the run of the test. There's numerous ways to extract time into an abtraction, so you can stub it, and in this case I'm going to create the officerManager with a "now" object.

```
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


public void UpdateActionOfficersDataStoresANewDate()
{
  var nowProvider = new TestNow();
  nowProvier.now = DateTime.Now();
  _sourceRepository.nowProvier = nowProvider;

  var officer = new Officer();
  _sourceRepository.Setup(mock => mock.GetAllActiveOfficers()).Returns([officer]):

  _officerManager.UpdateHissOfficersFromConfirm();

  _targetRepository.Verify(repository => repository.Add(It.Is<Officer>(officer.LastUpdated == nowProvider.now)));
}
```


---
layout: ebomb
title: Testing Private Methods - In Any Language
---

"How do I Unit Test Private methods in [language]?" is a question that comes up a lot.

As in "Unit testing private methods" has 3,820,000 results on google[^1]. It's clearly an issue for numerous developers, despite the fact the answer is easy.

*Don't*

Well that's the end of that blog...

## What? I should test everything!

Of course you should, but if you're worried about unit testing a private method then you're not letting the design emerge as you write tests. The process you should follow for TDD goes like this:

* Write Test
* Make test pass
* Refactor, including extracting methods that you make make private

If you make methods private during the refactoring step you should have no reason to explicitly test them. The most common reason people want to test private methods is that they made them private before writing the tests. In other words, they didn't test drive. Don't do this.

## It's not simple

Yeah I hear you, this site is about _Real World_ TDD and in the real world it's never that simple. Let's look at a reason you might want to write tests for a private method, even if you test drove the code in the first place.

We're gonna use a look at a simple application that calculates your mortgage. It's a small javascript app that you can find here[^2] if you like, but a picture should suffice:

![Mortgage Calculator](https://www.evernote.com/l/AAbcUnyWqsNPP4hAdwtMNdM8ye2YfZ9OfrAB/image.png)

I'm using Bootstrap and JQuery but otherwise there is no magic happening to create this, so don't worry if you're not an expert on Reangulember 2.3. In a follow up post I'm going to explain my setup for fast testing and development in JavaScript, but for this example you just need to know there is one object and one set of tests.

Let's take a look at the code so far. I've added comments to help you follow along.

```javascript
//Export class because we're using ES6 syntax.
export class MortgageCalculatorDlg {
  // Initialize the dialog with the JQuery form element
  static init($mortgageForm) {

    // Listen for the submit event
    // Note the (evt) => { is an ES6 arrow function, which is syntactic sugar for a JS callback function.
    $mortgageForm.submit((evt) => {
      // Get the values from the form
      var mortgage = $mortgageForm.find('input[name="homeCost"]').val();
      // Convert the term to months
      var term = $mortgageForm.find('input[name="term"]').val() * 12;
      // Convert the interest rate percentage to a decimal, then to per-month
      var interest = $mortgageForm.find('input[name="interest"]').val() / 100 / 12;

      // No term is one payment
      if (term == 0) {
        $("#result").text(mortgage);
      }
      // No interest means divide by term
      else if (interest == 0) {
        $("#result").text(mortgage / term);
      } else {
        // Use the mortgage calculation
        var interestPower = Math.pow(1 + interest, term);
        var interestTimesInterestPower = interest * interestPower;
        var payment = (mortgage * interestTimesInterestPower) /
          (interestPower - 1);

        $("#result").text(payment.toFixed(2));
      }
      evt.preventDefault();
    });
  }
};
```

Showing all the tests would become a little redundant, so here's the last one:

```javascript
it('respects the term and the interest rate (monthly)', () => {
  $('input[name="homeCost"]').val(100000);
  $('input[name="interest"]').val(3.92);
  $('input[name="term"]').val(30);

  $('#mortgage').submit();

  expect($('#result').text()).toEqual('472.81');
});
```
This code isn't great but it's not the worst you'll ever see. It's tested and working, but what happens if the boss asks for a new feature? Say factoring in a down payment, or calculating the total cost. We don't have easy access to the method doing the calculation and we have to test everything through the DOM. Those tests get ever more confusing as the the responsibilities of UI and calculation get mixed. They temptation is to take the call in the submit callback, which is private, and make it a public method on the class. Then you could test it. Indeed I do this with legacy code, but it's not the right approach here.

## Refactor

We're going to implement the feature for down payments, and before we do anything we're gonna refactor this code to make it simpler. Rather than extracting a public method we're going to extract a class to better conform to the Single Responsibility Principle[^3]. Looking at the code as is, everything in the if/else is calculating the mortgage so let's extract that.

```javascript
// The original dialog class
import {MortgageCalculator} from 'mortgage_calculator';

export class MortgageCalculatorDlg {
  static init($mortgageForm) {
    let valAsNumber = function(sel) {
      return Number($mortgageForm.find(sel).val());
    };

    $mortgageForm.submit((evt) => {
      var homeCost = valAsNumber('input[name="homeCost"]');
      var term = valAsNumber('input[name="term"]') * 12;
      var interest = valAsNumber('input[name="interest"]') / 100 / 12;

      var calculator = new MortgageCalculator({
        homeCost: homeCost,
        termInMonths: term,
        interestPerMonth: interest
      });
      $("#result").text(calculator.payment().toFixed(2));
      evt.preventDefault();
    });
  }
}
```

```javascript
// The new class for calculating mortgages
export class MortgageCalculator {

  constructor(options) {
    this.homeCost = options.homeCost;
    this.termInMonths = options.termInMonths;
    this.interestPerMonth = options.interestPerMonth;
  }

  payment() {
    if (this.termInMonths == 0) {
      return this.homeCost;
    } else if (this.interestPerMonth == 0) {
      return this.homeCost / this.termInMonths;
    } else {
      let interestPower = Math.pow(1 + this.interestPerMonth, this.termInMonths);
      let interestTimesInterestPower = this.interestPerMonth * interestPower;
      let payment = (this.homeCost * interestTimesInterestPower) /
        (interestPower - 1);

      return payment;
    }
  }
}
```

In addition to extracting the MortgageCalculator class I've made some small changes to the MortgageCalculatorDlg that make it's responsibility more clear. It takes data from the fields in HTML, coerces them to numbers, and send them to the MortgageCalculator. The MortgageCalculator ...calculates the mortgage.

## What About the Tests?

The tests are _unchanged_ and will remain so. For most of my career I've dogmatically moved tests whenever extracting a class from another, and I believe that was a mistake. If done simply to make sure every class has a matching test class, you spend an inordinate amount of time maintaining tests for very little benefit. Indeed you'll introduce mocks for no real reason, which can cause defects when mocks make incorrect assumptions about their collaborators. The rule I follow is if I extracted the object to be reused, then move the tests. If I extracted it for clarity or to write new tests against it, then I don't move the existing tests. Instead I'll move the existing tests when those change. Finally if the new collaborator doesn't require a mock because of dependencies like the database or web services, then I won't make one. This collaborator (MortgageCalculator) is deterministic and fast, so it does not require a mock. If I start swapping in different calculators to this form, which is unlikely, then I'll introduce a mock and move the existing tests.

This approach allows me to reduce maintenance costs caused by the overhead of tests, and defers decisions until I know that I need them.

## Now about that feature

Okay the boss wants us to account for a down payment. We could subtract that from the `homeCost` in the dialog, but that starts introducing calculation responsibility to the dialog and I'm trying to avoid that[^4]. So instead I'm going to add it to the class I just created:

Test:
```javascript
import {MortgageCalculator} from 'mortgage_calculator';

describe('MortgageCalculator', () => {

  it('subtracts the down payment from the mortgage', function() {
    var calculator = new MortgageCalculator({
      homeCost: 110000,
      downPayment: 10000,
      termInMonths: 360,
      interestPerMonth: 0.003266666667
    })

    expect(calculator.payment()).toEqual(472.814731573836);
  });
});
```

Note how the calculator's NEW test goes in the mortgage calculator spec, rather than the old tests. Also note how this tests uses numbers, rather than strings that come out of HTML forms.

And Code:
```javascript
constructor(options) {
  var downPayment = options.downPayment || 0;
  this.mortgageAmount = options.homeCost - downPayment;
  this.termInMonths = options.termInMonths;
  this.interestPerMonth = options.interestPerMonth;
}
```

The line `options.downPayment || 0` is required because `downPayment` is optional. This is good code but bad financing. Now I'm going to write another test for the UI:

```javascript
it('respects the down payment', () => {
  $('input[name="homeCost"]').val(1200);
  $('input[name="downPayment"]').val(200);
  $('input[name="interest"]').val(0);
  $('input[name="term"]').val(0);

  $('#mortgage').submit();

  expect($('#result').text()).toEqual('1000.00');
});
```

Pay attention here to how _simple_ this math is. I don't have to retest the math for calculating a mortgage[^5] because that's the responsibility of the `MortgageCalculator` object. Yes if the way mortgages are calculated is changed in ways that are fundamental to the way we buy houses, this will become wrong because the test is coupled to the calculation, but it's coupled to the simplest case that is very unlikely to change. If it does change, I'll fix it.

I'm making a bet here. My bet is that a mock is more likely to cause problems, including bugs, than testing a real object is.

```javascript
$mortgageForm.submit((evt) => {
  var homeCost = valAsNumber('input[name="homeCost"]');
  var term = valAsNumber('input[name="term"]') * 12;
  var interest = valAsNumber('input[name="interest"]') / 100 / 12;
  var downPayment = valAsNumber('input[name="downPayment"]');

  var calculator = new MortgageCalculator({
    homeCost: homeCost,
    termInMonths: term,
    interestPerMonth: interest,
    downPayment: downPayment
  });
```
Now I just move the down payment into the calculator, and the object works. This code isn't perfect. I've decoupled the dialog from the calculator in some respects. For instance I can fix a bug in the calculation of the mortgage without changing the mortgage dialog, and I can validate inputs in the dialog without changing the calculator, but I can't add variable interest rate or balloon payments without changing both places. That's fine, because we'll cross that bridge when those features are requested.

The next person who comes along the MortgageCalculator may wonder "where the hell[^6] are the tests!" It's a fair question and there will be some overhead when that person has to track down the other tests but I'm willing to trade the times I can't find the tests for a little while for the times where I move tests for no reason.

Finally you might wonder what happened to the thesis of the article - how do I test a private method? Well the answer is that a private method that you want to test, as opposed to just any old private method, is often a separate responsibility trying to get out. When you find yourself asking that question:

* Extract a class.
* Leave the tests as-is if the new class isn't going to be reused.
* Add new tests to the new object.

Private method tested, code improved, and there aren't even any yak sightings.

[^1]: 3,820,001 after this blog goes up.
[^2]: https://github.com/paytonrules/testing_private_methods
[^3]: https://en.wikipedia.org/wiki/Single_responsibility_principle
[^4]: Yes there are calculation responsibilities in the class but they convert the values in the dialog into values that the MortgageCalculator expect, and I believe that responsibility either belongs in the dialog or a third object. The third object provides no benefit, so I'm not going to write it at this time.
[^5]: In fact I think there may be a mistake in that calculation. Pull requests encouraged.
[^6]: Done that, although I rarely use the word "hell".

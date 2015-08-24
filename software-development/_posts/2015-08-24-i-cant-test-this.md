---
layout: ebomb
title: Help I Can't Test This!
---

In real world TDD you almost never get to write tests that look like this:

{% highlight javascript %}
describe("Stack", function() {

  it("should begin empty", function() {
    let stack = Stack.create();

    expect(stack.size()).toEqual(0);
  ));
});
{% endhighlight %}

The above is the typical first test in the Stack Kata - written in JavaScript. It seems nice because it's straightforward and easy to teach, but it ends up being a problematic example because nobody ever writes this kind of code unless they are doing a Kata. The beginner ends up struggling to apply their knowledge in the real world.

## A Real First Test....

I've been working with React for about a month or so, and while there's a lot to like it's a complete change of style from traditional JavaScript programming. Take this example:

![Simple App](https://www.evernote.com/l/AAZpn6R8AIdGx7cKs4wAYt68Rs_XUJryku0B/image.png)

The terrible UI above is meant to have the user select a country, and after user clicks "OK" update the flag to be the flag of the chosen country. Told you it was terrible. Now the React component may look something like this:

{% highlight javascript %}
class CountryUpdater extends React.Component {
  render() {
    return (
      <div>
        <CountrySelector country="USA" />
        <CountryImage country="USA" />
        <a href="#">Ok</a>
      </div>
    );
  }
};
{% endhighlight %}`

Don't worry if you don't understand the code above. I don't expect you to be an expert in React, and that's the point. Frequently you  aren't an expert in the technologies you are using. All you know at this point is that you want to respond to the OK button, and change the country for CountryImage to be the value selected in the CountrySelector. In React those are both being represented as individual components that don't talk to each other, and anyway that sounds like a Selenium test. What exactly can you do?

## You're Stumped

It turns out that React does have some good testing tools, and it's your job to find and learn those. That should be step one on how to deal with this code, but for the moment let's assume that you tried to find out how to test this code and couldn't. You searched and searched and just couldn't figure out how to click that OK button in a test.

Does that mean you just quit and go test-free?

## "I Don't Know How" Is Not An Excuse

Would you buy a car from somebody who told you that they didn't test it for safety because they didn't know how to? Of course not. The trick is to turn this code into something that's nearly as simple as the stack kata.

What if your first test was:

{% highlight javascript %}
describe("Country Selector", () => {

  it("Sets the state to the current country", () => {
    let updater = new CountryUpdater();

    updater.okButtonPressed("Peru");

    expect(updater.state.currentCountry).toEqual("Peru");
  });
});
{% endhighlight %}

You can make that pass by writing:

{% highlight javascript %}
class CountryUpdater extends React.Component {
  ...
  okButtonPressed(country) {
    this.setState({currentCountry: "Peru"});
  }
  ...
};
{% endhighlight %}

Well yippee skippy but where did that country come from? It's probably part of the `CountrySelector` component right? And you don't know how to test that do you?

You're right, you don't. But you can see in the test above that you can set the state of a component. Can you get a child component's state? It turns out you can through a React concept called refs. Start by putting a ref on the country selector:

{% highlight javascript %}
class CountryUpdater extends React.Component {
  render() {
    return (
      <div>
        <CountrySelector country="USA" ref="countrySelector" />
        <CountryImage country="USA" />
        <a href="#">Ok</a>
      </div>
    );
  }
};
{% endhighlight %}

Next modify the test to take an object that looks like a react component:

{% highlight javascript %}
describe("Country Selector", () => {

  it("Sets the state to the current country", () => {
    let updater = new CountryUpdater();

    updater.okButtonPressed({state:
      {selectedCountry: "Peru"}
    });

    expect(updater.state.currentCountry).toEqual("Peru");
  });
});
{% endhighlight %}

Make the code pass...

{% highlight javascript %}
class CountryUpdater extends React.Component {
  ...
  okButtonPressed(countryProp) {
    this.setState({currentCountry: countryProp.state.selectedCountry});
  }
  ...
};
{% endhighlight %}

We still haven't bound this function to anything. We can do that by creating a simple function that delegates to this function:

{% highlight javascript %}
class CountryUpdater extends React.Component {
  ...
  okButton() {
    this.okButtonPressed(this.refs.countrySelector);
  }
  ...
};
{% endhighlight %}

...and updating the rendered components to have an onClick handler.

{% highlight javascript %}
class CountryUpdater extends React.Component {
  ...
  render() {
    return (
      <div>
        <CountrySelector country="USA" ref="countrySelector" />
        <CountryImage country="USA" />
        <a href="#" onClick={this.okButton}>Ok</a>
      </div>
    );
  }
}
{% endhighlight %}

## What Did We Do?

A lot probaby flew over your head there so let's recap our problem:

* You don't know how to test React components
* You don't release untested code

What to do? Break it up into distinct parts - the parts you know how to test, and the parts you don't. The code above is not very good React, and it's not the best way to test React code. You should get to know the [React Test Utilities](https://facebook.github.io/react/docs/test-utils.html) and test that way. However when you are new to a framework or system you often are not writing the best possible code. If your choices are to write code that is less than perfect but tested, or to write code that is less than perfect but untested, the choice is easy.

---
layout: ebomb
title: How Many Lines Should be in a Class?
---

If there's one thing I know, it's that developers love to argue. It can be the important things like naming and design all the way down to silly things like where a curly braces should go[^1]. One thing we all can agree on is that software is easier when it's broken down into small chunks. We just don't agree on what small is.

How many lines should a class be?  This Clean Code [cheat sheet](http://www.planetgeek.ch/2013/06/05/clean-code-cheat-sheet/) says classes should be less than 100 lines, but it doesn't specify language or platform. Now take a look at [this thread](http://www.reddit.com/r/programming/comments/1fsvy3/clean_code_cheat_sheet/?limit=500) where people say things like:

"Putting a number on the amount of lines a class should have is something I disagree with." - [BeachBum09](http://www.reddit.com/user/BeachBum09)

"In some classes I'll spend at least 100 lines sanity checking responses," - [Kinglink](http://www.reddit.com/user/Kinglink)

"This is the kind of dogmatic, out-of-nowhere rule that's always bothered me from the XP crowd." - [alextk](http://www.reddit.com/user/alextk)

I could go on, but it's clear that we can't agree on a number of lines that makes a class too big, and I'm inclined to agree. Indeed how do you even count a line, do header files count? Curly braces? And if so, does that mean a class in Ruby can have far more functionality than one in C++ or Objective-C? Should every String, List and Hash implementation be rewritten to be under 100 lines? That's gonna take a while.

## You're measuring the wrong thing

The real reason we can't agree on a number of lines is that there is no right number. It's not lines that matters, it's cohesion. To borrow from good old wikipedia - cohesion refers to the degree to which the elements of a module belong together. We also refer to this as the Single Responsibility Principle, but the SRP is more easily identified when a module changes. When we have to change a class for more than one reason we break it up into multiple classes. How do we identify a class that has poor cohesion before it becomes a problem?

Look to the Tests

When I started this I was going to tell you to look into [LCOM4](http://www.aivosto.com/project/help/pm-oo-cohesion.html#LCOM4) as a guideline, and you should probably still read that but the truth is there's a simpler way to tell and you can look to the tests.  I'll use Ruby for this example (borrowed partially from [RSpec Rails docs](http://www.relishapp.com/rspec/rspec-rails/docs/controller-specs)):

{% highlight ruby %}
RSpec.describe TeamsController do
  describe "GET index" do
    it "assigns @teams" do
      team = Team.create
      get :index
        expect(assigns(:teams)).to eq([team])
    end

    it "renders the index template" do
      get :index
      expect(response).to render_template("index")
    end
  end

  describe "POST team" do
    it "creates a team" do
      post :team

      expect(Team.count).to eq(1)
    end
  end
end
{% endhighlight %}

Nested describe/context blocks, or multiple test classes, for the same class are a sign. I won't say smell, because there are many legitimate reasons to have more than one context for testing a class, but they are a certain hint. Note here how we have two descriptions of a class but they share nothing. There is no data being changed in each one, indeed the POST request doesn't need to look at the @teams instance variable. This is because Rails controllers typically aren't cohesive. POST and GET are only related by web urls, and don't share data. Indeed a Rails controller won't have state at all by definition. Each request is new.

So Rails controllers are not particularly cohesive, and we can see that when we look at a spec, but what does that tell us about code generally? Well when you have to use many contexts for a test class it's a sign that the class itself has more than one responsibility. Each context could likely be it's own class, and it's a far better test than how many lines you've written.

Until next week, take a look at my upcoming [Guide to Real World TDD](http://www.relishapp.com/rspec/rspec-rails/docs/controller-specs) filled with more tips like this!

[^1]: Curly braces should go on the next line, except in JavaScript. C'mon everybody knows that.

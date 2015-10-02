---
layout: ebomb
title: Do I need TDD with BDD?
---

Did you hear? BDD replaced TDD!  Now we all just write[:1]:

```ruby
Scenario: Customer has a broker policy so DOB is requested
  Given I have a "Broker" policy
  When I submit my policy number
  Then I should be asked for my date of birth
```

And boom just implement it through the front end and you're done! Easy peasy lemon squeezy.

Of course you're probably shaking your head at this. What do I do when I don't have a broker policy? How do I submit a policy number? Won't this result in a huge amount of tests you can't maintain? How is this cucumber any different than any of the other silver bullet UI frameworks? I want my TDD back!

## You're Just Confused

I hate to do this to you, but I'm gonna give you a couple definitions. Don't worry I won't cite wikipedia yet:

**TDD** - 

_Dream_:I write the write tests, easily, at the right times. I don't feel stupid.

_Fix_:Cuckes !== BDD. Cukes are Cukes. Your tests can have more behavior at your choosing.

[^1]:Example from Aslaks blog at: https://cucumber.io/blog/2015/03/24/single-source-of-truth

[^1]:http://dannorth.net/introducing-bdd/

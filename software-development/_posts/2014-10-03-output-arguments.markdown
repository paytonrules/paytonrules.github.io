---
layout: default
title: On Output Arguments
---
In _Clean Code_ Bob Martin disparages output arguments, saying "In general output arguments should be avoided." But are they always bad? This was the question [posed](https://groups.google.com/forum/#!topic/clean-code-discussion/uLOAGBPRcMU) at the Clean Coders google group that prompted this post.

Words like "always" apply universal laws which are almost never found in software development, so the simple answer to that question is no, output arguments are not always bad. That said I can't think of a place where I prefer them, and only use them where I have to because Frameworks or tools don't allow them.  Lets take the example from the .NET framework for instance: int.TryParse(string, out int). This method returns a boolean marking the success or failure of the parsing and fills the out parameter with the pasrsed value if it exists. If the parsing fails - well I'm sure the documentation provides a value but it's not intutive from the function. It must get something since it won't compile without it.

If I was in charge of the .NET framework, and I'm not, I would have preferred two methods. One to check if a value can be parsed and one to parse it. In this case .NET doesn't provide a int.IsInteger(string) but it really should. That way the code could read:

```
if (int.IsInteger(string))
  myInt = int.Parse(string)
```

Indeed eventually most .NET programmers I know end up writing wrappers that match that signature, especially the IsInteger check. The root cause is the method TryParse is in charge of parsing integers and telling you if you could parse a string into an integer, violating both the Command/Query and the Single Responsibility principles. So if you want to check if a string is an integer you have to call TryParse, and ignore the output value that you are required to provide. So what do people do? They write a method called IsInteger that wraps TryParse.

Every time I wrack my brain for a solution where output arguments are better, I draw a blank. If you despise exceptions I suppose that output parameters win, but in that scenario I'd still prefer multiple return arguments in my language. C# sort of has mutliple returns in it's languge through explicit out parameters, granted with a funky syntax, but you aren't allowed to ignore them so they don't really count.

I'm sure somebody can come up with a scenario where the best solution is output arguments, but they are few and far between.

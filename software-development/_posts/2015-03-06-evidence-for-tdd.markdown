---
layout: ebomb
title: The Evidence For TDD
---

This blog was going to be something completely different.

Every week I do some trawling around the internet, looking for problems people are having that I can fix. This week I found a lot of comments like this:

>Once a programming team has adopted a methodology it’s almost inevitable that a few members of the team, or maybe just one bully, will demand strict adherence and turn it into a religion.[^1]

There are alot of software developers who feel this way. Agile is a "religion" or "cult" masquarading as serious software development. I really wanted to disagree, but the truth is that those of us in the Agile Development community do act like cultists. This is particular true of TDDites. Once a developer becomest test-infected they begin to treat any developer who doesn't write tests like they are lazy, or an idiot. We stop asking ourselves why we test and start asking others questions like "don't you want your code to work?" As if that's helpful.

## The Burden of Proof is On You

While we might think TDD is a universally accepted practice, most teams don't do it. It's not because they're lazy or stupid, it's largely because they don't believe it's helpful. Rather than shouting them down or dismissing them, the time has come to back up our arguments in favor of this strange practice with facts. To that end I've collected a bunch of papers that show actual evidence, as opposed to anecdotal evidence, of TDD working. I'd love to see what you have.

**On the Effectiveness of Test-first Approach to Programming**<br/>
Hakan Erdogmus, Maurizio Morisio, Member, IEEE Computer Society, and Marco Torchiano<br/>
NRC Institute for Information Technology; National Research Council Canada

This is an interesting [paper](http://nparc.cisti-icist.nrc-cnrc.gc.ca/npsi/ctrl?action=shwart&index=an&req=5763742&lang=en) where the authors did an experiment comparing a "Test After" approach with a "Test Driven" approach. The result?

> Our main result is that Test-First programmers write more tests per unit of programming effort. In turn, a higher number of programmer tests lead to proportionally higher levels of productivity.

That's right - they were MORE productive with tests, not less. Remember that next time somebody says they don't have time for testing. To read the paper you'll need to click "view deposited version."

**Test-Driven Development as a Defect-Reduction Practice**<br/>
Laurie Williams, E. Michael Maximilien, Mladen Vouk<br/>
North Carolina State University, Department of Computer Science<br/>
IBM Corporation and North Carolina State University<br/>

NC State partnered with IBM to do a study on defect reduction with TDD. The results, from the [abstract](http://collaboration.csc.ncsu.edu/laurie/Papers/williamsltestDrivenDevelopment.pdf).

>In this case study, we found that the code developed using a test-driven development practice showed, during functional verification and regression tests, approximately 40% fewer defects than a baseline prior product developed in a more traditional fashion.  The productivity of the team was not impacted by the additional focus on producing automated test cases.

40% fewer defects and productivity was _not impacted_, but of course in a real world scenario they'd have to fix those defects - so I'd argue productivity improved.

**Realizing quality improvement through test driven development: results and experiences of four industrial teams**<br/>
Nachiappan Nagappan & E. Michael Maximilien & Thirumalesh Bhat & Laurie Williams<br/>

This [paper](http://research.microsoft.com/en-us/groups/ese/nagappan_tdd.pdf), which also has E. Michael Maximilien and Laurie Williams as authors, had studies done with Microsoft and IBM. The results:

>The results of the case studies indicate that the pre-release defect density of the four products decreased between 40% and 90% relative to similar projects that did not use the TDD practice. Subjectively, the teams experienced a 15–35% increase in initial development time after adopting TDD.

So some increase in development time but a drastic reduction in defects. I think it's interesting to contrast with the first study that claimed an increase in productivity. This is just a guess, but students (the subjects of the first paper) can't turn in incomplete work. It's either done, or not finished, but professional programmers turn in incomplete work (code with bugs) all the time. Bug free code takes a little bit more time.

**Evaluating the Efficacy of Test-Driven Development: Industrial Case Studies**<br/>
Thirumalesh Bhat, Nachiappan Nagappan<br/>
Center for Software Excellence, Microsoft Research

This is a [study](http://www.msr-waypoint.com/en-us/groups/ese/fp17288-bhat.pdf) done entirely by Microsoft. Once again:

>We observed a significant increase in quality of the code (greater than two times) for projects developed using TDD compared to similar projects developed in the same organization in a non-TDD fashion.

I haven't found anything yet that says there isn't an increase in quality or that the amount of time spent isn't worthwhile, so remember that the next time your boss tells you to stop writing those stupid tests.

[^1]: http://typicalprogrammer.com/why-dont-software-development-methodologies-work/

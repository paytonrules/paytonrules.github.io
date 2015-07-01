---
layout: simple
---
<div class="row title">
  <h1>Agile Let Us Down</h1>
</div>
<div class="row">
  <p class="mini_pitch">
    Scrum (or XP or Kanban or just Agile) has failed us. We still have crunch mode, death marches, and buggy software.
  </p>
  <p class="mini_pitch">
    Fortunately writing clean, tested code that you enjoy isn't a function of process. It's a function of technical skill and you DON'T have to ask for permisssion.
  </p>
  <p class="emphasized"><a href="/book.html">Start Doing Real World TDD Now!</a></p>
</div>

<div class="row">
  <img class="bio" src="http://www.gravatar.com/avatar/50a0ab317d34860d16f8e2f9da4313fc?s=135" alt="A picture of me"/>

  <p>
    Eric Smith (me) is a Polyglot <a href="https://github.com/paytonrules">developer</a>, trainer, and writer. I'm currently workin on the <a href="/book.html">The Guide to Real World TDD</a> featuring real word problems for full stack developers.
  </p>
  <p>By day I'm the Director of Training Services at <a href="http://www.8thlight.com">8th Light</a>, by night I'm the proud dad of 5 kids and happily married to a QA Engineer.</p>
  <p>Follow me on <a href="https://twitter.com/paytonrules">twitter</a>, and anyplace you find the tag paytonrules it's probably me.</p>
</div>

<div class="row">
  <div class="six columns">
    <h2>New Here?</h2>
    <ul>
      <li><a href="/software-development/2015/01/13/how-to-learn-tdd.html">How to Learn TDD</a></li>
      <li><a href="/software-development/2015/03/06/evidence-for-tdd.html">The Evidence For TDD</a></li>
      <li><a href="/software-development/2015/01/24/one-practice-to-adopt-today.html">The One Practice To Adopt Today</a></li>
    </ul>
  </div>
  <div class="six columns ">
    <h2>The Latest Stuff</h2>
    <ul class="posts">
      {% for post in site.posts limit:4 %}
      <li>
        <span>{{ post.date | date_to_string }}</span> &raquo;
        <a href="{{ BASE_PATH }}{{ post.url }}">
          {{ post.title }}</a>
      </li>
      {% endfor %}
    </ul>
  </div>
</div>

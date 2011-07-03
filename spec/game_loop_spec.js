
// What are my requirements
// It calls 60 times a second
// You'll want to make a version of your game which attaches itself to a gameLoop
// Goal is to get the hack you have on the website into a one liner on the web page
// Next Goal move it around
// Next goal double buffering 
// Next Goal sound
// Use some JS type modules and such
// Write a game design (SIMPLE!)
var StoppingLoopFailure = {
  name: "TestFailure",
  message: "You are not stopping the loop"
};

var CallCounterUpTo = function(maximum) {
  var calls = 0;
  this.call = function() {
    calls += 1;
    if (calls == maximum) {
      this.stop();
    }
    else if (calls > maximum) {
      throw StoppingLoopFailure;
    }
  };

  this.calls = function() {
    return calls;
  };

  this.completed = function() {
    return calls == maximum;
  };
};


describe('Game#loop', function() {
  var game;
  beforeEach( function() {
    Game = require("specHelper").Game;
    game = new Game();
  });

  it('Executes update until stopped', function() {
    var counter = new CallCounterUpTo(2);
    
    game.draw = function() {};
    game.update = counter.call; 

    game.start();

    waitsFor(function() {
      return (counter.completed());
    }, "Updates never complete", 500);
  });

  it('executes draw until stopped as well', function() {
    var counter = new CallCounterUpTo(2);
    
    game.update = function() {};
    game.draw = counter.call;

    game.start();

    waitsFor(function() {
      return (counter.completed());
    }, "Draws never complete", 500);
  });


  it('calls update 50 times per second', function() {
    var before; 
    var counter = new CallCounterUpTo(5);
    
    game.draw = function () {};
    game.update = counter.call;

    startTime = (new Date()).getTime();
    game.start();

    waitsFor(function() {
      return (counter.completed());
    }, "Calls never complete", 101);

    runs (function() {
      endTime = (new Date()).getTime();
      expect(endTime - startTime).toBeGreaterThan(99);
    });

  });

  it('calls draw 50 times per second', function() {
    var before; 
    var counter = new CallCounterUpTo(5);
    
    game.update = function () {};
    game.draw = counter.call;

    startTime = (new Date()).getTime();
    game.start();

    waitsFor(function() {
      return (counter.completed());
    }, "Calls never complete", 101);

    runs (function() {
      endTime = (new Date()).getTime();
      expect(endTime - startTime).toBeGreaterThan(99);
    });

  });

});

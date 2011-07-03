
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
};


describe('Game#loop', function() {
  var game;
  beforeEach( function() {
    Game = require("specHelper").Game;
    game = new Game();
  });

  it('Executes update until stopped', function() {
    var counter;
    game.draw = function() {};
    
    counter = new CallCounterUpTo(10);
    game.update = counter.call; 

    game.start();

    waitsFor(function() {
      return (counter.calls() === 10);
    }, "Calls never gets to 10", 1001);

    runs (function() {
      expect(counter.calls()).toEqual(10);
    });
  });

  it('executes draw until stopped as well', function() {
    var counter;
    game.update = function() {};
    
    counter = new CallCounterUpTo(10);
    game.draw = counter.call;

    game.start();

    waitsFor(function() {
      return (counter.calls() === 10);
    }, "Calls never gets to 10", 1001);

    runs (function() {
      expect(counter.calls()).toEqual(10);
    });
  });


  it('calls update 50 times per second', function() {
    var before, counter;
    game.draw = function () {};

    counter = new CallCounterUpTo(50);
    game.update = counter.call;

    startTime = (new Date()).getTime();

    game.start();

    waitsFor(function() {
      return (counter.calls() === 50);
    }, "Calls never gets to 50", 1001);

    runs (function() {
      endTime = (new Date()).getTime();
      expect(endTime - startTime).toBeGreaterThan(999);
    });

  });

});

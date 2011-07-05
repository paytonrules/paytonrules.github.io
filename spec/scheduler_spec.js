var CallCounterUpTo = function(maximum) {
  var calls = 0;
  this.call = function() {
    calls += 1;
    if (calls == maximum) {
      this.stop();
    }
  };

  this.completed = function() {
    return (calls === maximum);
  };
};

describe("Game#scheduler", function() {
  var Game, counter, loop;
  beforeEach( function() {
    Game = require('specHelper').Game;
    counter = new CallCounterUpTo(2);
    loop = {
      loop: counter.call
    };
  });
    
  it('schedules a loop which is called until stopped', function() {
    var scheduler = new Game.Scheduler(loop, 100);

    scheduler.start();

    waitsFor(function() {
      return (counter.completed());
    }, "Calls never complete", 1001);
  });

  it('calls that method with the tick rate', function() {
    var framesPerSecond = 10;
    var scheduler = new Game.Scheduler(loop, framesPerSecond);
    var startTime;

    startTime = (new Date()).getTime();
    
    scheduler.start();
    
    waitsFor(function() {
      return (counter.completed());
    }, "Calls never complete", 1001);
    
    runs(function() {
      var doneTime = (new Date()).getTime();
      expect(doneTime - startTime).toBeGreaterThan(199);
      expect(doneTime - startTime).toBeLessThan(210);
    });
   
  });
});

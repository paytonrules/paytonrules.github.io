var CallCounterUpTo = function(maximum) {
  var calls = 0;
  this.call = function(scheduler) {
    calls += 1;
   
    if (calls === maximum) {
      scheduler.stop();
    }
    
  };

  this.completed = function() {
    return (calls === maximum);
  };

  this.getCalls = function() {
    return calls;
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
    
  it('schedules method called for repeated calls', function() {
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

  it('stops calling after ...it stops', function() {
    var scheduler = new Game.Scheduler(loop, 100);

    scheduler.start();

    waitsFor(function() {
      return (counter.completed());
    }, "Calls didn't complete", 100);

    waits(400);

    runs(function() {
      expect(counter.getCalls()).toEqual(2);
    });
  });

});

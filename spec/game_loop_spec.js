// What are my requirements
// Schedule the loop
// Draw your text
// Next Goal move it around
// Next Goal sound
// Use some JS type modules and such
// Write a game design (SIMPLE!)


describe('Game#loop', function() {
  var game, scheduler;
  
  var MockScheduler = function() {
    var ticks = 0;
    this.getTicks = function() {
      return ticks;
    },

    this.getTickTime = function() {
      return 1;
    },

    this.tick = function() {
      ticks += 1;
    }
  };
  
  var CallCounter = function(callback) {
    var calls = 0;
    this.call = function() {
      calls += 1;
      if (typeof(callback) !== "undefined") {
        callback();
      }
    };

    this.calls = function() {
      return calls;
    };
  };

  beforeEach( function() {
    Game = require("specHelper").Game;
    scheduler = new MockScheduler();
    game = new Game(scheduler);
  });


  it('executes draw', function() {
    game.update = function() {};
    game.draw = function() {
      game.drawn = true;
    };

    game.loop();

    expect(game.drawn).toBeTruthy();
  });

  it('Executes update, provided time has passed since the last loop call', function() {
    game.draw = function() {};
    game.update = function () {
      game.updated = true;
    };

    scheduler.tick();
    game.loop();

    expect(game.updated).toBeTruthy();
  });

  it('executes multiple updates to catch up if the draw takes a long time', function() {
    var draws = new CallCounter(function() {
      scheduler.tick();
    });

    var updates = new CallCounter();

    game.draw = draws.call;
    game.update = updates.call;

    scheduler.tick();
    game.loop();
    scheduler.tick();
    game.loop();

    expect(draws.calls()).toEqual(2);
    expect(updates.calls()).toEqual(3);
  });

  it('delegates stop to the scheduler', function() {
    scheduler.stop = function() {
      scheduler.stopped = true;
    };

    game.stop();

    expect(scheduler.stopped).toBeTruthy();
  });
});

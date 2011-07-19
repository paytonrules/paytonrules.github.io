// What are my requirements
// Schedule the loop
// Draw your text
// Next Goal move it around
// Next Goal sound
// Use some JS type modules and such
// Write a gameLoop design (SIMPLE!)


describe('Game#loop', function() {
  var gameLoop, scheduler;
  
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
    this.call = function(state) {
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
    gameLoop = new Game.FixedStepGameLoop(scheduler);
  });

  it('executes draw', function() {
    gameLoop.update = function(state) {};
    gameLoop.draw = function(state) {
      gameLoop.drawn = true;
    };

    gameLoop.loop();

    expect(gameLoop.drawn).toBeTruthy();
  });

  it('Executes update, provided time has passed since the last loop call', function() {
    gameLoop.draw = function(state) {};
    gameLoop.update = function (state) {
      gameLoop.updated = true;
    };

    scheduler.tick();
    gameLoop.loop();

    expect(gameLoop.updated).toBeTruthy();
  });

  it('Passes the state from the update to the draw', function() {
    gameLoop.update = function(state) {
      state.update_message = 'Yes I was';
    };

    gameLoop.draw = function(state) {
      gameLoop.update_message = state.update_message;
    };

    scheduler.tick();
    gameLoop.loop();

    expect(gameLoop.update_message).toEqual('Yes I was');
  });

  it('executes multiple updates to catch up if the draw takes a long time', function() {
    var draws = new CallCounter(function() {
      scheduler.tick();
    });

    var updates = new CallCounter();

    gameLoop.draw = draws.call;
    gameLoop.update = updates.call;

    scheduler.tick();
    gameLoop.loop();
    scheduler.tick();
    gameLoop.loop();

    expect(draws.calls()).toEqual(2);
    expect(updates.calls()).toEqual(3);
  });

  it('delegates stop to the scheduler', function() {
    scheduler.stop = function() {
      scheduler.stopped = true;
    };

    gameLoop.stop();

    expect(scheduler.stopped).toBeTruthy();
  });
});

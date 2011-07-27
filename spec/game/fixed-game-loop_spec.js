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
  });


  it('executes draw', function() {
    var updater = {update: function() {}};
    var drawer = {
      draw: function(state) { 
        gameLoop.drawn = true;
      }
    };

    gameLoop = new Game.FixedStepGameLoop(scheduler, updater, drawer);
    gameLoop.loop();

    expect(gameLoop.drawn).toBeTruthy();
  });

  it('Executes update, provided time has passed since the last loop call', function() {
    var drawer = {draw: function() {}};
    var updater = {
      update: function(state) {
        gameLoop.updated = true;
      }
    };

    gameLoop = new Game.FixedStepGameLoop(scheduler, updater, drawer);
    scheduler.tick();
    gameLoop.loop();

    expect(gameLoop.updated).toBeTruthy();
  });


  it('Passes the state from the update to the draw', function() {
    var updater = {
      update: function(state) {
        state.update_message = 'Yes I was';
      }
    };

    var drawer = {
      draw: function(state) {
        gameLoop.update_message = state.update_message;
      }
    };

    gameLoop = new Game.FixedStepGameLoop(scheduler, updater, drawer);
    scheduler.tick();
    gameLoop.loop();

    expect(gameLoop.update_message).toEqual('Yes I was');
  });

 it('executes multiple updates to catch up if the draw takes a long time', function() {
   var draws = new CallCounter(function() {
     scheduler.tick();
   });

   var updates = new CallCounter();
   var drawer = {draw: draws.call};
   var updater = {update: updates.call};

   gameLoop = new Game.FixedStepGameLoop(scheduler, updater, drawer);
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

   gameLoop = new Game.FixedStepGameLoop(scheduler, {}, {});
   gameLoop.stop();

   expect(scheduler.stopped).toBeTruthy();
 });

 it('delegates start to the scheduler, passing it its loop method', function() {
   scheduler.start = function(loop) {
     scheduler.loop = loop;
   };

   gameLoop = new Game.FixedStepGameLoop(scheduler, {}, {});
   gameLoop.start();

   expect(scheduler.loop).toEqual(gameLoop.loop);
 });

});
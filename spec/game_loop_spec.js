
// What are my requirements
// TDD a gameloop.  It calls a 'draw' and an 'update'
// Those can be handles
// It calls 60 times a second
// You'll want to make a version of your game which attaches itself to a gameLoop
// Goal is to get the hack you have on the website into a one liner on the web page
// Next Goal move it around
// Next goal double buffering 
// Next Goal sound
// Use some JS type modules and such
// Write a game design (SIMPLE!)
describe('GameLoop', function() {
  var game;
  beforeEach( function() {
    game = require("specHelper").Game;
  });

  it('Executes its update function', function() {
    game.update = function() {
      game.updated = true;
    };
    game.draw = function() {};

    game.loop();

    expect(game.updated).toBeTruthy();
  });

  it('Executes its draw function', function() {
    game.draw = function() {
      game.drawn = true;
    };

    game.loop();

    expect(game.drawn).toBeTruthy();
  });

  it('Calls update and draw 30 times in one half second', function() {
    spyOn(game, 'update');
    spyOn(game, 'draw');

    game.start();

    waitsFor(function() {
      return (Game.update.callCount == 30) && (Game.draw.callCount == 30);
    }, "Did not call thirty times", 505);

    runs(function() {
      expect(Game.update.callCount).not.toEqual(60);
    });

  });

  it('Calls update and draw 60 times in one second', function() {
    spyOn(game, 'update');
    spyOn(game, 'draw');
    
    game.start();

    waitsFor(function() {
      return (Game.update.callCount == 60) && (Game.draw.callCount == 60);
    }, "Did not call sixty times", 1015);

  });

/*
 *  it('Stops updating after a stop call', function() {
 *    spyOn(game, 'update');
 *
 *    game.start();
 *    
 *    waitsFor(function() {
 *      return (Game.update.callCount == 1);
 *    }, "Update once", 1000);
 *
 *    runs(function() {
 *      game.stop();
 *    });
 *
 *    waits(1000);
 *
 *    runs(function() {
 *      expect(Game.update.callCount).toEqual(1);
 *    });
 *
 *  });
 */
});

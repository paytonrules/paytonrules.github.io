describe('GameLoop', function() {
  var Game;
  beforeEach( function() {
     Game = require("specHelper");
  });

  it('starts the loop counter at 0', function() {
    expect(Game.loopCounter()).toEqual(0);
  });

  it('increments the loop counter after running the game loop', function() {
    Game.gameLoop();

    expect(Game.loopCounter()).toEqual(1);
  });
});

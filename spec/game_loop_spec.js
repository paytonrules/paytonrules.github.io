describe('GameLoop', function() {
  var gameLoop;
  beforeEach( function() {
    require("specHelper");
     gameLoop = require("specHelper").gameLoop;
  });

  it('starts the loop counter at 0', function() {
    expect(gameLoop.loopCounter()).toEqual(0);
  });

  it('increments the loop counter after running the game loop', function() {
    gameLoop.gameLoop();

    expect(gameLoop.loopCounter()).toEqual(1);
  });
});

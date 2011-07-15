describe("Game Screen", function() {
  var $, Game;

  beforeEach(function() {
    $ = require("jquery");
    Game = require("specHelper").Game;
  });

  it("is created with a canvas context", function() {
    var canvas = $("<canvas></canvas");
    var screen = new Game.Screen(canvas[0].getContext("2d"));

    expect(screen).not.toBeUndefined();
  });

});

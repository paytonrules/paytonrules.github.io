describe("Updater", function() {
  var Breakout, updater, state;

  beforeEach( function() {
    Breakout = require("specHelper").Breakout;
    updater = new Breakout.Updater({loadImage: function() {}});
    state = {};
  });

  it("loads the paddle image", function () {
    var assets = {};
    assets.loadImage = function(key, src)  {
      assets.key = key;
      assets.src = src;
    };

    var anotherUpdater = new Breakout.Updater(assets);

    expect(assets.key).toEqual("paddle");
    expect(assets.src).toEqual("images/baddie.png");
  });

  it("moves the paddle right for a right keydown", function() {
    updater.keydown({which: 39});

    updater.update(state);

    expect(state.paddle.x).toEqual(51);
  });

  it("moves the paddle left for a left keydown", function() {
    updater.keydown({which: 37});

    updater.update(state);

    expect(state.paddle.x).toEqual(49);
  });

  it("initializes y to 50", function() {
    updater.update(state);

    expect(state.paddle.y).toEqual(50);
  });
});

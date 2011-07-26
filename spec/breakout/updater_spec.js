describe("Updater", function() {
  var Breakout, updater, state;

  beforeEach( function() {
    Breakout = require("specHelper").Breakout;
    Breakout.INITIAL_POSITION = 320;
    Breakout.PADDLE_ROW = 400;
    Breakout.PADDLE_VELOCITY = 10;

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

  it("moves the paddle right the velocity for a right keydown", function() {
    updater.keydown({which: 39});

    updater.update(state);

    var newPosition = Breakout.INITIAL_POSITION + Breakout.PADDLE_VELOCITY;
    expect(state.paddle.x).toEqual(newPosition);
  });

  it("moves the paddle left for a left keydown", function() {
    updater.keydown({which: 37});

    updater.update(state);
    
    var newPosition = Breakout.INITIAL_POSITION - Breakout.PADDLE_VELOCITY;
    expect(state.paddle.x).toEqual(newPosition);
  });

  it("sets y to Breakout.paddle_row", function() {
    updater.update(state);

    expect(state.paddle.y).toEqual(Breakout.PADDLE_ROW);
  });

  it("moves to the right the entire time the key is pressed (not just for events)", function() {
    updater.keydown({ which: 39} );

    updater.update(state);
    updater.update(state);

    var newPosition = Breakout.INITIAL_POSITION + (Breakout.PADDLE_VELOCITY * 2); 
    expect(state.paddle.x).toEqual(newPosition);
  });

  it("stops moving right when the key is released", function() {
    updater.keydown({ which: 39} );

    updater.update(state);
    updater.keyup({which: 39} );

    updater.update(state);

    var newPosition = Breakout.INITIAL_POSITION + Breakout.PADDLE_VELOCITY; 
    expect(state.paddle.x).toEqual(newPosition);
  });

});

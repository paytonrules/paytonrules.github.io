describe("Updater", function() {
  var Breakout, updater, imageList;

  beforeEach( function() {
    Breakout = require("specHelper").Breakout;
    Breakout.INITIAL_POSITION = 320;
    Breakout.PADDLE_ROW = 400;
    Breakout.PADDLE_VELOCITY = 10;

    updater = new Breakout.Updater({loadImage: function() {}});
    imageList = [];
  });

  it("loads the paddle image", function () {
    var assets = {
      loadImage: function() {}
    };

    spyOn(assets, "loadImage");

    var anotherUpdater = new Breakout.Updater(assets);

    expect(assets.loadImage).toHaveBeenCalledWith('paddle', 'images/baddie.png');
  });

  it("loads the ball image", function () {
    var assets = {
      loadImage: function() {}
    };

    spyOn(assets, "loadImage");

    var anotherUpdater = new Breakout.Updater(assets);

    expect(assets.loadImage).toHaveBeenCalledWith('ball', 'images/baddie.png');
  });

  it("Starts the ball just above the paddle", function() {
    updater.update(imageList);

    var ball = _(imageList).detect(function(image) {
      return (image.name === 'ball');
    });

    expect(ball.location.x).toEqual(Breakout.INITIAL_POSITION);
    expect(ball.location.y).toEqual(Breakout.INITIAL_BALL_ROW); 
  });

  it("moves the paddle right the velocity for a right keydown", function() {
    updater.keydown({which: Game.KeyCodes.RIGHT_ARROW});

    updater.update(imageList);

    var paddle = _(imageList).detect(function(image) {
      return (image.name === 'paddle');
    });

    var newPosition = Breakout.INITIAL_POSITION + Breakout.PADDLE_VELOCITY;
    expect(paddle.location.x).toEqual(newPosition);
  });

  it("moves the paddle left for a left keydown", function() {
    updater.keydown({which: Game.KeyCodes.LEFT_ARROW});

    updater.update(imageList);
 
    var paddle = _(imageList).detect(function(image) {
      return (image.name === 'paddle');
    });
   
    var newPosition = Breakout.INITIAL_POSITION - Breakout.PADDLE_VELOCITY;
    expect(paddle.location.x).toEqual(newPosition);
  });

  it("sets y to Breakout.paddle_row", function() {
    updater.update(imageList);

    var paddle = _(imageList).detect(function(image) {
      return (image.name === 'paddle');
    });
    
    expect(paddle.location.y).toEqual(Breakout.PADDLE_ROW);
  });

  it("moves to the right the entire time the key is pressed (not just for events)", function() {
    updater.keydown({ which: Game.KeyCodes.RIGHT_ARROW} );

    updater.update([]);
    updater.update(imageList);

    var paddle = _(imageList).detect(function(image) {
      return (image.name === 'paddle');
    });
    
    var newPosition = Breakout.INITIAL_POSITION + (Breakout.PADDLE_VELOCITY * 2); 
    expect(paddle.location.x).toEqual(newPosition);
  });

  it("stops moving right when the key is released", function() {
    updater.keydown({ which: Game.KeyCodes.RIGHT_ARROW} );

    updater.update([]);
    updater.keyup({which: Game.KeyCodes.RIGHT_ARROW} );

    updater.update(imageList);

    var paddle = _(imageList).detect(function(image) {
      return (image.name === 'paddle');
    });
    
    var newPosition = Breakout.INITIAL_POSITION + Breakout.PADDLE_VELOCITY; 
    expect(paddle.location.x).toEqual(newPosition);
  });

  it("doesn't move left or right if both keys are pressed", function() {
    updater.keydown({ which: Game.KeyCodes.RIGHT_ARROW} );
    updater.keydown({ which: Game.KeyCodes.LEFT_ARROW} );

    updater.update([]);
    updater.update(imageList);

    var paddle = _(imageList).detect(function(image) {
      return (image.name === 'paddle');
    });

    expect(paddle.location.x).toEqual(Breakout.INITIAL_POSITION);
  });

});

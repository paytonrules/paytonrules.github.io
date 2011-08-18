describe("Updater", function() {
  var Breakout, updater, imageList, mockBall;

  beforeEach( function() {
    Breakout = require("specHelper").Breakout;
    Breakout.INITIAL_POSITION = 320;
    Breakout.PADDLE_ROW = 400;
    Breakout.PADDLE_VELOCITY = 10;

    mockBall = new Breakout.Ball();
    Test = {
      MockBall: function() {
        return mockBall;
      }
    };

    Breakout.GameRecipie['ball'] = Test.MockBall;

    updater = new Breakout.Updater({loadImage: function() {}});
    imageList = [];
  });

  it("loads the images", function () {
    spyOn(Breakout.ImageLoader, "load");
    var assets = {};

    var anotherUpdater = new Breakout.Updater(assets);

    expect(Breakout.ImageLoader.load).toHaveBeenCalledWith(assets);
  });

  it("Updates the ball", function() {
    spyOn(mockBall, "update");
    
    updater.update(imageList);

    expect(mockBall.update).toHaveBeenCalledWith(imageList);
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

    updater.update(imageList);

    var paddle = _(imageList).detect(function(image) {
      return (image.name === 'paddle');
    });

    expect(paddle.location.x).toEqual(Breakout.INITIAL_POSITION);
  });

  it("launches the ball in launch direction on the spacebar", function() {
    spyOn(mockBall, "launch");
    updater.keydown({ which: Game.KeyCodes.SPACEBAR } );

    expect(mockBall.launch).toHaveBeenCalled();
  });

});

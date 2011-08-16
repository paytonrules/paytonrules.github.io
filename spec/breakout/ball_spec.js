describe("Ball", function() {
  var Breakout;
  
  beforeEach( function() {
    Breakout = require("specHelper").Breakout;
  });

  it("starts at the INITIAL_POSITION and INITIAL_BALL_ROW", function() {
    var ball = Breakout.Ball;

    expect(ball.x).toEqual(Breakout.INITIAL_POSITION);
    expect(ball.y).toEqual(Breakout.INITIAL_BALL_ROW); 
  });

  it("adds the ball to its image list on update at the balls current location", function() {
    var ball = Breakout.Ball,
        imageList = [],
        ballImage;

    ball.update(imageList);

    ballImage = _(imageList).detect(function(image) {
      return image.name == 'ball';
    });

    expect(ballImage.location.x).toEqual(ball.x);
    expect(ballImage.location.y).toEqual(ball.y);
  });

  it("starts the ball moving in launch direction on launch", function() {
    var ball = Breakout.Ball;

    ball.launch();
    ball.update([]);

    var locationWithRandomVelocity = {x: Breakout.INITIAL_POSITION + Breakout.LaunchDirection.x,
                                      y: Breakout.INITIAL_BALL_ROW + Breakout.LaunchDirection.y};

    expect(ball.x).toEqual(locationWithRandomVelocity.x);
    expect(ball.y).toEqual(locationWithRandomVelocity.y);
  });

  // it doesn't keep changing direction on launch
  // it moves with each update
  // Global problems


});

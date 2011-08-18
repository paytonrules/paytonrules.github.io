describe("Ball", function() {
  var Breakout, ball;
  
  beforeEach( function() {
    Breakout = require("specHelper").Breakout;
    ball = new Breakout.Ball();
  });

  it("starts at the INITIAL_POSITION and INITIAL_BALL_ROW", function() {
    expect(ball.x).toEqual(Breakout.INITIAL_POSITION);
    expect(ball.y).toEqual(Breakout.INITIAL_BALL_ROW); 
  });

  it("adds the ball to its image list on update at the balls current location", function() {
    var imageList = [],
        ballImage;

    ball.update(imageList);

    ballImage = _(imageList).detect(function(image) {
      return image.name == 'ball';
    });

    expect(ballImage.location.x).toEqual(ball.x);
    expect(ballImage.location.y).toEqual(ball.y);
  });

  it("starts the ball moving in launch direction on launch", function() {
    ball.launch();
    ball.update([]);

    var randomLaunchVelocity = Breakout.LaunchDirection();
    var locationWithRandomVelocity = {x: Breakout.INITIAL_POSITION + randomLaunchVelocity.x,
                                      y: Breakout.INITIAL_BALL_ROW + randomLaunchVelocity.y};

    expect(ball.x).toEqual(locationWithRandomVelocity.x);
    expect(ball.y).toEqual(locationWithRandomVelocity.y);
  });

  it("moves with each update", function() {
    ball.launch();
    ball.update([]);
    ball.update([]);

    var launchVelocity = Breakout.LaunchDirection();
    var locationWithRandomVelocity = {x: Breakout.INITIAL_POSITION + (launchVelocity.x * 2),
                                      y: Breakout.INITIAL_BALL_ROW + (launchVelocity.y * 2)};

    expect(ball.x).toEqual(locationWithRandomVelocity.x);
    expect(ball.y).toEqual(locationWithRandomVelocity.y);
  });
 
  // it doesn't keep changing direction on launch
  // Global problems

});

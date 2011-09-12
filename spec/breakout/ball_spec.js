describe("Ball", function() {
  var Breakout, ball;
  
  beforeEach( function() {
    Breakout = require("specHelper").Breakout;
    ball = new Breakout.Ball();
    this.addMatchers( {
      toEqualObject: function(object) {
        _.isEqual(this.actual, object);
      }
    });
  });

  it("starts at the INITIAL_POSITION and INITIAL_BALL_ROW", function() {
    expect(ball.location.x).toEqual(Breakout.INITIAL_POSITION);
    expect(ball.location.y).toEqual(Breakout.INITIAL_BALL_ROW);
  });

  it("can be moved to any location", function() {
    var location = Eskimo.Point(1, 3);
    ball.move(location);

    expect(_.isEqual(ball.location, location)).toBeTruthy();
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
    spyOn(Breakout, "LaunchVelocity").andReturn({x: 1, y: 2});
    ball.launch();
    ball.update([]);

    var locationWithRandomVelocity = {x: Breakout.INITIAL_POSITION + 1,
                                      y: Breakout.INITIAL_BALL_ROW + 2};

    expect(ball.x).toEqual(locationWithRandomVelocity.x);
    expect(ball.y).toEqual(locationWithRandomVelocity.y);
  });

  it("moves with each update", function() {
    spyOn(Breakout, "LaunchVelocity").andReturn({x: 1, y: 2});
    ball.launch();
    ball.update([]);
    ball.update([]);

    var locationWithRandomVelocity = {x: Breakout.INITIAL_POSITION + 2,
                                      y: Breakout.INITIAL_BALL_ROW + 4};

    expect(ball.x).toEqual(locationWithRandomVelocity.x);
    expect(ball.y).toEqual(locationWithRandomVelocity.y);
  });

  it("only calls launch velocity once", function() {
    spyOn(Breakout, "LaunchVelocity").andReturn({x: 1, y: 1});
    ball.launch();
    ball.update([]);
    ball.update([]);

    expect(Breakout.LaunchVelocity.callCount).toEqual(1);
  });

  it("doesn't let you launch a launched ball", function() {
    spyOn(Breakout, "LaunchVelocity");
    ball.launch();
    ball.launch();

    expect(Breakout.LaunchVelocity.callCount).toEqual(1);
  });
});

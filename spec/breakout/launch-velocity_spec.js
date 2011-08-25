describe("LaunchVelocity", function() {
  var Breakout;
  
  beforeEach(function() {
    Breakout = require("specHelper").Breakout;
  });

  it("returns a direction in y, that is negative", function() {
    var direction;
    Breakout.LaunchVelocity.RANGE = Breakout.LaunchVelocity.LEFT = 0.0; 
    Breakout.Ball.BALL_VELOCITY = 1.0;
    
    direction = Breakout.LaunchVelocity();

    expect(direction.y).toEqual(-1.0);
  });

 it("returns a random direction in x, leftmost value is Breakout.LaunchVelocity.LEFT", function() {
   var direction;
   Breakout.LaunchVelocity.LEFT = 2.0;
   Breakout.LaunchVelocity.UP = 0.0;
   Breakout.Ball.BALL_VELOCITY = 2.0;
   spyOn(Eskimo, "random").andReturn(0.0);

   direction = Breakout.LaunchVelocity();

   expect(direction.x).toEqual(2.0);
 });

 it("returns a random direction in x, right most value is Breakout.LaunchVelocity.RANGE (added to LEFT)", function() {
   var direction;
   Breakout.LaunchVelocity.LEFT = 1.0;
   Breakout.LaunchVelocity.RANGE = 2.0;
   Breakout.LaunchVelocity.UP = 0.0;
   Breakout.Ball.BALL_VELOCITY = 3.0;
   spyOn(Eskimo, "random").andReturn(1.0);

   direction = Breakout.LaunchVelocity();

   expect(direction.x).toEqual(3.0);
 });

 it("has a length of BALL_VELOCITY", function() {
   Breakout.Ball.BALL_VELOCITY = 1.0;
   var direction;

   direction = Breakout.LaunchVelocity();

   expect(direction.lengthSquared.toFixed()).toEqual('1');
 });
});

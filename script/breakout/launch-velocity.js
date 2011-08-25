Breakout.LaunchVelocity = function() {
  var randomDirectionInX = (Eskimo.random() * Breakout.LaunchVelocity.RANGE) + Breakout.LaunchVelocity.LEFT;
  var velocityVector = Eskimo.Vector.create2DVector(randomDirectionInX, Breakout.LaunchVelocity.UP);
  return velocityVector.scaled(Breakout.Ball.BALL_VELOCITY);
};

Breakout.LaunchVelocity.LEFT = -0.8;
Breakout.LaunchVelocity.RANGE = 1.6;
Breakout.LaunchVelocity.UP = -1.0;

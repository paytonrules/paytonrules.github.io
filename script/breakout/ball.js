// Refactor to revealing module pattern
Breakout.Ball = function() {
  var launched = false;
  var currentVelocity = Eskimo.Vector.create2DVector(0, 0);
  this.x = Breakout.INITIAL_POSITION;
  this.y = Breakout.INITIAL_BALL_ROW;

  this.launch = function() {
    if (!launched) {
      currentVelocity = Breakout.LaunchVelocity();
      launched = true;
    }
  };

  this.update = function(imageList) {
    this.x += currentVelocity.x;
    this.y += currentVelocity.y;

    imageList.push({name: 'ball',
                   location: {x: this.x,
                              y: this.y} });
  };
};
Breakout.Ball.BALL_VELOCITY = 2.0;

// Refactor to revealing module pattern
Breakout.Ball = function() {
  var launched = false;
  var currentVelocity = Eskimo.Vector.create2DVector(0, 0);
  this.x = Breakout.INITIAL_POSITION;
  this.y = Breakout.INITIAL_BALL_ROW;
  this.location = Eskimo.Point(Breakout.INITIAL_POSITION, Breakout.INITIAL_BALL_ROW);

  this.launch = function() {
    if (!launched) {
      currentVelocity = Breakout.LaunchVelocity();
      launched = true;
    }
  };

  this.move = function(point) {
    this.location = point;
  };

  this.update = function(imageList) {
    this.x += currentVelocity.x;
    this.y += currentVelocity.y;

    // Duplication - and it's your framework 'seeping' into the code.  How would you pull
    // this out?
    imageList.push({name: 'ball',
                   location: {x: this.x,
                              y: this.y} });
  };
};
Breakout.Ball.BALL_VELOCITY = 2.0;

Breakout.Ball = function() {
  var launched = false;
  this.x = Breakout.INITIAL_POSITION;
  this.y = Breakout.INITIAL_BALL_ROW;

  this.launch = function() {
    launched = true;
  };

  this.update = function(imageList) {
    if (launched) {
      this.x += Breakout.LaunchDirection.x,
      this.y += Breakout.LaunchDirection.y
    }

    imageList.push({name: 'ball',
                   location: {x: this.x,
                              y: this.y} });
  };

};

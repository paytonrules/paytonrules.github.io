Breakout.Ball = {
  x: Breakout.INITIAL_POSITION,
  y: Breakout.INITIAL_BALL_ROW,
  launched: false,

  launch: function() {
    this.launched = true;
  },

  update: function(imageList) {
    if (this.launched) {
      this.x += Breakout.LaunchDirection.x,
      this.y += Breakout.LaunchDirection.y
    }

    imageList.push({name: 'ball',
                   location: {x: Breakout.Ball.x,
                              y: Breakout.Ball.y} });
  }
};

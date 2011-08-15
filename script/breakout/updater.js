Breakout = {
  PADDLE_ROW: 400,
  PADDLE_VELOCITY: 10,
  INITIAL_POSITION: 320,
  INITIAL_BALL_ROW: 370
};

Breakout.Updater = function(assets) {
  var location = {x: Breakout.INITIAL_POSITION},
      movingRight = false,
      movingLeft = false,
      launchBall = false,
      ball  = {x: Breakout.INITIAL_POSITION,
               y: Breakout.INITIAL_BALL_ROW};

  // Not tested directly yet
  Breakout.ImageLoader.load(assets);

  // Almost certainly frameworkable ('keystate')
  this.keydown = function(event) {
    switch (event.which) {
      case Game.KeyCodes.RIGHT_ARROW:
        movingRight = true;
        break;
      case Game.KeyCodes.LEFT_ARROW:
        movingLeft = true;
        break;
      case Game.KeyCodes.SPACEBAR:
        launchBall = true;
        break;
    }
  };

  this.keyup = function(event) {
    switch (event.which) {
      case Game.KeyCodes.RIGHT_ARROW:
        movingRight = false;
        break;
      case Game.KeyCodes.LEFT_ARROW:
        movingLeft = false;
        break;
    }
  };

  // State is an input/output param.  Probably should not be a data structure.
  // really represents the current state for drawing
  this.update = function(imageList) {
    if (movingRight) {
      location.x += Breakout.PADDLE_VELOCITY;
    }

    if (movingLeft) {
      location.x -= Breakout.PADDLE_VELOCITY;
    }

    if (launchBall) {
      ball.x += Breakout.LaunchDirection.x,
      ball.y += Breakout.LaunchDirection.y
    }

    imageList.push({name: 'paddle',
                   location: {x: location.x,
                              y: Breakout.PADDLE_ROW}});

    imageList.push({name: 'ball',
                    location: {x: ball.x,
                               y: ball.y} });
  };
};

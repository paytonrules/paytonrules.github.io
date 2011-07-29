Breakout = {
  PADDLE_ROW: 400,
  PADDLE_VELOCITY: 10
};

Breakout.Updater = function(assets) {
  var location = {x: Breakout.INITIAL_POSITION},
      movingRight = false,
      movingLeft = false;

  assets.loadImage("paddle", "images/baddie.png");

  // Potentially frameworkable ('keystate')
  this.keydown = function(event) {
    switch (event.which) {
      case Game.KeyCodes.RIGHT_ARROW:
        movingRight = true;
         break;
      case Game.KeyCodes.LEFT_ARROW:
        movingLeft = true;
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

  this.update = function(state) {
    if (typeof(state.paddle) === "undefined") {
      state.paddle = {};
    }

    if (movingRight) {
      location.x += Breakout.PADDLE_VELOCITY;
    }

    if (movingLeft) {
      location.x -= Breakout.PADDLE_VELOCITY;
    }

    state.paddle.x = location.x;
    state.paddle.y = Breakout.PADDLE_ROW;
  };
};

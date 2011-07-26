if (typeof(Breakout) === "undefined") {
  Breakout = {};
}

Breakout.PADDLE_ROW = 400;
Breakout.PADDLE_VELOCITY = 10;
Breakout.INITIAL_POSITION = 320;

Breakout.Updater = function(assets) {
  var location = {x: Breakout.INITIAL_POSITION};
  var movingRight = false;

  assets.loadImage("paddle", "images/baddie.png");

  this.keydown = function(event) {
    switch (event.which) {
      case 39:
        movingRight = true;
        /*
         *
         *location.x += Breakout.PADDLE_VELOCITY;
         *break;
         */
         break;
      case 37:
        location.x -= Breakout.PADDLE_VELOCITY;
        break;
    }
  };

  this.keyup = function(event) {
    switch (event.which) {
      case 39:
        movingRight = false;
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

    state.paddle.x = location.x;
    state.paddle.y = Breakout.PADDLE_ROW;
  };
};

if (typeof(Asteroids) === "undefined") {
  Asteroids = {};
}

Asteroids.Updater = function(assets) {
  var location = {x: 50, y: 50};
  assets.loadImage("paddle", "images/baddie.png");

  this.keydown = function(event) {
    switch (event.which) {
      case 39:
        location.x++;
        break;
      case 37:
        location.x--;
        break;
    }
  };

  this.update = function(state) {
    if (typeof(state.paddle) === "undefined") {
      state.paddle = {};
    }

    state.paddle.x = location.x;
    state.paddle.y = location.y;
  };
};

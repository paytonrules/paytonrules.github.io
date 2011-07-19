if (typeof(Asteroids) === "undefined") {
  Asteroids = {};
}

Asteroids.Updater = function(assets) {
  assets.loadImage("baddie", "images/baddie.png");
};

Asteroids.Updater.prototype.update = function(state) {
  if ( typeof(state.loopCount) === "undefined" || state.loopCount === 60) {
    state.loopCount = 0;
  }
  state.loopCount += 1;
};

if (typeof(Experiment) === "undefined") {
  Experiment = {};
}

Experiment.Updater = function(assets) {
  assets.loadImage("baddie", "images/baddie.png");
};

Experiment.Updater.prototype.update = function(state) {
  if ( typeof(state.loopCount) === "undefined" || state.loopCount === 60) {
    state.loopCount = 0;
  }
  state.loopCount += 1;
};

if (typeof(Game) === "undefined") {
  Game = {};
}

// Move into the Game namespace
Game.FixedStepGameLoop = function(scheduler) {
  var self = this;
  var nextGameTick = scheduler.getTicks();

  this.loop = function() {
    while (scheduler.getTicks() > nextGameTick) {
      self.update();

      nextGameTick += scheduler.getTickTime();
    }
    self.draw();
  };

  this.stop = function() {
    scheduler.stop();
  };
};

if (typeof(Game) === "undefined") {
  Game = {};
}

Game.FixedStepGameLoop = function(scheduler) {
  var self = this;
  var nextGameTick = scheduler.getTicks();
  var gameState = {};

  this.loop = function() {
    while (scheduler.getTicks() > nextGameTick) {
      self.update(gameState);

      nextGameTick += scheduler.getTickTime();
    }
    self.draw(gameState);
  };

  this.stop = function() {
    scheduler.stop();
  };
};

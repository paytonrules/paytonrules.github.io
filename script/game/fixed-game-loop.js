Game.FixedStepGameLoop = function(scheduler, updater, drawer) {
  var nextGameTick = scheduler.getTicks();
  var gameState = {};

  this.loop = function() {
    while (scheduler.getTicks() > nextGameTick) {
      updater.update(gameState);

      nextGameTick += scheduler.getTickTime();
    }
    drawer.draw(gameState);
  };

  this.stop = function() {
    scheduler.stop();
  };

  this.start = function() {
    scheduler.start(this.loop);
  };
};

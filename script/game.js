// Game will probably become a namespace.
Game = function(scheduler) {
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

/*
 *  this.start = function() {
 *    nextGameTick = scheduler.getTicks();
 *    this.timer = setInterval(self.loop, scheduler.getTickTime());
 *  };
 *
 *  this.stop = function() {
 *    clearInterval(this.timer);
 *  };
 */
};

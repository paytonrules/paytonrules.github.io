Game.Scheduler = function(framesPerSecond) {
  var timer;
  this.start = function(game) {
    var self = this;
    timer = setInterval(function() { game.loop(); }, self.getTickTime());
  };

  this.stop = function() {
    clearInterval(timer);
  };

  this.getTickTime = function() {
    return (1000 / framesPerSecond);
  };
};

Game.Scheduler.prototype.getTicks = function() {
  return (new Date()).getTime();
};

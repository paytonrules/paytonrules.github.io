Game.Scheduler = function(loop, framesPerSecond) {
  this.start = function() {
    setInterval(loop.loop, 1000 / framesPerSecond);
  };
};

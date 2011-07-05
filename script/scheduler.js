Game.Scheduler = function(loop, framesPerSecond) {
  var timer;
  this.start = function() {
    var self = this;
    timer = setInterval(function() { loop.loop(self); }, 1000 / framesPerSecond);
  };

  this.stop = function() {
    clearInterval(timer);
  };
};

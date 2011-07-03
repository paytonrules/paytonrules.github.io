// Make these instance methods, right now they are class - maybe those blong on the prototype
// Create a Javascript style module
// Probably change to use a constructor of the JS variety

/*
 *var nextGameTick = (new Date).getTime();
 *var FRAMES_PER_SECOND = 60;
 *var SKIP_TICKS = 1000 / FRAMES_PER_SECOND;
 *var sleepTime = 0;
 */

Game = function() {
  var self = this;

  this.loop = function() {
    self.update();
    self.draw();
  };

  this.start = function() {
    this.timer = setInterval(self.loop, 1000 / 50);
  };

  this.stop = function() {
    clearInterval(this.timer);
  };
};

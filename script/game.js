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
  this.running = true;

  this.loop = function() {
    if(self.running) {
      self.update();
      self.draw();
    }
  };

  this.start = function() {
    setInterval(self.loop, 1000 / 50);
  };

  this.stop = function() {
    self.running = false;
  };
};

/*
 *  Game.update();
 *  Game.draw();
 *
 *  nextGameTick += SKIP_TICKS;
 *
 *  sleepTime = nextGameTick - (new Date).getTime();
 *
 *  if (sleepTime > 0) {
 *    setTimeout("Game.loop()", sleepTime);
 *    sleepTime = nextGameTick - (new Date).getTime();
 *  }
 *
 */

/*
 *Game.start = function() {
 *  Game.loop();
 *};
 */

// Make these instance methods, right now they are class - maybe those blong on the prototype
// Create a Javascript style module
// Probably change to use a constructor of the JS variety

var nextGameTick = (new Date).getTime();
var FRAMES_PER_SECOND = 60;
var SKIP_TICKS = 1000 / FRAMES_PER_SECOND;
var sleepTime = 0;

Game = {};

Game.loop = function() {
  Game.update();
  Game.draw();

  nextGameTick += SKIP_TICKS;

  sleepTime = nextGameTick - (new Date).getTime();

  if (sleepTime > 0) {
    setTimeout("Game.loop()", sleepTime);
//    sleepTime = nextGameTick - (new Date).getTime();
  }

};

Game.start = function() {
  Game.loop();
};

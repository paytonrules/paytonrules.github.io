var gameLoop = {};
var loopCounter = 0;

this.loopCounter = function() {
  return loopCounter;
};

this.gameLoop = function() {
  loopCounter++;
};

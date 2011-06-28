gameLoop = {};
var loopCounter = 0;

gameLoop.loopCounter = function() {
  return loopCounter;
};

gameLoop.gameLoop = function() {
  loopCounter++;
};

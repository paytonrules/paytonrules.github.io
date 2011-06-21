var gameLoop = {};

gameLoop.loopCounter = function() {
  return loopCounter;
};

gameLoop.gameLoop = function() {
  loopCounter++;
};

console.log(gameLoop);

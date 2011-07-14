if (typeof(Experiment) === "undefined") {
  Experiment = {};
}

Experiment.Drawer = function(context) {
  this.draw = function(gameState) {
    context.fillStyle = "#aaaaaa";
    context.fillRect(0, 0, 200, 200);
    context.drawImage("Canvas!", gameState.loopCount, gameState.loopCount);
  };
};

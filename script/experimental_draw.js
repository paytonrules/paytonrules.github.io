if (typeof(Experiment) === "undefined") {
  Experiment = {};
}

Experiment.Drawer = function(context) {
  this.draw = function(gameState) {
    context.fillStyle = "#aaaaaa";
    context.fillRect(0, 0, 200, 200);
    context.fillStyle = "#000000";
    context.font = '20px _sans';
    context.textBaseline = 'top';
    context.fillText("Canvas!", gameState.loopCount, gameState.loopCount);
  };
};

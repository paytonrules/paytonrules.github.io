if (typeof(Experiment) === "undefined") {
  Experiment = {};
}

Experiment.Drawer = function(context, jquery) {
  this.draw = function(gameState) {
    context.fillStyle = "#aaaaaa";
    context.fillRect(0, 0, 200, 200);
    var image = jquery("<img src='images/baddie.png'></img>");
    context.drawImage(image[0], gameState.loopCount, gameState.loopCount);
  };
};

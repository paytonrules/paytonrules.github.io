if (typeof(Asteroids) === "undefined") {
  Asteroids = {};
}

Asteroids.Drawer = function(context, assets) {
  this.draw = function(gameState) {
    context.fillStyle = "#aaaaaa";
    context.fillRect(0, 0, 200, 200);
    var image = assets.get("baddie");
    context.drawImage(image, gameState.loopCount, gameState.loopCount);
  };
};

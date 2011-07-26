if (typeof(Breakout) === "undefined") {
  Breakout = {};
}

Breakout.Drawer = function(context, assets) {
  this.draw = function(gameState) {
    context.fillStyle = "#aaaaaa";
    context.fillRect(0, 0, 640, 480);
    var image = assets.get("paddle");
    context.drawImage(image, gameState.paddle.x, 
                             gameState.paddle.y);
  };
};

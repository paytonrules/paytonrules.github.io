if (typeof(Breakout) === "undefined") {
  Breakout = {};
}

Breakout.Drawer = function(screen) {
  this.draw = function(gameState) {
    screen.clear();
    screen.drawImage("paddle", 
                      gameState.paddle.x, 
                      gameState.paddle.y);
  };
};

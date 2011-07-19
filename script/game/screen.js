if (typeof(Game) === "undefined") {
  Game = {};
}

Game.Screen = function(context, assets) {
  this.drawImage = function(name, x, y) {
    var image = assets.get(name);
    if (image) {
      context.drawImage(assets.get(name), x, y);
    }
  };
};


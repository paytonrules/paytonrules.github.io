if (typeof(Game) === "undefined") {
  Game = {};
}

Game.Assets = function($) {
  var assetList = {};

  this.get = function(key) {
    if ( assetList[key] && assetList[key].loaded ) {
      return assetList[key].get(0);
    }
    return null;
  };

  this.loadImage = function(key, src) {
    if (assetList[key]) {
      throw {name: "Game.AssetAlreadyExists", message: "Asset '" + src + "' already exists"};
    } else {
      assetList[key] = $("<img src='" + src + "'>");
      assetList[key].load(function() {
        assetList[key].loaded = true;
      });
    }
  };
};

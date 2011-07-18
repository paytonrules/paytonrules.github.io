describe("Game Screen", function() {
  var assets, Game, Context, context, screen;

  Context = function() {
    imageList = [];

    this.drawImage = function(image, x, y) {
      imageList.push({name: image, x: x, y: y});
    };

    this.hasImageNamed = function(imageName) {
      var image = imageList.detect(function(image) {
        return image.name === imageName; 
      });

      return image !== null;
    };

    this.hasImageAt = function(x, y) {
      var image = imageList.detect(function(image) {
        return (image.x === x && image.y === y);
      });

      return image !== null;
    };
  };

  beforeEach(function() {
    assets = (function() {
      var assetList = {};

      return { 
        get: function(key) {
          return assetList[key];
        }, 

        set: function(key, value) {
          assetList[key] = value;
        }
      };
    }());

    Game = require("specHelper").Game;
    context = new Context();
    screen = new Game.Screen(context, assets);

    this.addMatchers( {
      toHaveImageNamed: function(imageName) { 
        return this.actual.hasImageNamed(imageName);
      },

      toHaveImageAt: function(x, y) {
        return this.actual.hasImageAt(x, y);
      }
   });
  });

  it("is created with a canvas context", function() {
    expect(screen).not.toBeUndefined();
  });

  it("draws whatever is loaded from the asset loader on the context", function() {
    assets.set("image", "filename");
    screen.drawImage("image", 0, 0);
    
    expect(context).toHaveImageNamed("filename");
  });

  it("draws it at the right location", function() {
    assets.set("image", "filename");
    screen.drawImage("image", 100, 200);

    expect(context).toHaveImageAt(100, 200);
  });

  it("doesnt draw anything if the image does not exist", function() {
    screen.drawImage("", 100, 200);

    expect(context).not.toHaveImageAt(100, 200);
  });
});

Image = function() {
  this.name = "MockImage";

}; // Global namespace - not sure how I feel about that

describe("Drawer", function() {
  var Breakout, drawer;

  var context = {
    fillRect: function(x, y, w, h) {
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
      this.rectFillStyle = this.fillStyle;
    },

    drawImage: function(image, x, y) {
      this.image = {};
      this.image.name = image;
      this.image.x = x;
      this.image.y = y;
    }
  };
  
  var assets = {
    get: function(value) {
      if (value === "paddle") {
        return "test";
      }

      return null;
    }
  };

  var gameState = {
    paddle: {
      x: 0,
      y: 0
    }
  };

  beforeEach( function() {
    Breakout = require('specHelper').Breakout;
    drawer = new Breakout.Drawer(context, assets);
  });

  it('draws a rectangle on my context', function() {
    drawer.draw(gameState);

    expect(context.rectFillStyle).toEqual("#aaaaaa");
    expect(context.x).toEqual(0);
    expect(context.y).toEqual(0);
    expect(context.w).toEqual(640);
    expect(context.h).toEqual(480);
  });

  it('draws the paddle', function() {
    gameState.paddle.x = 10;
    gameState.paddle.y = 20;
    drawer.draw(gameState);

    expect(context.image.x).toEqual(10);
    expect(context.image.y).toEqual(20);
  });

  it('creates an image object and draws it', function() {
    drawer.draw(gameState);

    expect(context.image.name).toEqual("test");
  });

});

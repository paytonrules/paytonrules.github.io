describe("Drawer", function() {
  var Experiment;

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
      this.image.x = x;
      this.image.y = y;
    }
  };

  beforeEach( function() {
    Experiment = require('specHelper').Experiment;
  });

  it('draws a rectangle on my context', function() {
    var drawer = new Experiment.Drawer(context);

    drawer.draw({});

    expect(context.rectFillStyle).toEqual("#aaaaaa");
    expect(context.x).toEqual(0);
    expect(context.y).toEqual(0);
    expect(context.w).toEqual(200);
    expect(context.h).toEqual(200);
  });

  it('draws an image at a location based on the game state', function() {
    var gameState = {
      loopCount: 10
    };

    var drawer = new Experiment.Drawer(context);

    drawer.draw(gameState);

    expect(context.image.x).toEqual(10);
    expect(context.image.y).toEqual(10);
  });

  it('creates an image object and draws it', function() {
    var drawer = new Experiment.Drawer(context);

    drawer.draw({loopCount: 0});

    expect(typeof(context.image.image)).toEqual("Image");
  });

});

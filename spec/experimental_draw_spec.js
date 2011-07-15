Image = function() {
  this.name = "MockImage";

}; // Global namespace - not sure how I feel about that

describe("Drawer", function() {
  var Experiment, drawer;

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
      this.image.name = image.name;
      this.image.src = image.src;
      this.image.x = x;
      this.image.y = y;
    }
  };
  
  var jquery = function(value) {
    var image = new Image();
    if (value === "<img src='images/baddie.png'></img>") {
      image.src = "images/baddie.png"; 
    }

    return [image];
  };


  beforeEach( function() {
    Experiment = require('specHelper').Experiment;
    drawer = new Experiment.Drawer(context, jquery);
  });

  it('draws a rectangle on my context', function() {
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

    drawer.draw(gameState);

    expect(context.image.x).toEqual(10);
    expect(context.image.y).toEqual(10);
  });

  it('creates an image object and draws it', function() {
    drawer.draw({loopCount: 0});

    expect(context.image.name).toEqual("MockImage");
  });

  it('sets the src to be images/baddie.png', function() {
    drawer.draw({loopCount: 0});

    expect(context.image.src).toEqual("images/baddie.png");
  });

});

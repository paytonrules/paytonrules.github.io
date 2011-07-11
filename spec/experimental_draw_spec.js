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

    fillText: function(value, x, y) {
      this.text = {};
      this.text.fillStyle = this.fillStyle;
      this.text.Baseline = this.textBaseline;
      this.text.value = value;
      this.text.font = this.font;
      this.text.x = x;
      this.text.y = y;
    }
  };

  beforeEach( function() {
    Experiment = require('specHelper').Experiment;
  });

  it('draws on my context', function() {
    var drawer = new Experiment.Drawer(context);

    drawer.draw({});

    expect(context.rectFillStyle).toEqual("#aaaaaa");
    expect(context.x).toEqual(0);
    expect(context.y).toEqual(0);
    expect(context.w).toEqual(200);
    expect(context.h).toEqual(200);
    expect(context.text.value).toEqual("Canvas!");
    expect(context.text.font).toEqual('20px _sans');
    expect(context.text.Baseline).toEqual('top');
    expect(context.text.fillStyle).toEqual("#000000");
  });

  it('moves the context, based on the game state', function() {
    var gameState = {
      loopCount: 10
    };

    var drawer = new Experiment.Drawer(context);
    
    drawer.draw(gameState);

    expect(context.text.x).toEqual(10);
    expect(context.text.y).toEqual(10);
  });

});

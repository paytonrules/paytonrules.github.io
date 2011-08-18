describe("ImageLoader", function() {
  var Breakout;
  beforeEach( function() {
    Breakout = require("specHelper").Breakout;
  });

  it("loads the paddle image", function () {
    var assets = {
      loadImage: function() {}
    };

    spyOn(assets, "loadImage");

    Breakout.ImageLoader.load(assets);

    expect(assets.loadImage).toHaveBeenCalledWith('paddle', 'images/baddie.png');
  });

  it("loads the ball image", function () {
    var assets = {
      loadImage: function() {}
    };

    spyOn(assets, "loadImage");

    Breakout.ImageLoader.load(assets);

    expect(assets.loadImage).toHaveBeenCalledWith('ball', 'images/baddie.png');
  });
});

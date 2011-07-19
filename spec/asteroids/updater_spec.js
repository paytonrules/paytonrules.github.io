describe("Updater", function() {
  var Asteroids, updater, state;

  beforeEach( function() {
    Asteroids = require("specHelper").Asteroids;
    updater = new Asteroids.Updater({loadImage: function() {}});
    state = {};
  });

  it("updates the loop count on each call", function() {
    updater.update(state);

    expect(state.loopCount).toEqual(1);
  });

  it("increments if called twice", function() {
    updater.update(state);
    updater.update(state);

    expect(state.loopCount).toEqual(2);
  });

  it("resets at 60", function() {
    state.loopCount = 60;
    updater.update(state);

    expect(state.loopCount).toEqual(1);
  });

  it("loads the baddie image", function () {
    var assets = {};
    assets.loadImage = function(key, src)  {
      assets.key = key;
      assets.src = src;
    };

    var anotherUpdater = new Asteroids.Updater(assets);

    expect(assets.key).toEqual("baddie");
    expect(assets.src).toEqual("images/baddie.png");
  });

});

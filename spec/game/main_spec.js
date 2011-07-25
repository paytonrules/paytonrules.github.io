describe("Game#main", function() {
  var jquery, Game, context;
  var emptyFunction = function() {};

  function emptyRequiredConfiguration() {
    return {
      gameLoop: function() {this.start = emptyFunction; },
      scheduler: emptyFunction,
      drawer: emptyFunction,
      assets: emptyFunction,
      updater: emptyFunction
    };
  };

  function configureGame(options) {
    Game.config = emptyRequiredConfiguration();
    for (var option in options ) {
      if ( options.hasOwnProperty(option) ) {
        Game.config[option] = options[option];
      }
    }
  };

  beforeEach(function() {
    jquery = require('jquery');
    Game = require("specHelper").Game;
    context = {};
  });

  it("uses the frame rate for the scheduler", function() {
    var FakeScheduler = function(frameRate) {
      FakeScheduler.FRAME_RATE = frameRate;
    };

    configureGame({scheduler: FakeScheduler,
                   FRAME_RATE: 10});

    Game.main(jquery, context);

    expect(FakeScheduler.FRAME_RATE).toEqual(10);
  });

  it("creates the fixed step game loop with the scheduler", function() {
    var FakeGameLoop = function(scheduler) {
      FakeGameLoop.scheduler = scheduler;
      this.start = emptyFunction;
    };

    var FakeScheduler = function(frameRate) {
      this.theScheduler = "this one";
    };

    configureGame({scheduler: FakeScheduler,
                   gameLoop: FakeGameLoop });

    Game.main(jquery, context);

    expect(FakeGameLoop.scheduler.theScheduler).toEqual("this one");
  });

  it("creates the game loop with the configured drawer", function() {
    var drawer = null;
    var FakeGameLoop = function(irrellevant, drawer) {
      this.start = emptyFunction;
      FakeGameLoop.drawer = drawer;
    };

    var Drawer = function() {
      drawer = this;
    };

    configureGame({gameLoop: FakeGameLoop,
                   drawer: Drawer});

    Game.main(jquery, context);

    expect(FakeGameLoop.drawer).toEqual(drawer);
  });

  it("creates the drawer with the context", function() {
    var Drawer = function(context) {
      Drawer.context = context;
    };

    configureGame({drawer: Drawer});

    Game.main(jquery, context);

    expect(Drawer.context).toEqual(context);
  });

  it("creates assets for the drawer", function() {
    var theAssets;
    var Drawer = function(context, assets) {
      Drawer.assets = assets;
    };

    var Assets = function(jquery) {
      theAssets = this;
      Assets.jquery = jquery;
    };

    configureGame({drawer: Drawer,
                   assets: Assets});

    Game.main(jquery, context);

    expect(Drawer.assets).toEqual(theAssets);
    expect(Assets.jquery).toEqual(jquery);
  });

  it("sends the configured updater to the game loop", function() {
    var theUpdater = 'unset';
    var GameUpdater = function() {
      theUpdater = this;
    };

    var FakeGameLoop = function(irrelevant, irrelevant, updater) {
      FakeGameLoop.updater = updater;
      this.start = emptyFunction;
    };

    configureGame({gameLoop: FakeGameLoop,
                   updater: GameUpdater});

    Game.main(jquery, context);

    expect(FakeGameLoop.updater).toEqual(theUpdater);
  });

  it("sends the updater the assets", function() {
    var theAssets = "unset"; 
    var GameUpdater = function(assets) {
      GameUpdater.assets = assets;
    };

    var Assets = function() {
      theAssets = this;
    };

    configureGame({assets: Assets,
                   updater: GameUpdater});

    Game.main(jquery, context);

    expect(GameUpdater.assets).toEqual(theAssets);
  });

  it("starts the game loop", function() {
    FakeGameLoop = function() {
      this.start = function() {
        FakeGameLoop.started = true;
      };
    };

    configureGame({gameLoop: FakeGameLoop});

    Game.main(jquery, context);

    expect(FakeGameLoop.started).toBeTruthy();
  });

});

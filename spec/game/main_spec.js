describe("Game#main", function() {
  var Game, context;
  var emptyFunction = function() {};
  var emptyDocument = {documentElement: null};

  function loadDefaultConfiguration() {
    Game.config = {
      gameLoop: function() {this.start = emptyFunction; },
      scheduler: emptyFunction,
      drawer: emptyFunction,
      assets: emptyFunction,
      updater: emptyFunction
    };
  };

  function configureGame(options) {
    loadDefaultConfiguration();
    for (var option in options ) {
      if ( options.hasOwnProperty(option) ) {
        Game.config[option] = options[option];
      }
    }
  };
  
  beforeEach(function() {
    Game = require("specHelper").Game;
    context = {};
  });

  describe("wiring dependencies", function() {
    var jquery;
    
    beforeEach(function() {
      jquery = require('jquery');
    });

    it("uses the frame rate for the scheduler", function() {
      var FakeScheduler = function(frameRate) {
        FakeScheduler.FRAME_RATE = frameRate;
      };

      configureGame({scheduler: FakeScheduler,
                     FRAME_RATE: 10});

      Game.main({jquery: jquery, 
                context: context,
                document: emptyDocument});

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

      Game.main({jquery: jquery, 
                context: context,
                document: emptyDocument});

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

      Game.main({jquery: jquery, 
                context: context,
                document: emptyDocument});

      expect(FakeGameLoop.drawer).toEqual(drawer);
    });

    it("creates the drawer with the context", function() {
      var Drawer = function(context) {
        Drawer.context = context;
      };

      configureGame({drawer: Drawer});

      Game.main({jquery: jquery, 
                context: context,
                document: emptyDocument});

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

      Game.main({jquery: jquery, 
                context: context,
                document: emptyDocument});

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

      Game.main({jquery: jquery, 
                context: context,
                document: emptyDocument});

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

      Game.main({jquery: jquery, 
                context: context,
                document: emptyDocument});

      expect(GameUpdater.assets).toEqual(theAssets);
    });

    it("starts the game loop", function() {
      FakeGameLoop = function() {
        this.start = function() {
          FakeGameLoop.started = true;
        };
      };

      configureGame({gameLoop: FakeGameLoop});

      Game.main({jquery: jquery, 
                context: context,
                document: emptyDocument});

      expect(FakeGameLoop.started).toBeTruthy();
    });

  });

  describe("binding events", function() {
    var jquery, document;

    beforeEach(function() {
      var jsdom = require("jsdom").jsdom,
       emptyPage = jsdom("<html><head></head><body>hello world</body></html>"),
       window   = emptyPage.createWindow();
 
      document = window.document;
      jquery = require("jquery").create(window);
    });

    it("sends keydown events to the updater", function() {
       var Updater = function() {
         this.keydown = function(event) {
           Updater.event = event;
         };
       };

       configureGame({updater: Updater});

       Game.main({jquery: jquery, 
                 context: context, 
                 document: document});

       jquery(document.documentElement).keydown();

       expect(Updater.event).not.toBeUndefined();
    });

    it("passes the correct event", function() {
      var Updater = function() {
        this.keydown = function(event) {
          Updater.key = event.which;
        }
      };

      configureGame({updater: Updater});

      Game.main({jquery: jquery,
                context: context,
                document: document});

      jquery.event.trigger({ type : 'keydown', 
                             which : 87 });

      expect(Updater.key).toEqual(87);
    });

    it("doesn't cause an error if the updater doesn't have a keydown", function() {
      loadDefaultConfiguration();

      Game.main({jquery: jquery,
                 context: context,
                 document: document});

      jquery(document.documentElement).keydown();

    });

  });
});

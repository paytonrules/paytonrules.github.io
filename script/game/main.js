if (typeof(Game) === "undefined") {
  Game = {};
}

if (typeof(Game.config) === "undefined") {
  Game.config = {};
}

Game.config.assets = Game.Assets;
Game.config.scheduler = Game.Scheduler;
Game.config.gameLoop = Game.FixedStepGameLoop;
Game.config.FRAME_RATE = 50;

Game.main = function(configuration) {
  var jquery = configuration.jquery;
  var document = configuration.document;
  var canvas = configuration.canvas;

  var assets = new Game.config.assets(jquery);
  var scheduler = new Game.config.scheduler(Game.config.FRAME_RATE);
  var screen = new Game.Screen(canvas, assets);
  var drawer = new Game.config.drawer(screen);
  var updater = new Game.config.updater(assets);
  var loop = new Game.config.gameLoop(scheduler, updater, drawer);

  Game.bindEvents(jquery, document, updater);

  loop.start();
};


Game.bindEvents = function(jquery, document, updater) {
  jquery(document.documentElement).bind({
    keyup: function(event) {
      if (typeof(updater.keyup) !== "undefined") {
        updater.keyup(event);
      }
    },

    keydown: function(event) {
      if (typeof(updater.keydown) !== "undefined") {
        updater.keydown(event);
      }
    }
  });
}

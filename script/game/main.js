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

Game.main = function(jquery, context) {
  var assets = new Game.config.assets(jquery);
  var scheduler = new Game.config.scheduler(Game.config.FRAME_RATE);
  var drawer = new Game.config.drawer(context, assets);
  var updater = new Game.config.updater(assets);
  var loop = new Game.config.gameLoop(scheduler, updater, drawer);
  loop.start();
};

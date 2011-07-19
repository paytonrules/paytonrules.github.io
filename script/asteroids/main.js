if (typeof(Asteroids) === "undefined") {
  Asteroids = {};
}

Asteroids.main = function(context) {
  var assets = new Game.Assets($);
  var scheduler = new Game.Scheduler(50);
  var loop = new Game.FixedStepGameLoop(scheduler);
  var drawer = new Asteroids.Drawer(context, assets);
  var updater = new Asteroids.Updater(assets);
  
  loop.update = updater.update;
  loop.draw = drawer.draw;
  scheduler.start(loop.loop);
};

if (typeof(Experiment) === "undefined") {
  Experiment = {};
}

Experiment.main = function(context) {
  var assets = new Game.Assets($);
  var scheduler = new Game.Scheduler(50);
  var loop = new Game.FixedStepGameLoop(scheduler);
  var drawer = new Experiment.Drawer(context, assets);
  var updater = new Experiment.Updater(assets);
  
  loop.update = updater.update;
  loop.draw = drawer.draw;
  scheduler.start(loop.loop);
};

if (typeof(Experiment) === "undefined") {
  Experiment = {};
}

Experiment.main = function(context) {
  var drawer = new Experiment.Drawer(context);
  var updater = new Experiment.Updater();
  var scheduler = new Game.Scheduler(50);
  var loop = new Game.FixedStepGameLoop(scheduler);
  
  loop.update = updater.update;
  loop.draw = drawer.draw;
  scheduler.start(loop.loop);
};

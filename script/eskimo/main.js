Game = function(depend) {
  console.log(Game.Scheduler);
  console.log(Game.FixedGameLoop);
  console.log(Game.Assets);
  console.log(Game.Screen);
  var dependencies = depend || {}, 
      Scheduler = dependencies['scheduler'] || Game.Scheduler,
      GameLoop = dependencies['gameLoop'] || Game.FixedGameLoop,
      Assets = dependencies['assets'] || Game.Assets,
      Drawer = dependencies["drawer"],
      Updater = dependencies["updater"],
      Screen = Game.Screen,
      scheduler;

  function bindEvents(jquery, document, updater) {
    jquery(document.documentElement).bind({
      keydown: function(event) {
        if (typeof(updater.keydown) !== "undefined") {
          updater.keydown(event);
        }
      },

      keyup: function(event) {
        if (typeof(updater.keyup) !== "undefined") {
          updater.keyup(event);
        }
      }
    });

  };

  return {
    start: function(configuration) {
      var FRAME_RATE = configuration.FRAME_RATE || 60;
      scheduler = new Scheduler(FRAME_RATE);
      var assets = new Assets(configuration.jquery);
      var drawer = new Drawer(new Screen(configuration.canvas, assets));
      var updater = new Updater(assets);
      var loop = new GameLoop(scheduler, updater, drawer);

      bindEvents(configuration.jquery, configuration.document, updater); 

      loop.start();
    }
  };
};

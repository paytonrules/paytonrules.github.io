var glob = require('glob');

var files = [].concat(glob.globSync(__dirname + "/../script/game/**/*.js"),
                      glob.globSync(__dirname + "/../script/asteroids/**/*.js"));

files.forEach(function(filepath) {
  require(filepath);
});
exports.Asteroids = Asteroids;
exports.Game = Game;

var glob = require('glob');

var files = [].concat(glob.globSync(__dirname + "/../script/game/**/*.js"));

files.forEach(function(filepath) {
  require(filepath);
});

require(__dirname + "/../script/asteroids/draw.js");
require(__dirname + "/../script/asteroids/update.js");
require(__dirname + "/../script/asteroids/config.js");

exports.Asteroids = Asteroids;
exports.Game = Game;

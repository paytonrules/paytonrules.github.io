var glob = require('glob');

var files = [].concat(glob.globSync(__dirname + "/../script/game/**/*.js"));

files.forEach(function(filepath) {
  require(filepath);
});

require(__dirname + "/../script/breakout/draw.js");
require(__dirname + "/../script/breakout/update.js");
require(__dirname + "/../script/breakout/config.js");

exports.Breakout = Breakout;
exports.Game = Game;

var glob = require('glob');

// Sure would be nice not to have to include EVERYTHING here
require(__dirname + "/../script/game/array_ext.js");
require(__dirname + "/../script/game/main.js"); // Main must go first
require(__dirname + "/../script/game/assets.js");
require(__dirname + "/../script/game/fixed-game-loop.js");
require(__dirname + "/../script/game/key_codes.js");
require(__dirname + "/../script/game/scheduler.js");
require(__dirname + "/../script/game/screen.js");
require(__dirname + "/../script/game/config.js"); // Config must go last

require(__dirname + "/../script/breakout/updater.js");  // Updater must go first
require(__dirname + "/../script/breakout/drawer.js"); // Drawer must go last

exports.Game = global.Game;
exports.Breakout = global.Breakout;

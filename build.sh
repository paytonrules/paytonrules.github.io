java -jar compiler.jar --js=node_modules/underscore/underscore-min.js \
                       --js=script/game/main.js \
                       --js=script/game/assets.js \
                       --js=script/game/fixed-game-loop.js \
                       --js=script/game/key-codes.js \
                       --js=script/game/scheduler.js \
                       --js=script/game/screen.js \
                       --js=script/game/config.js \
                       --js=script/breakout/updater.js \
                       --js=script/breakout/image-loader.js \
                       --js=script/breakout/drawer.js \

                       --js=script/breakout/config.js \

                       --js_output_file=script/breakout.min.js

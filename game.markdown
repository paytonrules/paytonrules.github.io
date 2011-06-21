---
layout: default
title: Experimental Game Page
---

<script>
  jQuery(function() {
    Game.start($("#game")[0].getContext("2d"));
  });

  var Game = {
    start: function(context) {
             Game.context = context;
             setInterval(Game.gameLoop, 1000 / 60);
           },

    gameLoop: function() {
                Game.loopCounter++;
                console.log(Game.loopCounter);

                Game.context.fillStyle = "#aaaaaa";
                Game.context.fillRect(0, 0, 200, 200);
                Game.context.fillStyle = "#000000";
                Game.context.font = '20px _sans';
                Game.context.textBaseline = 'top';
                Game.context.fillText ("Canvas!", Game.loopCounter % 60, Game.loopCounter % 60);
              },
    loopCounter: 0
  };  

</script>

<canvas id="game">
  Test Here
</canvas>

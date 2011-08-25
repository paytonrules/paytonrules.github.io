---
layout: default
title: Experimental Game Page
---

<script>
  jQuery(function() {
    Game({updater: Breakout.Updater,
          drawer: Breakout.Drawer}).start({jquery: $, 
                                           canvas: $("#game"), 
                                           document: document});
  });
</script>

<canvas id="game" width="640px;" height="480px;">
  Test Here
</canvas>

---
layout: default
title: Experimental Game Page
---

<script>
  jQuery(function() {
    Game.main({jquery: $, 
               context: $("#game")[0].getContext("2d"), 
               document: document});
  });
</script>

<canvas id="game">
  Test Here
</canvas>

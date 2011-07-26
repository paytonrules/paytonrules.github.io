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

<canvas id="game" width="640px;" height="480px;">
  Test Here
</canvas>

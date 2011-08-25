Breakout.Updater = function(assets) {
  var location = {x: Breakout.INITIAL_POSITION},
      movingRight = false,
      movingLeft = false,
      gameObjects = {};

  //hasOwnProperty
  for (var objectName in Breakout.GameRecipie) {
    gameObjects[objectName] = new Breakout.GameRecipie[objectName];
  };

  // Not tested directly yet
  // Two places two change things (ball updater, ball image loader)
  Breakout.ImageLoader.load(assets);

  // Almost certainly frameworkable ('keystate')
  this.keydown = function(event) {
    switch (event.which) {
      case Eskimo.KeyCodes.RIGHT_ARROW:
        movingRight = true;
        break;
      case Eskimo.KeyCodes.LEFT_ARROW:
        movingLeft = true;
        break;
      case Eskimo.KeyCodes.SPACEBAR:
        gameObjects['ball'].launch();
        break;
    }
  };

  this.keyup = function(event) {
    switch (event.which) {
      case Eskimo.KeyCodes.RIGHT_ARROW:
        movingRight = false;
        break;
      case Eskimo.KeyCodes.LEFT_ARROW:
        movingLeft = false;
        break;
    }
  };

  // State is an input/output param.  Probably should not be a data structure.
  // really represents the current state for drawing
  this.update = function(imageList) {
    if (movingRight) {
      location.x += Breakout.PADDLE_VELOCITY;
    }

    if (movingLeft) {
      location.x -= Breakout.PADDLE_VELOCITY;
    }
    
    imageList.push({name: 'paddle',
                   location: {x: location.x,
                              y: Breakout.PADDLE_ROW}});

    gameObjects['ball'].update(imageList);

  };
};

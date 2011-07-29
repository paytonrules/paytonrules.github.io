describe("Drawer", function() {
  var Breakout, drawer;

  var screen = {
    drawImage: function(image, x, y) {
    },
    clear: function() {
    }
  };


  var gameState = {
    paddle: {
      x: 0,
      y: 0
    }
  };

  beforeEach( function() {
    Breakout = require('specHelper').Breakout;
    drawer = new Breakout.Drawer(screen);
  });

  it('draws the paddle', function() {
    spyOn(screen, 'drawImage');
    gameState.paddle.x = 10;
    gameState.paddle.y = 20;
    
    drawer.draw(gameState);

    expect(screen.drawImage).toHaveBeenCalledWith('paddle', 10, 20);
  });

  it('clears the screen', function() {
    spyOn(screen, 'clear');

    drawer.draw(gameState);

    expect(screen.clear).toHaveBeenCalled();
  });

  it('calls clear on the screen first', function() {
    var callOrder = [];
    var trackClear = function() {
      callOrder.push("clear");
    };
    var trackOthers = function() {
      callOrder.push("anything Else");
    };

    spyOn(screen, 'clear').andCallFake(trackClear);
    spyOn(screen, 'drawImage').andCallFake(trackOthers);

    drawer.draw(gameState);

    expect(callOrder[0]).toEqual("clear");
  });

});

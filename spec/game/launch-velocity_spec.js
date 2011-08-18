describe("LaunchVelocity", function() {
  var Breakout;
  
  beforeEach(function() {
    Breakout = require("specHelper").Breakout;
  });

  it("returns a random direction in y, less than 0", function() {
    var direction;
    for(var i = 0; i < 1000; i++) { 
      direction = Breakout.LaunchVelocity();
      expect(direction.y).toBeGreaterThan(0);
    }
  });

  it("returns a random direciton in x", function() {
  });

  it("always has a length of ball velocity", function() {
  });

});

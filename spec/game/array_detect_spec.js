describe("Array#detect", function() {
  beforeEach(function() {
    require("specHelper");
  });

  it("detects first matching element based on the passed in function", function() {
    var a = [1, 2];

    var b = a.detect(function(elem) {
      return elem === 2;
    });

    expect(b).toEqual(2);
  });

  it("returns nil if the element is not in the list", function() {
    var a = [1, 2];
    
    var b = a.detect(function(elem) {
      return elem === 3;
    });

    expect(b).toBeNull();
  });
});

describe("Array#any", function() {
  beforeEach(function() {
    require("specHelper");
  });

  it("is false if there are no matching elements", function() {
    var a = [1, 2];

    var b = a.any(function(elem) {
      return elem === 3;
    });

    expect(b).toBeFalsy();
  });

  it("is true if there is a matching element", function() {
    var a = [1, 2];

    var b = a.any(function(elem) {
      return elem === 2;
    });

    expect(b).toBeTruthy();
  });
});

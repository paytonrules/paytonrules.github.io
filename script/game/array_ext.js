Array.prototype.detect = function(fn) {
  for (var i = 0; i < this.length; i++)
  {
    if (fn(this[i]) ) {
      return this[i];
    }
  }
  return null;
};

Array.prototype.any = function(fn) {
  var value = this.detect(fn);
  return (value !== null) ? true : false;
};

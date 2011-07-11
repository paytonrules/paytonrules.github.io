describe("Updater", function() {
  var Experiment, updater, state;

  beforeEach( function() {
    Experiment = require("specHelper").Experiment;
    updater = new Experiment.Updater();
    state = {};
  });

  it("updates the loop count on each call", function() {
    updater.update(state);

    expect(state.loopCount).toEqual(1);
  });

  it("increments if called twice", function() {
    updater.update(state);
    updater.update(state);

    expect(state.loopCount).toEqual(2);
  });

  it("resets at 60", function() {
    state.loopCount = 60;
    updater.update(state);

    expect(state.loopCount).toEqual(1);
  });

});

describe("Drawer", function() {

  it('draws on my context', function() {
    var context = {};

    var drawer = new Experiment.Drawer(context);

    drawer.draw();

    expect(context.fillStyle).toEqual("#aaaaaa");
  });

});

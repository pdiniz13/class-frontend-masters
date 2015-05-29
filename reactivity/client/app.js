dep = new Tracker.Dependency;

Name = {
  _value: 'Evented Mind',

  get: function () {
    return this._value;
  }
};

c1 = Tracker.autorun(function (computation) {
  dep.depend();
  var name = Name.get();
  console.log(name);
});

c2 = Tracker.autorun(function () {
  dep.depend();
  var name = Name.get();
  console.log(name);
});

rerun = function () {
  dep.changed();
  Tracker.flush();
  console.log("Okay done invalidating");
};

Name = {
  _value: 'Evented Mind',

  _dep: new Tracker.Dependency,

  get: function () {
    this._dep.depend();
    return this._value;
  },

  set: function (value) {
    this._value = value;
    this._dep.changed();
  }
};

Tracker.autorun(function () {
  var name = Name.get();
  console.log(name);
});

Tracker.autorun(function () {
  var name = Name.get();
  console.log(name);
});

rerun = function () {
  dep.changed();
  Tracker.flush();
  console.log("Okay done invalidating");
};

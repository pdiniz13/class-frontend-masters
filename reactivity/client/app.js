dep = new Tracker.Dependency;

Tracker.autorun(function (computation) {
  dep.depend();
  console.log('1');
});

Tracker.autorun(function () {
  dep.depend();
  console.log('2');
});

rerun = function () {
  dep.changed();
  Tracker.flush();
  console.log("Okay done invalidating");
};

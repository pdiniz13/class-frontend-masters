Comments = new Mongo.Collection('comments');

if (Meteor.isClient) {
  Meteor.subscribe('allComments');

  Meteor.methods({
    callMe: function (name) {
      console.log('simulation: ' + name);
    }
  });

  Meteor.call("callMe", "Chris", function (err, result) {
    if (err) throw err;
    console.log('result: ' + result);
  });

  Template.registerHelper('get', function (key) {
    return Session.get(key);
  });


  var counter = 1;
  setInterval(function () { 
    Session.set('counter', ++counter);
  }, 1000);

  Template.Helpers.helpers({
    myDataContext: function () {
      return {
        myProperty: 'some value!'
      };
    },

    isTrue: function () {
      return Session.equals('isTrue', true);
    }
  });

  Template.CommentList.helpers({
    comments: function () {
      return Comments.find();
    },

    formatTimestamp: function (timestamp) {
      return moment(timestamp).calendar();
    }
  });

  Template.CommentAdd.events({
    'submit form': function (e, tmpl) {
      e.preventDefault();

      var formEl = tmpl.find('form');
      var commentEl = tmpl.find('[name=comment]');
      var comment = commentEl.value;

      Comments.insert({
        login: 'cmather',
        timestamp: new Date,
        room: 'main',
        comment: comment
      });

      formEl.reset();
    }
  });
}

if (Meteor.isServer) {
  Comments.allow({
    insert: function (userId, doc) {
      return !!userId;
    },

    update: function (userId, doc) {
      return false;
    },

    remove: function (userId, doc) {
      return false;
    }
  });

  Meteor.methods({
    callMe: function (name) {
      return "hello, " + name;
    }
  });

  Meteor.publish('allComments', function () {
    if (this.userId)
      return Comments.find();
    else
      return this.ready();
  });
}

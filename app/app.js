Comments = new Mongo.Collection('comments');

if (Meteor.isClient) {
  Meteor.subscribe('comments');
  Meteor.subscribe('recentComments');

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
  Meteor.publish('comments', function () {
    var cursor = Comments.find();
    var self = this;

    cursor.observeChanges({
      added: function (id, fields) {
        console.log('added', id, fields);
      },

      changed: function (id, fields) {
        console.log('changed', id, fields);
      },

      removed: function (id) {
        console.log('removed', id);
      }
    });
  });
}

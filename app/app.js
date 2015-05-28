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
    this.added('comments', '1', {comment: 'first comment'});
    this.added('comments', '2', {comment: 'second comment'});
    this.added('comments', '3', {comment: 'third comment'});
    this.ready();

    var self = this;
    setTimeout(function () {
      self.changed('comments', '1', {comment: undefined});
    }, 3000);
  });

  Meteor.publish('recentComments', function () {
    this.added('comments', '1', {
      login: 'cmather'
    });
  });
}

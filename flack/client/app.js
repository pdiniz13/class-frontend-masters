/*****************************************************************************/
/* Subscriptions */
/*****************************************************************************/
Meteor.subscribe('comments');
Meteor.subscribe('users');
//TODO

/*****************************************************************************/
/* Initial State */
/*****************************************************************************/
Session.set('activeRoom', 'main');
Session.set('showInviteConfirm', false);

/*****************************************************************************/
/* RPC Methods */
/*****************************************************************************/
Meteor.methods({
  inviteFriend: function (email) {
    // TODO
  }
});

/*****************************************************************************/
/* Template Helpers */
/*****************************************************************************/
Template.Navigation.helpers({
  rooms: function () {
    return Rooms.find({name: {$ne: 'main'}}, {sort: {name: 1}});
  },

  isRoomActiveClass: function (room) {
    // TODO
  },

  showInviteConfirm: function () {
    // TODO
  }
});

Template.Room.helpers({
  activeRoom: function () {
    // TODO
  }
});

Template.RoomAddDialog.helpers({
  showRoomAddDialog: function () {
    // TODO
  }
});

Template.CommentList.helpers({
  comments: function () {
    var room = Session.get('activeRoom');
    return Comments.find({room: room}, {sort: {timestamp: 1}});
  }
});

Template.CommentItem.helpers({
  formattedTimestamp: function (timestamp) {
    return moment(timestamp).calendar();
  },

  avatarUrl: function () {
    var comment = this;
    var user = Meteor.users.findOne({'profile.login': comment.login});
    return user.profile.avatarUrl;
  }
});

/*****************************************************************************/
/* Template Events */
/*****************************************************************************/
Template.Navigation.events({
  'click [data-room-add]': function (e, tmpl) {
    // TODO
  },

  'click [data-room]': function (e, tmpl) {
    var room = $(e.target).data('room');
    Session.set('activeRoom', room);
  },

  'submit form[data-invite]': function (e, tmpl) {
    e.preventDefault();

    var form = e.target;
    var email = tmpl.find('[name=email]').value;
    form.reset();

    Meteor.call('inviteFriend', email);
  }
});

Template.RoomAddDialog.events({
  'submit form': function (e, tmpl) {
    e.preventDefault();

    var form = tmpl.find('form');
    var roomName = tmpl.find('input[name=room]').value;

    form.reset();

    if (roomName.trim() == "")
      return;

    if (Rooms.findOne({name: roomName}))
      return;

    Rooms.insert({
      name: roomName
    });

    //TODO
    Session.set('activeRoom', roomName);
  },

  'click [data-cancel]': function (e, tmpl) {
    e.preventDefault();
    var form = tmpl.find('form');
    form.reset();
    Session.set('showRoomAddDialog', false);
  }
});

Template.CommentAdd.events({
  // TODO implement submit form handler
  'submit form': function(e, tmpl){
    e.preventDefault();

    var form  = tmpl.find('comment');
    var comment = tmpl.find('[name=comment]').value;

    if (comment.trim() == ""){
      return;
    }

    var insComment = {
      comment: comment,
      login: Meteor.user().profile.login,
      timestamp: new Date,
      room: "main"
    };
    Comments.insert(insComment);

    var scrollHeight = $('.comment-list').height();
    $(".main-list").animate({ scrollTop: scrollHeight }, "slow");
    form.reset();
  }
});

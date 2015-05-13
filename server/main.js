if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
    //PlayersList.update({created: null}, {$set: {created: moment().format() }}, {multi: true} );
  });
  Meteor.publish('thePlayers', function() {
    var currentUserId = this.userId;
    return PlayersList.find({createdBy: currentUserId});
  });
  Meteor.methods({
    'sendLogMessage': function(msg) {
      console.log("Message from client: " + msg);
    },
    'insertPlayerData': function(playerNameVar) {
      var currentUserId = Meteor.userId();
      PlayersList.insert({
        name: playerNameVar,
        score: 0,
        createdBy: currentUserId,
        created: moment().format()
      })
    },
    'removePlayerData': function(selectedPlayer) {
      PlayersList.remove(selectedPlayer);
    },
    'modifyPlayerScore': function(selectedPlayer, scoreValue) {
      PlayersList.update(selectedPlayer, {$inc: {score: scoreValue} });
    }
  });
}
// if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Meteor.subscribe('thePlayers');

  Template.leaderboard.helpers({
    'player': function() {
      // var currentUserId = Meteor.userId();
      // return PlayersList.find({createdBy: currentUserId}, {sort: {score: -1, name: 1} });
      return PlayersList.find({}, {sort: {score: -1, name: 1}});
    },
    'other': function() {
      return "more functions";
    },
    'selectedClass': function() {
      var playerId = this._id;
      var selectedPlayer = Session.get('selectedPlayer');
      if (playerId == selectedPlayer) {
        console.log("selected");
        return "selected";
      }
    },
    'showSelectedPlayer': function() {
      var selectedPlayer = Session.get('selectedPlayer');
      return PlayersList.findOne(selectedPlayer);
    },
    'created': function() {
      if (this.created)
        return "Created " + moment(this.created).fromNow();
    }
  });

  Template.leaderboard.events({
    'click .player': function() {
      var playerId = this._id;
      var score = this.score++;
      console.log(playerId + " scored " + score);
      Session.set('selectedPlayer', playerId);
    },
    'click .increment': function() {
      var selectedPlayer = Session.get('selectedPlayer');
      // console.log("Give points to " + selectedPlayer);
      // score = PlayersList.findOne(selectedPlayer).score + 5;
      // PlayersList.update(selectedPlayer, {$inc: {score: 5}});
      Meteor.call('modifyPlayerScore', selectedPlayer, 5);
    },
    'click .decrement': function() {
      var selectedPlayer = Session.get('selectedPlayer');
      // PlayersList.update(selectedPlayer, {$inc: {score: -5}});
      Meteor.call('modifyPlayerScore', selectedPlayer, -5);
    },
    'click .remove': function() {
      var selectedPlayer = Session.get('selectedPlayer');
      // PlayersList.remove(selectedPlayer);
      Meteor.call('removePlayerData', selectedPlayer);
    }
  });

  Template.addPlayerForm.events({
    'submit form': function(event) {
      event.preventDefault();
      var playerNameVar = event.target.playerName.value;
      // var currentUserId = Meteor.userId();
      // PlayersList.insert({
      //   name: playerNameVar,
      //   score: 0,
      //   createdBy: currentUserId
      // });
      console.log("Added new player name as " + playerNameVar);
      Meteor.call('sendLogMessage', playerNameVar);
      Meteor.call('insertPlayerData', playerNameVar);
    }
  })

  Template.hello.helpers({
    counter: function () {
      return Session.get('counter');
    }
  });

  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
    }
  });
// }

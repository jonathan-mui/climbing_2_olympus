// var daboard = new Board(['jon', 'joe', 'jake'])

var Board = CLIMBING2OLYMPUS.board = function (playerNames) {
    this.colorOrder = ["orange", "green", "red", "brown", "black"];
    this.players = this.newPlayers(playerNames);
    // console.log(this.players);
    this.currentPlayer = this.players[0];
    this.boardPositions = 75; // number of steps on the board.
    this.beginningStepPosition = 0;
    this.endStepPosition = 76;
    this.starredSpaces = [4, 8, 11, 17, 21, 24, 30, 35, 40, 44, 48, 52, 56, 63, 68, 73];
    this.chanceCardTypes = ["anotherTurn", "skipATurn", "allBack3Spaces", "forward5Spaces", "back2Spaces"];
    this.board = this.blankBoard();
};

// Board.prototype.anotherTurn = function () {
//     // TODO
//     console.log("TODO");
// };
//
// Board.prototype.skipATurn = function () {
//     // TODO
//     console.log("TODO");
// };

// Board.prototype.allBack3Spaces = function () {
//     this.players.forEach(function (player) {
//         this.movePlayer(player, 5);
//     });
// };
//
// Board.prototype.forward5Spaces = function (player) {
//     this.movePlayer(player, 5);
// };
//
// Board.prototype.back2Spaces = function (player) {
//     this.movePlayer(player, -2);
// };
//
// Board.prototype.rollDice = function () {
//     return Math.floor(Math.random() * 6) + 1;
// };

// Board.prototype.isStarredSpace = function (position) {
//     return this.starredSpaces.includes(position);
// };

// Board.prototype.validPosition = function (newPosition) {
//     return newPosition >= this.beginningStepPosition &&
//            newPosition <= this.endStepPosition;
// };
//
// // This will return the player or undefined
// Board.prototype.checkForWinner = function () {
//     return this.playerAtPosition(this.endStepPosition);
// };

// This returns the player at the given position, otherwise undefined
// Board.prototype.playerAtPosition = function (newPosition) {
//     return this.players.find(function (player) {
//         // TODO: will this fail because of the wrong 'this'?
//         return player.position === newPosition;
//     });
// };

// Board.prototype.movePlayer = function (player, travelingDistance) {
//     var destinationPosition = player.position + travelingDistance;
//     // never go below position 0
//     if (destinationPosition < 0) {
//         destinationPosition = 0;
//     }
//
//     if (this.validPosition(destinationPosition)) {
//         var playerAtDestination = this.playerAtPosition(destinationPosition);
//         if (playerAtDestination !== undefined) {
//             playerAtDestination.position = player.position;
//             if (isStarredSpace(playerAtDestination.position)) {
//                 alert("playerAtDestination on a starredSpace");
//             }
//         }
//         player.position = destinationPosition;
//         if (isStarredSpace(player.position)) {
//             alert("player on a starredSpace");
//         }
//     }
// };

Board.prototype.nextTurn = function () {
    var currentPlayerIndex = this.players.indexOf(this.currentPlayer);
    var nextPlayerIndex = (currentPlayerIndex + 1) % this.players.length;
    this.currentPlayer = this.players[nextPlayerIndex];
};

// Setup stuff below //

// Board.prototype.resetBoard = function () {
//     this.currentPlayer = this.players[0];
//     this.board = this.blankBoard();
// };

// Board.prototype.newPlayers = function (playerNames) {
//     var that = this;
//     var players = [];
//     playerNames.forEach(function (name, i) {
//         players.push({
//             name: name,
//             color: that.colorOrder[i] // TODO: bad use of this?
//         });
//     });
//     return players;
// };

// Board.prototype.blankBoard = function () {
//     return new Array(this.boardSteps);
// };


// var daboard = new Board(['jon', 'joe', 'jake'])

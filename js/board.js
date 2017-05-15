// 76 positions
// _newPlayers(['jon', 'jane', 'joe'])

var Board = CLIMBING2OLYMPUS.board = function (playerNames) {
  this.colorOrder = ['orange', 'green', 'red'];
  this.players = _newPlayers(playerNames);
  this.currentPlayer = this.players.first;
  this.boardPositions = 75; // number of steps on the board.
  this.beginningStepPosition = 0;
  this.endStepPosition = 76;
  this.starredSpaces = [4,8,11,17,21,24,30,35,40,44,48,52,56,63,68,73]
  this.board = _blankBoard();
};

Board.prototype.rollDice = function() {
  return Math.floor(Math.random() * 6) + 1;
}

Board.prototype.onStarredSpace = function(player) {
  return this.starredSpaces.includes(player.position)
}

Board.prototype.validPosition = function (newPosition) {
  return newPosition >= this.beginningStepPosition &&
         newPosition <= this.endStepPosition;
}

// This will return the player or undefined
Board.prototype.checkForWinner = function() {
  return this.players.find(function(player) {
    // will this fail because of the wrong 'this'?
    return player.position == this.endStepPosition
  });
};

Board.prototype.checkIfOccupied = function(player, ) {
  // TODO
};

Board.prototype.movePlayer = function(player, travelingDistance) {
  var destinationPosition = player.position + travelingDistance;
  // never go below position 0
  if (destinationPosition < 0) {
    destinationPosition = 0;
  }

  if (validPosition(destinationPosition)) {
    player.position = destinationPosition;
  }
};

Board.prototype.resetBoard = function() {
  this.currentPlayer = this.players[0];
  this.board = _blankBoard();
};

_newPlayers = function(playerNames) {
  var players = []
  playerNames.forEach(function(name, i) {
    players.push({
      name: name,
      color: colorOrder[i]
    })
  })
  return players;
}

_blankBoard = function(n) {
  return new Array(this.boardSteps);
};


// OLD CODE BELOW //



Board.prototype.swapPlayer = function() {
  if (this.currentPlayer == 'x') {
    this.currentPlayer = 'o';
  } else {
    this.currentPlayer = 'x';
  }
};

_validWins = function(rows) {
  var validWins = [];
  diag = [];
  diag2 = [];
  for (i = 0; i < rows; i++) {
    hori = [];
    vert = [];
    for (j = 0; j < rows; j++) {
      hori.push([i,j]);
      vert.push([j,i]);
    }
    diag.push([i,i]);
    diag2.push([i,rows-1-i]);
    validWins.push(hori);
    validWins.push(vert);
  }
  validWins.push(diag2);
  validWins.push(diag);
  return validWins;
};

var Board = TTT.Board = function($el,rows) {
  this.currentPlayer = 'x';
  this.rows = rows;
  this.moves = 0;
  this.board = _blankboard(rows);
};

Board.prototype.move = function(pos) {
  var boardCell = this.board[pos[0]][pos[1]];
  if (boardCell === '.') {
    this.board[pos[0]][pos[1]] = this.currentPlayer;
    this.moves += 1;
    return this.currentPlayer;
  } else {
    return false;
  }
};

Board.prototype.swapPlayer = function() {
  if (this.currentPlayer == 'x') {
    this.currentPlayer = 'o';
  } else {
    this.currentPlayer = 'x';
  }
};

Board.prototype.resetBoard = function() {
  this.moves = 0;
  this.board = _blankboard(this.rows);
};

Board.prototype.checkWin = function() {
  var that = this;
  won = false;
  winning = [];
  for (i = 0; i < this.rows; i++) {
    winning.push(this.currentPlayer);
  }
  _validWins(this.rows).forEach(function(arr) {
    var potential = [];
    var potentialPos = [];
    arr.forEach(function(cell) {
      potential.push(that.board[cell[0]][cell[1]]);
      potentialPos.push([cell[0], cell[1]]);
    });
    if (potential.toString() === winning.toString()) {
      won = potentialPos;
    }
  });
  return won;
};

Board.prototype.checkTie = function() {
  if (this.moves == this.rows * this.rows) {
    return true;
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

_blankboard = function(n) {
  var grid = [];
  for (i = 0; i < n; i++) {
    row = [];
    for (j = 0; j < n; j++) {
      row.push('.');
    }
    grid.push(row);
  }
  return grid;
};

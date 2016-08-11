(function() {
  if (typeof TTT === 'undefined') {
    window.TTT = {};
  }
})();

var Game = TTT.Game = function($el,rows,$reset,$announcement) {
  this.board = new Board($el,rows, $reset);
  this.rows = rows;
  this.$el = $el;
  this.$reset = $reset;
  this.$announcement = $announcement;
  this.setupBoard();
};

Game.prototype.setupBoard = function() {
  var cellSize = (($(window).width() - 60) / this.rows) - 10;
  cellSize = (cellSize < 100 ? cellSize : 100);
  this.$el.css('font-size', cellSize + 'px')
    .css('line-height', cellSize * 0.85 + 'px');
  this.$el.html('');
  this.$el.removeClass('completed');
  for(i = 0; i < this.rows; i++) {
    var row = $('<div>').addClass('row');
    for (j = 0; j < this.rows; j++) {
      row.append($('<div>')
        .addClass('cell row-' + i + ' col-' + j)
        .css('width', cellSize)
        .css('height', cellSize)
        .data('row', i).data('col', j));
    }
    this.$el.append(row);
  }
  this.bindListeners();
  this.turnAnnouncement();
};

Game.prototype.bindListeners = function() {
  $('.cell').click(this.clickListener.bind(this));
  this.$reset.click(this.resetBoardListener.bind(this));
};

Game.prototype.clickListener = function(e) {
  var row = $(e.target).data('row');
  var col = $(e.target).data('col');
  var marker = this.board.move([row,col]);
  if (!!marker) {
    $('.cell.row-' + row + '.col-' + col).html(marker).addClass('marker-' + marker);
  } else {
    this.$announcement.text('Oops, this cell is taken!');
    return;
  }
  if (this.winAnnouncement()) return;
  if (this.checkTie()) return;
  this.board.swapPlayer();
  this.turnAnnouncement();
};

Game.prototype.winAnnouncement = function() {
  won = this.board.checkWin();
  if (!!won) {
    won.forEach(function(pair) {
      $('.cell.row-' + pair[0] + '.col-' + pair[1]).addClass('win');
    });
    this.$el.addClass('completed');
    this.$announcement.text(this.board.currentPlayer + ' wins!');
    $('.cell').off();
    return true;
  }
};

Game.prototype.checkTie = function() {
  if (this.board.checkTie()) {
    this.$announcement.text('Looks like a draw!');
    this.$el.addClass('completed');
    $('.cell').off();
    return true;
  }
};

Game.prototype.turnAnnouncement = function() {
  this.$announcement.text('Player ' + this.board.currentPlayer + "'s turn!");
};

Game.prototype.resetBoardListener = function( ){
  this.board.resetBoard();
  this.setupBoard();
};

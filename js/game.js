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
  var that = this;
  $('.cell').click(function() {
    var row = $(this).data('row');
    var col = $(this).data('col');
    var marker = that.board.move([row,col]);
    if (!!marker) {
      $('.cell.row-' + row + '.col-' + col).html(marker).addClass('marker-' + marker);
    } else {
      that.$announcement.text('Oops, that cell is taken!');
      return;
    }
    won = that.board.checkWin();
    if (!!won) {
      won.forEach(function(pair) {
        $('.cell.row-' + pair[0] + '.col-' + pair[1]).addClass('win');
      });
      that.$el.addClass('completed');
      that.$announcement.text(that.board.currentPlayer + ' wins!');
      $('.cell').off();
      return;
    }
    that.board.swapPlayer();
    that.turnAnnouncement();
  });
  this.$reset.click(this.resetBoard.bind(this));
};

Game.prototype.turnAnnouncement = function() {
  this.$announcement.text('Player ' + this.board.currentPlayer + "'s turn!");
};

Game.prototype.resetBoard = function( ){
  this.board.resetBoard();
  this.setupBoard();
};

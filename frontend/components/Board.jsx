import React from 'react';
import Cell from './Cell';
import classnames from 'classnames';

class Board extends React.PureComponent {
  renderGrid() {
    return Array(210).fill('.').map((el,idx) => {
      return <Cell key={idx} id={idx} />
    })
  }

  renderRow(start, numOfCells, shiftSpaces, reversed) {
    const classes = classnames({
      row: true,
      'row-reverse': reversed,
    })
    const style = {
      marginLeft: !reversed && `${45 * shiftSpaces}px`,
      marginRight: reversed && `${45 * shiftSpaces}px`,
    }
    return (
      <div className={classes} style={style}>
        {Array(numOfCells).fill('').map((el, idx) => {
          if (this.props.playerPosition.indexOf(start + idx) !== -1) {
            console.log(this.props.playerPosition.indexOf(start + idx) + 1)
            return <Cell key={idx} id={start + idx} playerId={this.props.playerPosition.indexOf(start + idx) + 1}/>
          }
          return <Cell key={idx} id={start + idx} />
        })}
      </div>
    )
  }

  renderGrid() {
    return (
      <div className="grid">
        {this.renderRow(1, 8, 2)}
        {this.renderRow(9, 1, 9)}
        {this.renderRow(10, 1, 9)}
        {this.renderRow(11, 10, 4, true)}
        {this.renderRow(21, 1)}
        {this.renderRow(22, 14)}
        {this.renderRow(36, 1, 13)}
        {this.renderRow(37, 9, 0, true)}
        {this.renderRow(46, 1, 5)}
        {this.renderRow(47, 7, 5)}
        {this.renderRow(54, 1, 11)}
        {this.renderRow(55, 1, 11)}
        {this.renderRow(56, 11, 2, true)}
        {this.renderRow(67, 1, 1)}
        {this.renderRow(68, 8, 1)}
      </div>
    )
  }

  getOrdinal(n) {
    const s=["th","st","nd","rd"];
    const v = n % 100;
    return n+(s[(v-20)%10]||s[v]||s[0]);
  }

  renderPlayerName(idx, name) {
    return (
      <div key={idx} className="board--player">
        <div className={`board--playerNumber board--playerNumber-${idx + 1}`}>
          {this.getOrdinal(idx + 1)}
        </div>
        <div className="board--playerName">{name}</div>
      </div>
    )
  }

  render() {
    return (
      <div className="wrapper">
        <header className="header">
          <img src="../images/logo.png" className="logo" />
          <div className="title">Climbing 2 Olympus</div>
          <i className="icon ion-close header--close" onClick={this.props.startOver} />
        </header>
        <div className="container">
          <aside className="leftSidebar">
            <div className="rollDice">
              Click to roll the dice
            </div>
            <div>
              <div className="board--players">Players</div>
              {this.props.nameOfPlayers.map((name, idx) => {
                return this.renderPlayerName(idx, name);
              })}
              <button
                className="button board--startOver"
                onClick={this.props.startOver}
              >
                Start Over
              </button>
            </div>
          </aside>
          <div className="content">
            {this.renderGrid()}
          </div>
        </div>
      </div>
    )
  }
}

Board.defaultProps = {
  nameOfPlayers:['Oscar', 'Jonathan', 'Jean Paul', 'Twinkie', 'Andre', 'Dawn'],
  playerPosition: [1, 5, 30, 20, 70, 44],
}

export default Board;

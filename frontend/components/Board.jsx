import React from 'react';
import Cell from './Cell';
import Dice from './Dice';
import classnames from 'classnames';

import { ROLL_DICE_DURATION } from '../constants';

class Board extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { rolling: false, currentDice: 1, };
    this.setDice = this.setDice.bind(this);
    this.rollDice = this.rollDice.bind(this);
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
          if (this.props.playerPositions.indexOf(start + idx) !== -1) {
            return <Cell key={idx} id={start + idx} playerId={this.props.playerPositions.indexOf(start + idx) + 1}/>
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
    const classes = classnames({
      'board--player': true,
      'board--player-is-active': this.props.activePlayerId === idx + 1,
    });
    return (
      <div key={idx} className={classes}>
        <div className={`board--playerNumber board--playerNumber-${idx + 1}`}>
          {this.getOrdinal(idx + 1)}
        </div>
        <div className="board--playerName">{name}</div>
      </div>
    )
  }

  setDice(val) {
    this.props.setPlayerPosition(this.props.activePlayerId - 1, val);
    this.setState({ rolling: false, currentDice: val });
  }

  rollDice(val) {
    setTimeout(this.setDice.bind(this, val), ROLL_DICE_DURATION);
    this.setState({ rolling: true });
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
              <Dice rolling={this.state.rolling} currentDice={this.state.currentDice} setDice={this.setDice} rollDice={this.rollDice} />
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
  playerPositions: [1, 5, 30, 20, 70, 44],
  activePlayerId: 1,
}

export default Board;

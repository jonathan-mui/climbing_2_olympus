import React from 'react';
import Cell from './Cell';
import classnames from 'classnames';

class Board extends React.PureComponent {
  renderGrid() {
    return Array(210).fill('.').map((el,idx) => {
      return <Cell key={idx} id={idx} />
    })
  }

  renderRow(start, numOfCells, shift, reversed) {
    const classes = classnames({
      row: true,
      'row-reverse': reversed,
    })
    const style = {
      marginLeft: !reversed && `${shift}px`,
      marginRight: reversed && `${shift}px`,
    }
    return (
      <div className={classes} style={style}>
        {Array(numOfCells).fill('').map((el, idx) => {
          return <Cell key={idx} id={start + idx} />
        })}
      </div>
    )
  }

  renderGrid() {
    return (
      <div className="grid">
        {this.renderRow(1, 8, 100)}
        {this.renderRow(9, 1, 450)}
        {this.renderRow(10, 1, 450)}
        {this.renderRow(11, 10, 200, true)}
        {this.renderRow(21, 1)}
        {this.renderRow(22, 14)}
        {this.renderRow(36, 1, 650)}
        {this.renderRow(37, 9, 0, true)}
        {this.renderRow(46, 1, 250)}
        {this.renderRow(47, 7, 250)}
        {this.renderRow(54, 1, 550)}
        {this.renderRow(55, 1, 550)}
        {this.renderRow(56, 11, 100, true)}
        {this.renderRow(67, 1, 50)}
        {this.renderRow(68, 8, 50)}
      </div>
    )
  }

  render() {
    return (
      <div>
        <header className="header">
          <img src="../images/logo.png" className="logo" />
          <div className="title">Climbing 2 Olympus</div>
          <i className="icon ion-close header--close" />
        </header>
        <div className="container">
          <aside className="leftSidebar">
            <div className="rollDice">
              Click to roll the dice
            </div>
            Players
            <div>hi</div>
            <div>hi</div>
            <div>hi</div>
            <button>Start Over</button>
          </aside>
          <div className="content">
            {this.renderGrid()}
          </div>
        </div>
      </div>
    )
  }
}

export default Board;

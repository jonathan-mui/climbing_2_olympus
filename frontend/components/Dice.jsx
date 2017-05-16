import React from 'react';

import { ROLL_DICE_SPEED } from '../constants';

class Dice extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      randomDice: 1,
    }
    this.timeout = setInterval(this.randomDice.bind(this), ROLL_DICE_SPEED);
  }

  randomDice() {
    this.timeout = setTimeout(this.randomDice.bind(this), ROLL_DICE_SPEED);
    const nextDice = Math.floor(Math.random() * (6 - 1 + 1)) + 1;
    this.setState({
      randomDice: nextDice,
    })
  }

  render() {
    if (this.props.rolling) {
      return (
        <img src={`../images/dice-${this.state.randomDice}.png`} className="board--dice" />
      )
    }
    return <img src={`../images/dice-${this.props.currentDice}.png`} className="board--dice" onClick={() => this.props.rollDice(this.state.randomDice)} />
  }
}

export default Dice;

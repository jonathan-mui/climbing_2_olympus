import React from 'react';

import { PLAYER_COLORS } from '../constants';

class Player extends React.PureComponent {
  render() {
    return (
      <div
        className="player"
        id={this.props.id}
        style={{ backgroundColor: PLAYER_COLORS[this.props.id - 1]}} />
    )
  }
}

export default Player;

import React from 'react';

import { PLAYER_COLORS } from '../constants';

// need to pass ID and position
class Player extends React.PureComponent {
  render() {
    return (
      <div className="player" id={this.props.id} style={{ backgroundColor: PLAYER_COLORS[this.props.id - 1]}}></div>
    )
  }
}

export default Player;

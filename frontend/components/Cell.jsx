import React from 'react';
import classnames from 'classnames';
import Player from './Player';

import { STARRED_SPACES } from '../constants';

class Cell extends React.PureComponent {
  cellClasses() {
    return classnames({
      cell: true,
      'cell-starred': STARRED_SPACES.indexOf(this.props.id) !== -1,
    })
  }

  render() {
    return (
      <div className={this.cellClasses()} id={this.props.id}>
        {this.props.playerId && <Player id={this.props.playerId}/>}
      </div>
    );
  }
}

export default Cell;

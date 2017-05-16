import React from 'react';
import classnames from 'classnames';
import Player from './Player';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import { STARRED_SPACES, GOD_SPACES, ORANGE_STARRED_SPACES } from '../constants';

class Cell extends React.PureComponent {
  cellClasses() {
    return classnames({
      cell: true,
      'cell-starred': STARRED_SPACES.indexOf(this.props.id) !== -1,
      'cell-orange': GOD_SPACES.indexOf(this.props.id) !== -1,
      'cell-orangeStarred': ORANGE_STARRED_SPACES.indexOf(this.props.id) !== -1,
    })
  }

  render() {
    return (
      <div className={this.cellClasses()} id={this.props.id}>
        <ReactCSSTransitionGroup
          transitionName="transition"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}
        >
          {this.props.playerId && <Player id={this.props.playerId}/>}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

export default Cell;

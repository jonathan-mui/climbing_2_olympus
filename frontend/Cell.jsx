import React from 'react';
import classnames from 'classnames';

const STARRED_SPACES = [4, 8, 11, 17, 21, 24, 30, 35, 40, 44, 48, 52, 56, 63, 68, 73];

class Cell extends React.PureComponent {
  cellClasses() {
    return classnames({
      cell: true,
      'cell-starred': STARRED_SPACES.indexOf(this.props.id) !== -1,
    })
  }

  render() {
    return (
      <div className={this.cellClasses()} id={this.props.id} />
    );
  }
}

export default Cell;

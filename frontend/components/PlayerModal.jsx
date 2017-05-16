import React from 'react';
import classnames from 'classnames';

class PlayerModal extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selecting: false,
      numOfPlayers: null,
    };
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect() {
    this.setState({ selecting: !this.state.selecting });
  }

  caretClasses() {
    return classnames({
      icon: true,
      'icon-caret': true,
      'ion-chevron-down': !this.props.selecting,
      'ion-chvron-up': this.props.selecting,
    })
  }

  renderContent() {
    if (!this.state.numOfPlayers) { return 'Select number of players' };
    return this.state.numOfPlayers;
  }

  renderOptions() {
    if (!this.state.selecting) {
      return null;
    }
    const setPlayers = (val) => { this.setState({ numOfPlayers: val })};
    return (
      <div className="playerModal--options">
      {[1,2,3,4,5,6].map((val) => {
        return (
          <div
            key={val}
            className="playerModal--option"
            onClick={() => {setPlayers(val)}}
          >
            {val}
          </div>
        )
      })}
      </div>
    )
  }

  selectClasses() {
    return classnames({
      'playerModal--select': true,
      'playerModal--select-is-selected': !!this.state.numOfPlayers,
    })
  }

  renderButton() {
    if (this.state.numOfPlayers) {
      return (
        <div
          className="button modalButton"
          onClick={() => this.props.saveNumOfPlayers(this.state.numOfPlayers)}
        >
          Go
        </div>
      )
    }
    return <div className="button modalButton modalButton-is-disabled">Go</div>
  }

  render() {
    return (
      <div className="overlay">
        <div className="modal">
          <div className="modal--header">
            How many players are playing?
            <i className="icon ion-close icon-close" />
          </div>
          <div className="modal--body">
            <div className="playerModal--body">
              <img src="../images/peopleicon.png" className="playerModal--peopleIcon"/>
              <div className={this.selectClasses()} onClick={this.handleSelect}>
                {this.renderContent()}
                <i className={this.caretClasses()} />
                {this.renderOptions()}
              </div>
              <div className="playerModal--disclaimer">
                * Maximum player is six
              </div>
              {this.renderButton()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default PlayerModal;

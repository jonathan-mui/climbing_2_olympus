import React from 'react';
import classnames from 'classnames';

import PlayerNameField from './PlayerNameField';

class NamePlayerModal extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      validNames: [],
    }
    this.addValidName = this.addValidName.bind(this);
    this.removeValidName = this.removeValidName.bind(this);
    this.saveNamesAndStartGame = this.saveNamesAndStartGame.bind(this);
  }

  addValidName(val) {
    if (this.state.validNames.indexOf(val) === -1) {
      this.setState({ validNames: this.state.validNames.concat(val) })
    }
  }

  removeValidName(val) {
    const newValidNames = this.state.validNames;
    newValidNames.splice(this.state.validNames.indexOf(val), 1);
    this.setState({ validNames: blah.splice(this.state.validNames.indexOf(val), 1) })
  }

  renderNameFields() {
    return (
      Array.apply(null, {length: this.props.numOfPlayers}).map(Number.call, Number).map((val) => {
        return (
          <PlayerNameField
            key={val}
            val={val}
            handleValidName={this.addValidName}
            handleInvalidName={this.removeValidName}
          />);
      })
    )
  }

  saveNamesAndStartGame() {
    const map = [];
    $("input").each(function() {
      map.push($(this).val());
    });
    this.props.saveNamesAndStartGame(map);
  }

  renderButton() {
    if (this.state.validNames.length === this.props.numOfPlayers) {
      return (
        <div
          className="button modalButton"
          onClick={this.saveNamesAndStartGame}
        >
          Start
        </div>
      )
    }
    return <div className="button modalButton modalButton-is-disabled">Start</div>
  }

  render() {
    return (
      <div className="overlay">
        <div className="modal">
          <div className="modal--header">
            Name the players
            <i className="icon ion-close icon-close" onClick={this.props.startOver} />
          </div>
          <div className="modal--body">
            <div className="playerModal--body">
              <img src="../images/peopleicon.png" className="playerModal--peopleIcon"/>
              {this.renderNameFields()}
              {this.renderButton()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default NamePlayerModal;

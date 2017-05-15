import React from 'react';
import PlayerModal from './PlayerModal';
import NamePlayerModal from './NamePlayerModal';
import Board from './Board';

const CHOOSE_PLAYERS = 'CHOOSE_PLAYERS';
const NAME_PLAYERS = 'NAME_PLAYERS';
const BOARD = 'BOARD';

class Game extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      phase: null,
      numOfPlayers: null,
    }
    this.playGame = this.playGame.bind(this);
    this.saveNumOfPlayers = this.saveNumOfPlayers.bind(this);
    this.saveNamesAndStartGame = this.saveNamesAndStartGame.bind(this);
  }

  playGame() {
    this.setState({ phase: CHOOSE_PLAYERS });
  }

  saveNumOfPlayers(val) {
    this.setState({ phase: NAME_PLAYERS, numOfPlayers: val });
  }

  saveNamesAndStartGame() {
    this.setState({ phase: BOARD });
  }

  render() {
    if (!this.state.phase) {
      return (
        <div className="start">
          <button className="button play" onClick={this.playGame}>Play</button>
        </div>
      );
    }

    if (this.state.phase === CHOOSE_PLAYERS) {
      return (
        <div className="start">
          <PlayerModal saveNumOfPlayers={this.saveNumOfPlayers} />
        </div>
      )
    }

    if (this.state.phase === NAME_PLAYERS) {
      return (
        <div className="start">
          <NamePlayerModal numOfPlayers={this.state.numOfPlayers} saveNamesAndStartGame={this.saveNamesAndStartGame}/>
        </div>
      )
    }

    if (this.state.phase === BOARD) {
      return (
        <Board />
      )
    }

  }
};

export default Game;

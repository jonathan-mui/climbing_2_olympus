import React from 'react';
import PlayerModal from './PlayerModal';
import NamePlayerModal from './NamePlayerModal';
import Board from './Board';

import { CHOOSE_PLAYERS, NAME_PLAYERS, BOARD } from '../constants';

class Game extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      phase: BOARD,
      numOfPlayers: null,
      nameOfPlayers: undefined,
      playerPosition: undefined,
    }
    this.startOver = this.startOver.bind(this);
    this.playGame = this.playGame.bind(this);
    this.saveNumOfPlayers = this.saveNumOfPlayers.bind(this);
    this.saveNamesAndStartGame = this.saveNamesAndStartGame.bind(this);
  }

  startOver() {
    this.setState({ phase: null });
  }

  playGame() {
    this.setState({ phase: CHOOSE_PLAYERS });
  }

  saveNumOfPlayers(val) {
    this.setState({ phase: NAME_PLAYERS, numOfPlayers: val });
  }

  saveNamesAndStartGame(names) {
    this.setState({ phase: BOARD, nameOfPlayers: names });
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
          <PlayerModal saveNumOfPlayers={this.saveNumOfPlayers} startOver={this.startOver} />
        </div>
      )
    }

    if (this.state.phase === NAME_PLAYERS) {
      return (
        <div className="start">
          <NamePlayerModal
            numOfPlayers={this.state.numOfPlayers}
            saveNamesAndStartGame={this.saveNamesAndStartGame}
            startOver={this.startOver}
          />
        </div>
      )
    }

    if (this.state.phase === BOARD) {
      return (
        <Board
          nameOfPlayers={this.state.nameOfPlayers}
          playerPosition={this.state.playerPosition}
          startOver={this.startOver}
        />
      )
    }

  }
};

export default Game;

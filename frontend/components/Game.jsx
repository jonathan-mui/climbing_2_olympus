import React from 'react';
import PlayerModal from './PlayerModal';
import NamePlayerModal from './NamePlayerModal';
import Board from './Board';

import { CHOOSE_PLAYERS, NAME_PLAYERS, BOARD } from '../constants';

class Game extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      phase: null,
      numOfPlayers: null,
      nameOfPlayers: undefined,
      playerPositions: undefined,
      cardModalInstructions: null,
    }
    this.startOver = this.startOver.bind(this);
    this.playGame = this.playGame.bind(this);
    this.saveNumOfPlayers = this.saveNumOfPlayers.bind(this);
    this.saveNamesAndStartGame = this.saveNamesAndStartGame.bind(this);
    this.setPlayerPosition = this.setPlayerPosition.bind(this);
    this.openCardModal = this.openCardModal.bind(this);
    this.closeCardModal = this.closeCardModal.bind(this);
  }

  startOver() {
    this.setState({ phase: null });
  }

  playGame() {
    this.setState({ phase: CHOOSE_PLAYERS });
  }

  saveNumOfPlayers(val) {
    this.setState({ phase: NAME_PLAYERS, numOfPlayers: val, playerPositions: new Array(val).fill(null) });
  }

  saveNamesAndStartGame(names) {
    this.setState({ phase: BOARD, nameOfPlayers: names });
  }

  setPlayerPosition(idx, pos) {
    let newPlayerPositions = this.state.playerPositions;
    newPlayerPositions[idx] = newPlayerPositions[idx] + pos;
    this.setState({ playerPositions: newPlayerPositions });
  }

  // pass instructions to open modal
  openCardModal(instructions) {
    this.setState({ cardModalInstructions: instructions });
  }

  closeCardModal() {
    this.setState({ cardModalInstructions: null });
  }

  render() {
    console.log(this.state.playerPositions)
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
          playerPositions={this.state.playerPositions}
          startOver={this.startOver}
          setPlayerPosition={this.setPlayerPosition}
          cardModalInstructions={this.state.cardModalInstructions}
          closeCardModal={this.closeCardModal}
        />
      )
    }

  }
};

export default Game;

import React from 'react';
import PlayerModal from './PlayerModal';
import NamePlayerModal from './NamePlayerModal';
import Board from './Board';

import {
  CHOOSE_PLAYERS,
  NAME_PLAYERS,
  BOARD,
  CARD_CHANCE_TYPES,
  STARRED_SPACES,
  GOD_SPACES
} from '../constants';

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
    console.log('setPlayerPosition: ' + idx + ' : ' + pos);
    let newPlayerPositions = this.state.playerPositions;
    let destinationPosition = newPlayerPositions[idx] + pos
    // never go below position 0
    if (destinationPosition < 0) {
        destinationPosition = 0;
    }

    if (this.validPosition(destinationPosition)) {
        var occupyingPlayerIndex = this.indexOfPlayerAtPosition(destinationPosition);
        if (occupyingPlayerIndex > 0) {
            newPlayerPositions[occupyingPlayerIndex] = newPlayerPositions[idx];
            // TODO: trigger star card if previously occupying player swaps to a starred space
        }
        newPlayerPositions[idx] = destinationPosition;
    }

    this.setState({ playerPositions: newPlayerPositions });
    if (this.isStarredSpace(newPlayerPositions[idx])) {
      this.triggerCardDrawFor(idx);
    }
    // TODO: change active player; move to game.jsx from board.jsx
  }

  triggerCardDrawFor(idx) {
    let card = this.pickRandomChanceCard();
    this.openCardModal(card.title);
    this[card.method](idx);
  }

  // pass instructions to open modal
  openCardModal(instructionText) {
    this.setState({ cardModalInstructions: instructionText });
  }

  closeCardModal() {
    this.setState({ cardModalInstructions: null });
  }

  indexOfPlayerAtPosition(pos) {
    this.state.playerPositions.indexOf(pos)
  }

  isStarredSpace(pos) {
    return STARRED_SPACES.includes(pos);
  }

  validPosition(pos) {
    return pos >= 0 && pos <= 76;
  }

  winningPosition(pos) {
    return pos === 76;
  }

  // some card logic below //
  pickRandomChanceCard() {
    let randIndex = Math.floor(Math.random() * Object.keys(CARD_CHANCE_TYPES).length);
    let cardType = Object.keys(CARD_CHANCE_TYPES)[randIndex]
    // return CARD_CHANCE_TYPES[cardType];
    return CARD_CHANCE_TYPES['moveToNextGod'];
  }

  allBack3Spaces() {
    var that = this;
    this.state.playerPositions.forEach(function (pp, i) {
      that.setPlayerPosition(i, -3);
    })
  }

  forward5Spaces(idx) {
    this.setPlayerPosition(idx, 5);
  }

  back2Spaces(idx) {
    this.setPlayerPosition(idx, -2);
  }

  moveToNextGod(idx) {
    var that = this;
    let godSpace = GOD_SPACES.find(function (element) {
      return element > that.state.playerPositions[idx];
    })
    let destinationPosition = 0;
    if (godSpace >= 0) {
      destinationPosition = godSpace;
    }
    this.setPlayerPosition(idx, godSpace - that.state.playerPositions[idx]);
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

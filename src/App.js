import React, { Component } from "react";
import Header from "./components/header.jsx";
import Logo from "./components/logo.jsx";
import Score from "./components/score.jsx";
import Board from "./components/board.jsx";
import {
  initialGame,
  newTile,
  checkGameOver,
  getZeroTileArray,
  checkIfWin,
  checkIfCouldMove
} from "./gameState.js";
import { moveRight, moveLeft, moveUp, moveDown } from "./move.js";
import ArrowKeysReact from "arrow-keys-react";

const gridX = 4;
const gridY = 4;
const tilesGameOver = [
  [4, 8, 2, 2],
  [2, 16, 4, 8],
  [4, 2, 8, 16],
  [256, 128, 4, 2]
];
const tilesGameWin = [
  [4, 8, 2, 4],
  [2, 16, 4, 2],
  [1024, 1024, 8, 16],
  [1024, 4, 4, 2]
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tiles: Array.from(Array(gridX), () => Array(gridY).fill(0)),
      zeroTileArray: [],
      gameOver: false,
      gameWin: false,
      showGameWin: true,
      score: 0,
      scoreArray: [0],
      newtileRow: -1,
      newtileColumn: -1,
      mergedTiles: []
    };
  }

  componentDidMount() {
    let result = initialGame(gridX, gridY);
    this.setState({
      // tiles: result.tiles,
      tiles: tilesGameOver,
      zeroTileArray: result.zeroArray
    });
  }

  checkIfGameOver = async () => {
    let gameOver = checkGameOver(this.state.tiles);
    if (gameOver) {
      this.setState({
        gameOver,
        newtileRow: -1,
        newtileColumn: -1
      });
    }
  };

  checkIfGameWin = () => {
    let gameWin = checkIfWin(this.state.tiles);
    if (gameWin && this.state.showGameWin) {
      this.setState({ gameWin, newtileRow: -1, newtileColumn: -1 });
    }
  };

  handleMove = async (tiles, score, zeroTileArray, mergedTiles) => {
    await this.setState({ tiles, score, zeroTileArray, mergedTiles });
    if (this.state.zeroTileArray.length === 0) {
      await this.checkIfGameOver();
    } else {
      let result = await newTile(this.state.tiles, this.state.zeroTileArray);
      this.setState({
        tiles: result.tiles,
        newtileRow: result.row,
        newtileColumn: result.column
      });
    }
    let newZeroArray = await getZeroTileArray(this.state.tiles);
    this.setState({ zeroTileArray: newZeroArray });
    if (this.state.zeroTileArray.length === 0) {
      await this.checkIfGameOver();
    }
    await this.checkIfGameWin();
  };

  handleRestart = () => {
    let result = initialGame(gridX, gridY);
    this.setState({
      tiles: result.tiles,
      zeroTileArray: result.zeroArray,
      score: result.score,
      gameOver: result.gameOver,
      gameWin: result.gameWin,
      showGameWin: result.showGameWin,
      newtileRow: result.newtileRow,
      newtileColumn: result.newtileColumn,
      mergedTiles: result.mergedTiles
    });
  };

  handleWin = () => {
    this.setState({ showGameWin: false });
  };

  render() {
    if (
      checkIfCouldMove(
        this.state.gameOver,
        this.state.gameWin,
        this.state.showGameWin
      )
    ) {
      ArrowKeysReact.config({
        left: async () => {
          let result = await moveLeft(this.state.tiles, this.state.score);
          this.handleMove(
            result.tiles,
            result.score,
            result.zeroArray,
            result.mergedArray
          );
        },
        right: async () => {
          let result = await moveRight(this.state.tiles, this.state.score);
          this.handleMove(
            result.tiles,
            result.score,
            result.zeroArray,
            result.mergedArray
          );
        },
        up: async () => {
          let result = await moveUp(this.state.tiles, this.state.score);
          this.handleMove(
            result.tiles,
            result.score,
            result.zeroArray,
            result.mergedArray
          );
        },
        down: async () => {
          let result = await moveDown(this.state.tiles, this.state.score);
          this.handleMove(
            result.tiles,
            result.score,
            result.zeroArray,
            result.mergedArray
          );
        }
      });
    } else {
      ArrowKeysReact.config({
        left: () => {},
        right: () => {},
        up: () => {},
        down: () => {}
      });
    }

    return (
      <div {...ArrowKeysReact.events} tabIndex="1">
        <Header score={this.state.scoreArray} restart={this.handleRestart} />
        <Logo />
        <Score score={this.state.score} />
        <Board
          gridX={gridX}
          gridY={gridY}
          tiles={this.state.tiles}
          gameOver={this.state.gameOver}
          gameWin={this.state.gameWin}
          showGameWin={this.state.showGameWin}
          handleWin={this.handleWin}
          handleRestart={this.handleRestart}
          newtileRow={this.state.newtileRow}
          newtileColumn={this.state.newtileColumn}
          mergedTiles={this.state.mergedTiles}
        />
      </div>
    );
  }
}

export default App;

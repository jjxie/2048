import React, { Component } from "react";
import Header from "./components/header.jsx";
import Logo from "./components/logo.jsx";
import Score from "./components/score.jsx";
import Board from "./components/board.jsx";
import {
  initialGame,
  moveRight,
  moveLeft,
  moveUp,
  moveDown,
  newTile,
  checkGameOver
} from "./function.js";
import ArrowKeysReact from "arrow-keys-react";

const gridX = 4;
const gridY = 4;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tiles: Array.from(Array(gridX), () => Array(gridY).fill(0)),
      zeroTileArray: [],
      gameOver: false,
      score: 0,
      bestScore: 0
    };
  }

  componentDidMount() {
    let result = initialGame(gridX, gridY);
    this.setState({ tiles: result.tiles, zeroTileArray: result.zeroArray });
  }

  handleMove = (tiles, score, zeroTileArray) => {
    this.setState({ tiles, score, zeroTileArray }, () => {
      if (zeroTileArray.length === 0) {
        let gameOver = checkGameOver(this.state.tiles, this.state.score);
        this.setState({ gameOver });
      } else {
        let tiles = newTile(this.state.tiles, this.state.zeroTileArray);
        this.setState({ tiles });
      }
    });
  };

  render() {
    ArrowKeysReact.config({
      left: () => {
        let result = moveLeft(this.state.tiles, this.state.score);
        this.handleMove(result.tiles, result.score, result.zeroArray);
      },
      right: () => {
        let result = moveRight(this.state.tiles, this.state.score);
        this.handleMove(result.tiles, result.score, result.zeroArray);
      },
      up: () => {
        let result = moveUp(this.state.tiles, this.state.score);
        this.handleMove(result.tiles, result.score, result.zeroArray);
      },
      down: () => {
        let result = moveDown(this.state.tiles, this.state.score);
        this.handleMove(result.tiles, result.score, result.zeroArray);
      }
    });

    return (
      <div {...ArrowKeysReact.events} tabIndex="1">
        <Header bestScore={this.state.bestScore} />
        <Logo />
        <Score score={this.state.score} />
        <Board gridX={gridX} gridY={gridY} tiles={this.state.tiles} />
      </div>
    );
  }
}

export default App;

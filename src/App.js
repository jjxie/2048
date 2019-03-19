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
  checkGameState,
  checkIfCouldMoveLeft,
  checkIfCouldMoveRight,
  checkIfCouldMoveUp,
  checkIfCouldMoveDown
} from "./gameState.js";
import { moveRight, moveLeft, moveUp, moveDown } from "./move.js";
import ArrowKeysReact from "arrow-keys-react";
import { Swipeable } from "react-swipeable";

const gridX = 4;
const gridY = 4;
const tilesGameOver = [
  [4, 8, 2, 2],
  [32, 16, 32, 8],
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
      // tiles: tilesGameWin,
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

  UNSAFE_componentWillMount() {
    localStorage.getItem("tiles") &&
      this.setState({
        tiles: JSON.parse(localStorage.getItem("tiles")),
        score: JSON.parse(localStorage.getItem("score")),
        scoreArray: JSON.parse(localStorage.getItem("scoreArray")),
        zeroTileArray: JSON.parse(localStorage.getItem("zeroArray")),
        gameOver: JSON.parse(localStorage.getItem("gameOver")),
        gameWin: JSON.parse(localStorage.getItem("gameWin")),
        showGameWin: JSON.parse(localStorage.getItem("showGameWin"))
      });
  }

  componentDidMount() {
    if (!localStorage.getItem("tiles")) {
      let result = initialGame(gridX, gridY);
      this.setState({
        // tiles: result.tiles,
        tiles: tilesGameOver,
        zeroTileArray: result.zeroArray
      });
    }
  }

  UNSAFE_componentWillUpdate(nextProps, nextState) {
    localStorage.setItem("tiles", JSON.stringify(nextState.tiles));
    localStorage.setItem("score", JSON.stringify(nextState.score));
    localStorage.setItem("scoreArray", JSON.stringify(nextState.scoreArray));
    localStorage.setItem("zeroArray", JSON.stringify(nextState.zeroTileArray));
    localStorage.setItem("gameOver", JSON.stringify(nextState.gameOver));
    localStorage.setItem("gameWin", JSON.stringify(nextState.gameWin));
    localStorage.setItem("showGameWin", JSON.stringify(nextState.showGameWin));
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

  handleMove = async result => {
    await this.setState(
      {
        tiles: result.tiles,
        score: result.score,
        zeroTileArray: result.zeroArray,
        mergedTiles: result.mergedArray
      },
      () => {
        let scores = [...new Set(this.state.scoreArray)];
        this.setState({
          scoreArray: scores.concat(this.state.score)
        });
      }
    );
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
    let swipeConfig;
    //  Keyboard input config
    if (
      checkGameState(
        this.state.gameOver,
        this.state.gameWin,
        this.state.showGameWin
      )
    ) {
      ArrowKeysReact.config({
        left: async () => {
          if (checkIfCouldMoveLeft(this.state.tiles)) {
            let result = await moveLeft(this.state.tiles, this.state.score);
            this.handleMove(result);
          }
        },
        right: async () => {
          if (checkIfCouldMoveRight(this.state.tiles)) {
            let result = await moveRight(this.state.tiles, this.state.score);
            this.handleMove(result);
          }
        },
        up: async () => {
          if (checkIfCouldMoveUp(this.state.tiles)) {
            let result = await moveUp(this.state.tiles, this.state.score);
            this.handleMove(result);
          }
        },
        down: async () => {
          if (checkIfCouldMoveDown(this.state.tiles)) {
            let result = await moveDown(this.state.tiles, this.state.score);
            this.handleMove(result);
          }
        }
      });
      // Swipe config
      swipeConfig = {
        onSwipedLeft: async () => {
          if (checkIfCouldMoveLeft(this.state.tiles)) {
            let result = await moveLeft(this.state.tiles, this.state.score);
            this.handleMove(result);
          }
        },
        onSwipedRight: async () => {
          if (checkIfCouldMoveRight(this.state.tiles)) {
            let result = await moveRight(this.state.tiles, this.state.score);
            this.handleMove(result);
          }
        },
        onSwipedUp: async () => {
          if (checkIfCouldMoveUp(this.state.tiles)) {
            let result = await moveUp(this.state.tiles, this.state.score);
            this.handleMove(result);
          }
        },
        onSwipedDown: async () => {
          if (checkIfCouldMoveDown(this.state.tiles)) {
            let result = await moveDown(this.state.tiles, this.state.score);
            this.handleMove(result);
          }
        },
        trackMouse: true
      };
    } else {
      ArrowKeysReact.config({
        left: () => {},
        right: () => {},
        up: () => {},
        down: () => {}
      });
      swipeConfig = {
        onSwipedLeft: () => {},
        onSwipedRight: () => {},
        onSwipedUp: () => {},
        onSwipedDown: () => {},
        trackMouse: true
      };
    }

    return (
      <div {...ArrowKeysReact.events} tabIndex="1">
        <Header scores={this.state.scoreArray} restart={this.handleRestart} />
        <Logo />
        <Score score={this.state.score} />
        <Swipeable {...swipeConfig}>
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
        </Swipeable>
      </div>
    );
  }
}

export default App;

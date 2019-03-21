import React, { Component } from "react";
import Header from "./components/Header.jsx";
import Title from "./components/Title.jsx";
import Score from "./components/Score.jsx";
import Board from "./components/Board.jsx";
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
const testGameStateTiles = [
  [4, 8, 2, 32],
  [2, 16, 4, 2],
  [1024, 1024, 8, 16],
  [128, 4, 32, 2]
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
    this.handleRestart = this.handleRestart.bind(this);
    this.handleWin = this.handleWin.bind(this);
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
        tiles: result.tiles,
        // tiles: testGameStateTiles,
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

  checkIfGameOver = () => {
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

  handleRestart() {
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
  }

  handleWin() {
    this.setState({ showGameWin: false });
  }

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
        left: () => {
          if (checkIfCouldMoveLeft(this.state.tiles)) {
            let result = moveLeft(this.state.tiles, this.state.score);
            this.handleMove(result);
          }
        },
        right: () => {
          if (checkIfCouldMoveRight(this.state.tiles)) {
            let result = moveRight(this.state.tiles, this.state.score);
            this.handleMove(result);
          }
        },
        up: () => {
          if (checkIfCouldMoveUp(this.state.tiles)) {
            let result = moveUp(this.state.tiles, this.state.score);
            this.handleMove(result);
          }
        },
        down: () => {
          if (checkIfCouldMoveDown(this.state.tiles)) {
            let result = moveDown(this.state.tiles, this.state.score);
            this.handleMove(result);
          }
        }
      });
      // Swipe config
      swipeConfig = {
        onSwipedLeft: () => {
          if (checkIfCouldMoveLeft(this.state.tiles)) {
            let result = moveLeft(this.state.tiles, this.state.score);
            this.handleMove(result);
          }
        },
        onSwipedRight: () => {
          if (checkIfCouldMoveRight(this.state.tiles)) {
            let result = moveRight(this.state.tiles, this.state.score);
            this.handleMove(result);
          }
        },
        onSwipedUp: () => {
          if (checkIfCouldMoveUp(this.state.tiles)) {
            let result = moveUp(this.state.tiles, this.state.score);
            this.handleMove(result);
          }
        },
        onSwipedDown: () => {
          if (checkIfCouldMoveDown(this.state.tiles)) {
            let result = moveDown(this.state.tiles, this.state.score);
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
        <Title />
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

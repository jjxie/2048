import React, { Component } from "react";
import GridRow from "./gridRow.jsx";
const uuidv4 = require("uuid/v4");

export default class Board extends Component {
  creatGridRow = (gridX, gridY, tiles) => {
    let eachRow = [];
    for (let i = 0; i < gridY; i++) {
      eachRow.push(<GridRow size={gridX} key={uuidv4()} tileRow={tiles[i]} />);
    }
    return eachRow;
  };

  gameOverClassName = gameOver => {
    if (gameOver) {
      return "gameOver";
    }
  };

  gameWinClassName = (gameWin, showGameWin) => {
    if (gameWin && showGameWin) {
      return "gameWin";
    }
  };

  render() {
    const {
      gridX,
      gridY,
      tiles,
      gameOver,
      gameWin,
      showGameWin,
      handleWin,
      restart
    } = this.props;
    return (
      <div
        className={`board ${this.gameOverClassName(
          gameOver
        )} ${this.gameWinClassName(gameWin, showGameWin)}`}
      >
        {gameOver ? (
          <div className="gameOver">
            <br /> <br /> Game Over <br />
            <button className="restartButton" onClick={() => restart()}>
              Restart
            </button>
          </div>
        ) : (
          ""
        )}
        {gameWin && showGameWin ? (
          <div className="gameWin" id="gameWin">
            <br /> <br /> You Win! <br />
            <button className="keepGoingButton" onClick={() => handleWin()}>
              Keep Going
            </button>
          </div>
        ) : (
          ""
        )}
        {this.creatGridRow(gridX, gridY, tiles)}
      </div>
    );
  }
}

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

  boardClassName = (gameOver, gameWin, showGameWin) => {
    let className = "board";
    if (gameOver) {
      className = className.concat(" gameOver");
    }
    if (gameWin && showGameWin) {
      className = className.concat(" gameWin");
    }
    return className;
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
      handleRestart
    } = this.props;
    return (
      <div className={this.boardClassName(gameOver, gameWin, showGameWin)}>
        {gameOver ? (
          <div className="gameOver">
            <br /> <br /> Game Over <br />
            <button className="restartButton" onClick={() => handleRestart()}>
              Restart
            </button>
          </div>
        ) : (
          ""
        )}
        {gameWin && showGameWin ? (
          <div className="gameWin">
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

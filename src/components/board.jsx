import React, { Component } from "react";
import GridRow from "./gridRow.jsx";
const uuidv4 = require("uuid/v4");

export default class Board extends Component {
  creatGridRow = (
    gridX,
    gridY,
    tiles,
    newtileRow,
    newtileColumn,
    mergedTiles
  ) => {
    let eachRow = [];
    let merged = Array.from(Array(gridX), () => Array(gridY).fill(0));
    if (mergedTiles !== undefined || mergedTiles.length !== 0) {
      for (let i = 0; i < mergedTiles.length; i++) {
        let row = Math.floor(mergedTiles[i] / gridX);
        let column = mergedTiles[i] % gridY;
        merged[row][column] = 1;
      }
    }
    for (let i = 0; i < gridY; i++) {
      eachRow.push(
        <GridRow
          size={gridX}
          key={uuidv4()}
          tileRow={tiles[i]}
          newtileColumn={i === newtileRow ? newtileColumn : "-1"}
          mergedTiles={merged[i]}
        />
      );
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
      handleRestart,
      newtileRow,
      newtileColumn,
      mergedTiles
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
        {this.creatGridRow(
          gridX,
          gridY,
          tiles,
          newtileRow,
          newtileColumn,
          mergedTiles
        )}
      </div>
    );
  }
}

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

  render() {
    const { gridX, gridY, tiles, gameOver } = this.props;
    return (
      <div className={`board ${this.gameOverClassName(gameOver)}`}>
        {gameOver ? <div className="gameOverText"> Game Over </div> : ""}
        {this.creatGridRow(gridX, gridY, tiles)}
      </div>
    );
  }
}

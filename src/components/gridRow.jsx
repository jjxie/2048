import React, { Component } from "react";
import GridCell from "./gridCell.jsx";
const uuidv4 = require("uuid/v4");

export default class GridRow extends Component {
  creatGridCell = (size, tileRow) => {
    let eachCell = [];
    for (let i = 0; i < size; i++) {
      eachCell.push(<GridCell key={uuidv4()} tile={tileRow[i]} />);
    }
    return eachCell;
  };

  gameOverClassName = gameOver => {
    if (gameOver) {
      return "gameOver";
    }
  };

  render() {
    const { size, tileRow, gameOver } = this.props;
    return (
      <div className={`gridRow ${this.gameOverClassName(gameOver)}`}>
        {this.creatGridCell(size, tileRow)}
      </div>
    );
  }
}

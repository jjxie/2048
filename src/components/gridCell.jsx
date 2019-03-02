import React, { Component } from "react";
import { cellClassName } from "../function.js";

export default class GridCell extends Component {
  setCellStyle = cellValue => {
    return cellClassName(cellValue);
  };

  gameOverClassName = gameOver => {
    if (gameOver) {
      return "gameOver";
    }
  };

  render() {
    const { tile, gameOver } = this.props;
    return (
      <div
        className={`gridCell ${this.setCellStyle(
          tile
        )} ${this.gameOverClassName(gameOver)}s`}
      >
        {tile === 0 ? "" : tile}
      </div>
    );
  }
}

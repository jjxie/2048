import React, { Component } from "react";
import { cellClassName } from "../function.js";

export default class GridCell extends Component {
  setClassName = (cellValue, newTile) => {
    let valueClass = cellClassName(cellValue);
    let className = "gridCell ".concat(valueClass);
    if (newTile) {
      className = className.concat(" cell-new");
    }
    return className;
  };

  render() {
    const { tile, newTile } = this.props;
    return (
      <div className={this.setClassName(tile, newTile)}>
        {tile === 0 ? "" : tile}
      </div>
    );
  }
}

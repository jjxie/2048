import React, { Component } from "react";
import { cellClassName } from "../cellStyle.js";

export default class GridCell extends Component {
  constructor(props) {
    super(props);
    this.setClassName = this.setClassName.bind(this);
  }

  setClassName(cellValue, newTile, mergedTiles) {
    let valueClass = cellClassName(cellValue);
    let className = "gridCell ".concat(valueClass);
    if (newTile) {
      className = className.concat(" cell-new");
    }
    if (mergedTiles) {
      className = className.concat(" cell-merged");
    }
    return className;
  }

  render() {
    const { tile, newTile, mergedTiles } = this.props;
    return (
      <div className={this.setClassName(tile, newTile, mergedTiles)}>
        {tile === 0 ? "" : tile}
      </div>
    );
  }
}

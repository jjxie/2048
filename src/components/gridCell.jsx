import React, { Component } from "react";
import { cellClassName } from "../function.js";

export default class GridCell extends Component {
  setCellStyle = cellValue => {
    return cellClassName(cellValue);
  };

  render() {
    const { tile } = this.props;
    return (
      <div className={`gridCell ${this.setCellStyle(tile)}`}>
        {tile === 0 ? "" : tile}
      </div>
    );
  }
}

import React, { Component } from "react";
import GridCell from "./gridCell.jsx";
const uuidv4 = require("uuid/v4");

export default class GridRow extends Component {
  creatGridCell = (size, tileRow, newtileColumn, mergedTiles) => {
    let eachCell = [];
    for (let i = 0; i < size; i++) {
      eachCell.push(
        <GridCell
          key={uuidv4()}
          tile={tileRow[i]}
          newTile={i === newtileColumn ? true : false}
          mergedTiles={mergedTiles[i] === 1 ? true : false}
        />
      );
    }
    return eachCell;
  };

  render() {
    const { size, tileRow, newtileColumn, mergedTiles } = this.props;
    return (
      <div className="gridRow">
        {this.creatGridCell(size, tileRow, newtileColumn, mergedTiles)}
      </div>
    );
  }
}

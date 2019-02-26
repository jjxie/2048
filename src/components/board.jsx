import React, { Component } from "react";
import GridRow from "./gridRow.jsx";
const uuidv4 = require("uuid/v4");

export default class Board extends Component {
  creatGridRow = (gridX, gridY) => {
    let eachRow = [];
    for (let i = 0; i < gridY; i++) {
      eachRow.push(<GridRow size={gridX} key={uuidv4()} />);
    }
    return eachRow;
  };

  render() {
    const { gridX, gridY } = this.props;
    return <div className="board">{this.creatGridRow(gridX, gridY)}</div>;
  }
}

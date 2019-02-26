import React, { Component } from "react";
import Header from "./components/header.jsx";
import Logo from "./components/logo.jsx";
import Score from "./components/score.jsx";
import Board from "./components/board.jsx";

class App extends Component {
  render() {
    const gridX = 4;
    const gridY = 4;
    return (
      <div>
        <Header />
        <Logo />
        <Score />
        <Board gridX={gridX} gridY={gridY} />
      </div>
    );
  }
}

export default App;

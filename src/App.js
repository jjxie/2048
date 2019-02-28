import React, { Component } from "react";
import Header from "./components/header.jsx";
import Logo from "./components/logo.jsx";
import Score from "./components/score.jsx";
import Board from "./components/board.jsx";
import {
  initiaGame,
  moveRight,
  moveLeft,
  moveUp,
  moveDown
} from "./function.js";
import ArrowKeysReact from "arrow-keys-react";

const gridX = 4;
const gridY = 4;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { tiles: [] };

    ArrowKeysReact.config({
      left: () => {
        let tiles = moveLeft(this.state.tiles);
        this.setState({ tiles });
      },
      right: () => {
        let tiles = moveRight(this.state.tiles);
        this.setState({ tiles });
      },
      up: () => {
        let tiles = moveUp(this.state.tiles);
        this.setState({ tiles });
      },
      down: () => {
        let tiles = moveDown(this.state.tiles);
        this.setState({ tiles });
      }
    });
  }

  UNSAFE_componentWillMount() {
    let tiles = initiaGame(gridX, gridY);
    this.setState({ tiles });
  }

  render() {
    return (
      <div {...ArrowKeysReact.events} tabIndex="1">
        <Header />
        <Logo />
        <Score />
        <Board gridX={gridX} gridY={gridY} tiles={this.state.tiles} />
      </div>
    );
  }
}

export default App;

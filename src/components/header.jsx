import React, { Component } from "react";

export default class Header extends Component {
  getBestScore = scores => {
    let arr = Object.values(scores);
    let max = Math.max(...arr);
    return max;
  };
  render() {
    const { score, restart } = this.props;
    return (
      <div className="header">
        <p className="bestScore">Best score: {this.getBestScore(score)}</p>
        <img
          src={`../icons/restart.png`}
          alt="restart"
          title="Restart"
          onClick={restart}
        />
      </div>
    );
  }
}

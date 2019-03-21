import React, { Component } from "react";

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.getBestScore = this.getBestScore.bind(this);
  }

  getBestScore(scores) {
    if (scores !== undefined) {
      let arr = Object.values(scores);
      let max = Math.max(...arr);
      return max;
    }
    return 0;
  }
  render() {
    const { scores, restart } = this.props;
    return (
      <div className="header">
        <p className="bestScore">Best score: {this.getBestScore(scores)}</p>
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

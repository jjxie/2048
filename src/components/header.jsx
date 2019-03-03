import React from "react";

const Header = props => {
  return (
    <div className="header">
      <p className="bestScore">Best score: {Math.max(props.score)}</p>
      <img
        src={`../icons/restart.png`}
        alt="restart"
        title="Restart"
        onClick={props.restart}
      />
    </div>
  );
};

export default Header;

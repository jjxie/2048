import React from "react";

const Header = props => {
  return (
    <div className="header">
      <p className="bestScore">Best score: {props.bestScore}</p>
      <img src={`../icons/restart.png`} alt="restart" title="Restart" />
    </div>
  );
};

export default Header;

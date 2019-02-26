import React from "react";

const Header = () => {
  return (
    <div className="header">
      <p className="bestScore">Best score: 1900</p>
      <img src={`../icons/restart.png`} alt="restart" title="Restart" />
    </div>
  );
};

export default Header;

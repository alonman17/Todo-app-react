import React from "react";
import sunIcon from "../../images/icon-sun.svg";
import "./Header.css";
const Header = () => {
  return (
    <div className="Header">
      <h1>TODO</h1>
      <img src={sunIcon} className="weather-logo"></img>
    </div>
  );
};

export default Header;

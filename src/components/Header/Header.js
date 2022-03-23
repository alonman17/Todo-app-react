import React from "react";
import sunIcon from "../../images/icon-sun.svg";
import moonIcon from "../../images/icon-moon.svg";
import "./Header.css";
const Header = () => {
  const current = new Date();
  return (
    <div className="Header">
      <h1>TODO</h1>
      <img src={current.getHours() < 18 ? sunIcon : moonIcon} className="weather-logo"></img>
    </div>
  );
};

export default Header;

import React from "react";
import zionLogo from "../Assets/My zion'sound HD.png";
import Player from "./Player";
import RadioChoice from "./RadioChoice";
const Header = () => {
  return (
    <>
      <header>
        <img src={zionLogo} alt="zionsound logo" id="zionLogo" />
        <RadioChoice />
        <Player />
      </header>
    </>
  );
};

export default Header;

import React from "react";
import turntable from "../Assets/platine_off.png";
import plate from "../Assets/plateau.png";
import armBase from "../Assets/embase-bras.png";
import pivot from "../Assets/pivot.png";
import arm from "../Assets/bras.png";

const Player = () => {
  return (
    <figure id="player" className="player">
      <img src={turntable} alt="turntable" id="turntable" className="player__turntable" />
      <img src={armBase} alt="arm base" id="armBase" className="player__armBase" />
      <img src={plate} alt="plate" id="plate" className="player__plate" />
      <img src={pivot} alt="pivot" id="pivot" className="player__pivot" />
      <div className="player__arm">
        <span></span>
        <img src={arm} alt="arm" id="arm" />
      </div>
    </figure>
  );
};

export default Player;

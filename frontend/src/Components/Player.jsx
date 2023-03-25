import React, { useEffect, useState } from "react";
import turntableOff from "../Assets/platine_off.png";
import turntableOn from "../Assets/platine_on.png";
import plate from "../Assets/plateau.png";
import armBase from "../Assets/embase-bras.png";
import pivot from "../Assets/pivot.png";
import arm from "../Assets/bras.png";

const Player = ({ isRadionZionPlaying, setIsRadionZionPlaying, isDubatekPlaying, setIsDubatekPlaying, isStationChanging, setIsStationChanging }) => {
  const [isSpinning, setIsSpinning] = useState();
  const [armStatus, setArmStatus] = useState();
  const [streamUrl, setStreamUrl] = useState("");

  useEffect(() => {
    if (isRadionZionPlaying === true || isDubatekPlaying === true) {
      setIsSpinning(true);
      setArmStatus("--playing");
    } else {
      setIsSpinning(false);
      setArmStatus("--stopping");
    }
  }, [isRadionZionPlaying, isDubatekPlaying]);

  useEffect(() => {
    if (isStationChanging === true) {
      setArmStatus("--stopping");
      setTimeout(() => {
        setArmStatus("--playing");
      }, 250);
    }
  }, [isStationChanging]);

  function action() {
    var sound = document.getElementById("audioplayer");

    if (sound.paused) {
      sound.load();
      sound.play();
    } else {
      sound.pause();
    }
  }

  useEffect(() => {
    const radioZion = document.querySelector("#radioZion");
    const dubatekRadio = document.querySelector("#dubatekRadio");
    if (isRadionZionPlaying === true) {
      radioZion.load();
      radioZion.play();
      dubatekRadio.pause();
    } else if (isDubatekPlaying === true) {
      dubatekRadio.load();
      dubatekRadio.play();
      radioZion.pause();
    } else if (isDubatekPlaying === false || isRadionZionPlaying === false) {
      dubatekRadio.pause();
      radioZion.pause();
    }
  }, [isRadionZionPlaying, isDubatekPlaying]);

  return (
    <figure id="player" className="player">
      <audio id="radioZion">
        <source src="https://web.zionsound.fr:8002/;stream.mp3" type="audio/mp3"></source>
      </audio>
      <audio id="dubatekRadio">
        <source src="https://web.zionsound.fr:8012/;stream.mp3" type="audio/mp3"></source>
      </audio>
      {isSpinning ? <img src={turntableOn} alt="turntable" id="turntable" className="player__turntable" /> : <img src={turntableOff} alt="turntable" id="turntable" className="player__turntable" />}

      <img src={armBase} alt="arm base" id="armBase" className="player__armBase" />

      {isSpinning ? <img src={plate} alt="plate" id="plate" className="player__plate player__plate--spinning " /> : <img src={plate} alt="plate" id="plate" className="player__plate " />}

      <img src={pivot} alt="pivot" id="pivot" className="player__pivot" />

      <div className={"player__arm player__arm" + armStatus}>
        <span></span>
        <img src={arm} alt="arm" id="arm" />
      </div>
    </figure>
  );
};

export default Player;

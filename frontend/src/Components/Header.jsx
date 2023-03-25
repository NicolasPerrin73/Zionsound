import React, { useState } from "react";
import zionLogo from "../Assets/My zion'sound HD.png";
import Player from "./Player";
import RadioChoice from "./RadioChoice";
const Header = () => {
  const [isRadionZionPlaying, setIsRadionZionPlaying] = useState(false);
  const [isDubatekPlaying, setIsDubatekPlaying] = useState(false);
  const [isStationChanging, setIsStationChanging] = useState(false);

  return (
    <>
      <header>
        <img src={zionLogo} alt="zionsound logo" id="zionLogo" />
        <div className="radio">
          <RadioChoice
            isRadionZionPlaying={isRadionZionPlaying}
            setIsRadionZionPlaying={setIsRadionZionPlaying}
            isDubatekPlaying={isDubatekPlaying}
            setIsDubatekPlaying={setIsDubatekPlaying}
            isStationChanging={isStationChanging}
            setIsStationChanging={setIsStationChanging}
          />
          <Player
            isRadionZionPlaying={isRadionZionPlaying}
            setIsRadionZionPlaying={setIsRadionZionPlaying}
            isDubatekPlaying={isDubatekPlaying}
            setIsDubatekPlaying={setIsDubatekPlaying}
            isStationChanging={isStationChanging}
            setIsStationChanging={setIsStationChanging}
          />
        </div>
      </header>
    </>
  );
};

export default Header;

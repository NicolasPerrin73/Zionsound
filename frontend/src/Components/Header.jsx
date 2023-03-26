import React, { useEffect, useState } from "react";
import zionLogo from "../Assets/My zion'sound HD.png";
import Player from "./Player";
import RadioChoice from "./RadioChoice";
const Header = () => {
  const [isRadionZionPlaying, setIsRadionZionPlaying] = useState(false);
  const [isDubatekPlaying, setIsDubatekPlaying] = useState(false);
  const [isStationChanging, setIsStationChanging] = useState(false);
  const [zionSongTitle, setZionSongTitle] = useState("");
  const [dubatekSongTitle, setDubatekSongTitle] = useState("");

  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    const fetchSongTitles = () => {
      fetch("https://web.zionsound.fr:8090/zion?sid=1&json=1", requestOptions)
        .then((response) => response.json())
        .then((data) => setZionSongTitle(data.songtitle))
        .catch((error) => console.log("error", error));

      fetch("https://web.zionsound.fr:8090/dubatek?sid=1&json=1", requestOptions)
        .then((response) => response.json())
        .then((data) => setDubatekSongTitle(data.songtitle))
        .catch((error) => console.log("error", error));
    };

    fetchSongTitles();

    const interval = setInterval(() => {
      fetchSongTitles();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <header>
        <div className="radio-container">
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
        </div>
        {isRadionZionPlaying ? <p className="songTitle">{zionSongTitle}</p> : isDubatekPlaying ? <p className="songTitle">{dubatekSongTitle}</p> : ""}
      </header>
    </>
  );
};

export default Header;

import React, { useEffect, useState } from "react";
import zionSleeve from "../Assets/pochette-radio-zion.png";
import dubatekSleeve from "../Assets/pochette-dubatek.png";
import zionRecord from "../Assets/disc-radio-zion.png";
import dubatekRecord from "../Assets/disc-dubatek.png";

const RadioChoice = ({ isRadionZionPlaying, setIsRadionZionPlaying, isDubatekPlaying, setIsDubatekPlaying, isStationChanging, setIsStationChanging }) => {
  const [backwardClick, setBackwardClik] = useState(false);
  const [forwardClick, setForwardClick] = useState(false);
  const [radioZionSleevePosition, setRadioZionSleevePosition] = useState("--backSleeveBackward");
  const [dubatekSleevePosition, setdubatekSleevePosition] = useState("--frontSleeveBackward");
  const [displayPlayButton, setdisplayPlaybutton] = useState("");
  const [radioZionRecordPlay, setRadioZionRecordPlay] = useState();
  const [dubatekRecordPlay, setDubatekRecordPlay] = useState();
  const [playStopButton, setPlayStopbutton] = useState("fa-solid fa-circle-play");

  const backward = (e) => {
    if (backwardClick === false) {
      setBackwardClik(true);
      displayPlay();
    } else if (backwardClick === true) {
      setBackwardClik(false);
      displayPlay();
    }
  };

  const forward = (e) => {
    if (forwardClick === false) {
      setForwardClick(true);
      displayPlay();
    } else if (forwardClick === true) {
      setForwardClick(false);
      displayPlay();
    }
  };

  const displayPlay = () => {
    setdisplayPlaybutton("--disappear");
    setTimeout(() => {
      setdisplayPlaybutton("");
    }, 500);
  };

  useEffect(() => {
    if (forwardClick === false) {
      if (radioZionSleevePosition === "--frontSleeveBackward" || radioZionSleevePosition === "--frontSleeveForward") {
        setRadioZionSleevePosition("--backSleeveForward");
        setdubatekSleevePosition("--frontSleeveForward");
      } else if (radioZionSleevePosition === "--backSleeveBackward" || radioZionSleevePosition === "--backSleeveForward") {
        setRadioZionSleevePosition("--frontSleeveForward");
        setdubatekSleevePosition("--backSleeveForward");
      }
    } else if (forwardClick === true) {
      if (radioZionSleevePosition === "--frontSleeveBackward" || radioZionSleevePosition === "--frontSleeveForward") {
        setRadioZionSleevePosition("--backSleeveForward");
        setdubatekSleevePosition("--frontSleeveForward");
      } else if (radioZionSleevePosition === "--backSleeveBackward" || radioZionSleevePosition === "--backSleeveForward") {
        setRadioZionSleevePosition("--frontSleeveForward");
        setdubatekSleevePosition("--backSleeveForward");
      }
    }
  }, [forwardClick]);

  useEffect(() => {
    if (backwardClick === false) {
      if (radioZionSleevePosition === "--frontSleeveBackward" || radioZionSleevePosition === "--frontSleeveForward") {
        setRadioZionSleevePosition("--backSleeveBackward");
        setdubatekSleevePosition("--frontSleeveBackward");
      } else if (radioZionSleevePosition === "--backSleeveBackward" || radioZionSleevePosition === "--backSleeveForward") {
        setRadioZionSleevePosition("--frontSleeveBackward");
        setdubatekSleevePosition("--backSleeveBackward");
      }
    } else if (backwardClick === true) {
      if (radioZionSleevePosition === "--frontSleeveBackward" || radioZionSleevePosition === "--frontSleeveForward") {
        setRadioZionSleevePosition("--backSleeveBackward");
        setdubatekSleevePosition("--frontSleeveBackward");
      } else if (radioZionSleevePosition === "--backSleeveBackward" || radioZionSleevePosition === "--backSleeveForward") {
        setRadioZionSleevePosition("--frontSleeveBackward");
        setdubatekSleevePosition("--backSleeveBackward");
      }
    }
  }, [backwardClick]);

  const recordPlay = (e) => {
    if (isDubatekPlaying === true && (radioZionSleevePosition === "--frontSleeveBackward" || radioZionSleevePosition === "--frontSleeveForward")) {
      setDubatekRecordPlay("collection__dubatekRecord--stop");
      setTimeout(() => {
        setDubatekRecordPlay("");
      }, 400);
      setIsDubatekPlaying(false);
      setIsRadionZionPlaying(true);
      setRadioZionRecordPlay("collection__zionRecord--play");
      setIsStationChanging(true);
      setTimeout(() => {
        setIsStationChanging(false);
      }, 500);
      setPlayStopbutton("fa-solid fa-circle-play");
    } else if (isRadionZionPlaying === true && (dubatekSleevePosition === "--frontSleeveBackward" || dubatekSleevePosition === "--frontSleeveForward")) {
      setRadioZionRecordPlay("collection__zionRecord--stop");
      setTimeout(() => {
        setRadioZionRecordPlay("");
      }, 400);
      setIsDubatekPlaying(true);
      setDubatekRecordPlay("collection__dubatekRecord--play");
      setIsRadionZionPlaying(false);
      setIsStationChanging(true);
      setTimeout(() => {
        setIsStationChanging(false);
      }, 500);
      setPlayStopbutton("fa-solid fa-circle-play");
    } else if (isRadionZionPlaying === true && (radioZionSleevePosition === "--frontSleeveBackward" || radioZionSleevePosition === "--frontSleeveForward")) {
      setRadioZionRecordPlay("collection__zionRecord--stop");
      setTimeout(() => {
        setRadioZionRecordPlay("");
      }, 400);
      setIsRadionZionPlaying(false);
      setPlayStopbutton("fa-solid fa-circle-stop");
    } else if (isRadionZionPlaying === false && (radioZionSleevePosition === "--frontSleeveBackward" || radioZionSleevePosition === "--frontSleeveForward")) {
      setIsRadionZionPlaying(true);
      setIsDubatekPlaying(false);
      setRadioZionRecordPlay("collection__zionRecord--play");
      setPlayStopbutton("fa-solid fa-circle-play");
    } else if (isDubatekPlaying === true && (dubatekSleevePosition === "--frontSleeveBackward" || dubatekSleevePosition === "--frontSleeveForward")) {
      setDubatekRecordPlay("collection__dubatekRecord--stop");
      setTimeout(() => {
        setDubatekRecordPlay("");
      }, 400);
      setIsDubatekPlaying(false);
      setPlayStopbutton("fa-solid fa-circle-stop");
    } else if (isDubatekPlaying === false && (dubatekSleevePosition === "--frontSleeveBackward" || dubatekSleevePosition === "--frontSleeveForward")) {
      setIsDubatekPlaying(true);
      setIsRadionZionPlaying(false);
      setDubatekRecordPlay("collection__dubatekRecord--play");
      setPlayStopbutton("fa-solid fa-circle-play");
    }
  };

  useEffect(() => {
    if (isRadionZionPlaying === true) {
      setRadioZionRecordPlay("collection__zionRecord--play");
    } else if (isDubatekPlaying === true) {
      setDubatekRecordPlay("collection__dubatekRecord--play");
    }
  }, [isDubatekPlaying, isRadionZionPlaying]);

  useEffect(() => {
    if (isDubatekPlaying === true && (radioZionSleevePosition === "--frontSleeveBackward" || radioZionSleevePosition === "--frontSleeveForward")) {
      setPlayStopbutton("fa-solid fa-circle-play");
    } else if (isRadionZionPlaying === true && (dubatekSleevePosition === "--frontSleeveBackward" || dubatekSleevePosition === "--frontSleeveForward")) {
      setPlayStopbutton("fa-solid fa-circle-play");
    } else if (isRadionZionPlaying === true && (radioZionSleevePosition === "--frontSleeveBackward" || radioZionSleevePosition === "--frontSleeveForward")) {
      setPlayStopbutton("fa-solid fa-circle-stop");
    } else if (isRadionZionPlaying === false && (radioZionSleevePosition === "--frontSleeveBackward" || radioZionSleevePosition === "--frontSleeveForward")) {
      setPlayStopbutton("fa-solid fa-circle-play");
    } else if (isDubatekPlaying === true && (dubatekSleevePosition === "--frontSleeveBackward" || dubatekSleevePosition === "--frontSleeveForward")) {
      setPlayStopbutton("fa-solid fa-circle-stop");
    } else if (isDubatekPlaying === false && (dubatekSleevePosition === "--frontSleeveBackward" || dubatekSleevePosition === "--frontSleeveForward")) {
      setPlayStopbutton("fa-solid fa-circle-play");
    }
  }, [dubatekSleevePosition, isDubatekPlaying, isRadionZionPlaying, radioZionSleevePosition]);

  return (
    <div className="radioChoice">
      <i
        className="fa-solid fa-backward-step"
        id="backward"
        onClick={(e) => {
          backward(e);
        }}
      ></i>

      <div
        className="collection"
        id="collection"
        onClick={(e) => {
          recordPlay(e);
        }}
      >
        <img src={zionSleeve} alt="pochette radio zion" id="zionSleeve" className={"collection__zionSleeve collection__zionSleeve" + radioZionSleevePosition} />

        <img src={dubatekSleeve} alt="pochette dubatek radio" id="dubatekSleeve" className={"collection__dubatekSleeve collection__dubatekSleeve" + dubatekSleevePosition} />

        {radioZionSleevePosition === "--frontSleeveBackward" || radioZionSleevePosition === "--frontSleeveForward" ? (
          <img src={zionRecord} alt="vinyl de radio zion" id="zionRecord" className={"collection__zionRecord collection__zionRecord--out " + radioZionRecordPlay} />
        ) : radioZionRecordPlay === "collection__zionRecord--play" ? (
          <img src={zionRecord} alt="vinyl de radio zion" id="zionRecord" className={"collection__zionRecord collection__zionRecord--out " + radioZionRecordPlay} />
        ) : (
          <img src={zionRecord} alt="vinyl de radio zion" id="zionRecord" className={"collection__zionRecord " + radioZionRecordPlay} />
        )}

        {dubatekSleevePosition === "--frontSleeveBackward" || dubatekSleevePosition === "--frontSleeveForward" ? (
          <img src={dubatekRecord} alt="vinyl de radio dubatek" id="dubatekRecord" className={"collection__dubatekRecord collection__dubatekRecord--out " + dubatekRecordPlay} />
        ) : dubatekRecordPlay === "collection__dubatekRecord--play" ? (
          <img src={dubatekRecord} alt="vinyl de radio dubatek" id="dubatekRecord" className={"collection__dubatekRecord collection__dubatekRecord--out " + dubatekRecordPlay} />
        ) : (
          <img src={dubatekRecord} alt="vinyl de radio dubatek" id="dubatekRecord" className={"collection__dubatekRecord " + dubatekRecordPlay} />
        )}

        <div className="collection__playStop">
          <i className={playStopButton + displayPlayButton}></i>
        </div>
      </div>
      <i
        className="fa-solid fa-forward-step"
        id="forward"
        onClick={(e) => {
          forward(e);
        }}
      ></i>
    </div>
  );
};

export default RadioChoice;

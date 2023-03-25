import React, { useEffect, useState } from "react";
import zionSleeve from "../Assets/pochette-radio-zion.png";
import dubatekSleeve from "../Assets/pochette-dubatek.png";
import zionRecord from "../Assets/disc-radio-zion.png";
import dubatekRecord from "../Assets/disc-dubatek.png";

const RadioChoice = () => {
  const [backwardClick, setBackwardClik] = useState(false);
  const [forwardClick, setForwardClick] = useState(false);
  const [sleevePosition1, setSleevePosition1] = useState("--backSleeveBackward");
  const [sleevePosition2, setSleevePosition2] = useState("--frontSleeveBackward");
  const [displayPlayButton, setdisplayPlaybutton] = useState("");

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
      if (sleevePosition1 === "--frontSleeveBackward" || sleevePosition1 === "--frontSleeveForward") {
        setSleevePosition1("--backSleeveForward");
        setSleevePosition2("--frontSleeveForward");
      } else if (sleevePosition1 === "--backSleeveBackward" || sleevePosition1 === "--backSleeveForward") {
        setSleevePosition1("--frontSleeveForward");
        setSleevePosition2("--backSleeveForward");
      }
    } else if (forwardClick === true) {
      if (sleevePosition1 === "--frontSleeveBackward" || sleevePosition1 === "--frontSleeveForward") {
        setSleevePosition1("--backSleeveForward");
        setSleevePosition2("--frontSleeveForward");
      } else if (sleevePosition1 === "--backSleeveBackward" || sleevePosition1 === "--backSleeveForward") {
        setSleevePosition1("--frontSleeveForward");
        setSleevePosition2("--backSleeveForward");
      }
    }
  }, [forwardClick]);

  useEffect(() => {
    if (backwardClick === false) {
      if (sleevePosition1 === "--frontSleeveBackward" || sleevePosition1 === "--frontSleeveForward") {
        setSleevePosition1("--backSleeveBackward");
        setSleevePosition2("--frontSleeveBackward");
      } else if (sleevePosition1 === "--backSleeveBackward" || sleevePosition1 === "--backSleeveForward") {
        setSleevePosition1("--frontSleeveBackward");
        setSleevePosition2("--backSleeveBackward");
      }
    } else if (backwardClick === true) {
      if (sleevePosition1 === "--frontSleeveBackward" || sleevePosition1 === "--frontSleeveForward") {
        setSleevePosition1("--backSleeveBackward");
        setSleevePosition2("--frontSleeveBackward");
      } else if (sleevePosition1 === "--backSleeveBackward" || sleevePosition1 === "--backSleeveForward") {
        setSleevePosition1("--frontSleeveBackward");
        setSleevePosition2("--backSleeveBackward");
      }
    }
  }, [backwardClick]);

  return (
    <div className="radioChoice">
      <i
        className="fa-solid fa-backward-step"
        id="backward"
        onClick={(e) => {
          backward(e);
        }}
      ></i>

      <div className="collection" id="collection">
        <img src={zionSleeve} alt="pochette radio zion" id="zionSleeve" className={"collection__zionSleeve collection__zionSleeve" + sleevePosition1} />

        <img src={dubatekSleeve} alt="pochette dubatek radio" id="dubatekSleeve" className={"collection__dubatekSleeve collection__dubatekSleeve" + sleevePosition2} />

        {sleevePosition1 === "--frontSleeveBackward" || sleevePosition1 === "--frontSleeveForward" ? (
          <img src={zionRecord} alt="vinyl de radio zion" id="zionRecord" className="collection__zionRecord collection__zionRecord--out" />
        ) : (
          ""
        )}

        {sleevePosition2 === "--frontSleeveBackward" || sleevePosition2 === "--frontSleeveForward" ? (
          <img src={dubatekRecord} alt="vinyl de radio dubatek" id="dubatekRecord" className="collection__dubatekRecord collection__dubatekRecord--out" />
        ) : (
          ""
        )}

        <i className={"fa-solid fa-circle-play" + displayPlayButton}></i>
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

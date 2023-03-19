import React, { useState } from "react";
import zionSleeve from "../Assets/pochette-radio-zion.png";
import dubatekSleeve from "../Assets/pochette-dubatek.png";
import zionRecord from "../Assets/disc-radio-zion.png";
import dubatekRecord from "../Assets/disc-dubatek.png";

const RadioChoice = () => {
  const [backwardClick, setBackwardClik] = useState(false);

  return (
    <div className="radioChoice">
      <i
        className="fa-solid fa-backward-step"
        id="backward"
        onClick={(e) => {
          setBackwardClik(true);
        }}
      ></i>
      <div className="collection" id="collection">
        <img src={zionSleeve} alt="pochette radio zion" id="zionSleeve" className="collection__zionSleeve" />
        <img src={dubatekSleeve} alt="pochette dubatek radio" id="dubatekSleeve" className="collection__dubatekSleeve" />
        {backwardClick ? (
          <img src={zionRecord} alt="vinyl de radio zion" id="zionRecord" className="collection__zionRecord--out" />
        ) : (
          <img src={zionRecord} alt="vinyl de radio zion" id="zionRecord" className="collection__zionRecord" />
        )}
        <img src={dubatekRecord} alt="vinyl de radio dubatek" id="dubatekRecord" className="collection__dubatekRecord" />
      </div>
      <i className="fa-solid fa-forward-step" id="forward"></i>
    </div>
  );
};

export default RadioChoice;

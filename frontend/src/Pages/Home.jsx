import Header from "../Components/Header";
import ReactPlayer from "react-player/file";
import { useEffect, useState } from "react";

const Home = () => {
  const [isLiveStreamActive, setIsLiveStreamActive] = useState(true);
  const [selectedQuality, setSelectedQuality] = useState("low");

  useEffect(() => {
    const ws = new WebSocket("wss://zionsound.fr:8085");
    ws.addEventListener("open", function (event) {
      console.log("WebSocket connecté");
    });

    ws.addEventListener("close", function (event) {
      console.log("WebSocket fermé");
    });

    ws.addEventListener("error", function (event) {
      console.error("WebSocket erreur:", event);
    });
    ws.addEventListener("message", (event) => {
      const data = JSON.parse(event.data);
      setIsLiveStreamActive(data.isLiveStreamActive);
    });
    return () => {
      ws.close();
    };
  }, []);

  return (
    <>
      <Header />
      {isLiveStreamActive === true ? (
        selectedQuality === "low" ? (
          <ReactPlayer url="https://zionsound.fr:8443/live/test_stream_360.flv" playing={true} controls={true} muted={true} />
        ) : (
          <ReactPlayer url="https://zionsound.fr:8443/live/test_stream.flv" playing={true} controls={true} muted={true} />
        )
      ) : (
        ""
      )}

      {isLiveStreamActive ? <button onClick={() => setSelectedQuality("low")}>Qualité faible</button> : ""}

      {isLiveStreamActive ? <button onClick={() => setSelectedQuality("high")}>Qualité élevée</button> : ""}
    </>
  );
};

export default Home;

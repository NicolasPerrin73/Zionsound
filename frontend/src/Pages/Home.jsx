import Header from "../Components/Header";
import ReactPlayer from "react-player/file";
import { useEffect, useState } from "react";

const Home = () => {
  const [isLiveStreamActive, setIsLiveStreamActive] = useState(false);
  const [selectedQuality, setSelectedQuality] = useState("low");

  useEffect(() => {
    const ws = new WebSocket("ws://www.zionsound.fr:8083");
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
          <ReactPlayer url="http://www.zionsound.fr:8081/live/test_stream_360.flv" playing={true} controls={true} muted={true} />
        ) : (
          <ReactPlayer url="http://www.zionsound.fr:8081/live/test_stream.flv" playing={true} controls={true} muted={true} />
        )
      ) : (
        ""
      )}
      <button onClick={() => setSelectedQuality("low")}>Qualité faible</button>
      <button onClick={() => setSelectedQuality("high")}>Qualité élevée</button>
    </>
  );
};

export default Home;

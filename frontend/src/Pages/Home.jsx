import React from "react";
import Header from "../Components/Header";

const Home = () => {
  return (
    <>
      <Header />
      <iframe src="http://82.165.49.163:8080/embed/video" title="Owncast" height="350px" width="550px" referrerpolicy="origin" scrolling="no" allowfullscreen></iframe>
    </>
  );
};

export default Home;

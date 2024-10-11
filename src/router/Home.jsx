import React from "react";
import MainButton from "../components/MainButton";
import "../css/App.css";
import mainVideo from "../images/main.mp4";
import "../css/VideoStyle.css";

const Home = () => {
  return (
    <>
      <div className="video-container">
        <video muted autoPlay loop>
          <source src={mainVideo} type="video/mp4" />
        </video>
        <MainButton />
      </div>
    </>
  );
};

export default Home;

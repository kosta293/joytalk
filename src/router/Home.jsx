import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainButton from "../components/MainButton";
import "../css/App.css";
import mainVideo from "../images/main.mp4";
import "../css/VideoStyle.css";
import Iphone from "../components/Iphone";
import LogIn from "./LogIn";

const Home = () => {
  return (
    <>
      <div className="video-container">
        <video muted autoPlay loop>
          <source src={mainVideo} type="video/mp4" />
        </video>
      </div>
      <h1>joy talk</h1>
      <MainButton />
    </>
  );
};

export default Home;

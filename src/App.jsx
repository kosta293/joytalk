import React from "react";
import { Route, Routes } from "react-router-dom";
import Iphone from "./components/Iphone";
import LogIn from "./router/LogIn";
import Home from "./router/Home";
import Profile from "./router/Profile";
import Chat from "./router/Chat";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Iphone>
            <span className="joytalk">JOY TALK</span>
            <Home />
          </Iphone>
        }
      />
      <Route
        path="/LogIn"
        element={
          <Iphone>
            <LogIn />
          </Iphone>
        }
      />
      <Route
        path="/Profile"
        element={
          <Iphone>
            <Profile />
          </Iphone>
        }
      />
      <Route
        path="/Chat"
        element={
          <Iphone>
            <Chat />
          </Iphone>
        }
      />
    </Routes>
  );
}

export default App;

import React from "react";
import { Route, Routes } from "react-router-dom";
import Iphone from "./components/Iphone";
import LogIn from "./router/LogIn";
import Home from "./router/Home";
import Profile from "./router/Profile";
import Friends from "./router/Friends";
import ChatList from "./router/ChatList";
import MyPage from "./router/MyPage";
import Chat from "./router/Chat";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Iphone>
            <div className="joytalk">JOY TALK</div>
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
        path="/Friends"
        element={
          <Iphone>
            <Friends />
          </Iphone>
        }
      />
      <Route
        path="/ChatList"
        element={
          <Iphone>
            <ChatList />
          </Iphone>
        }
      />
      <Route
        path="/MyPage"
        element={
          <Iphone>
            <MyPage />
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

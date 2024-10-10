import React from "react";
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
import MainButton from "./components/MainButton";
import "./css/App.css";
import ChatWindow from "./components/ChatWindow";
import MessageWindow from "./components/MessageWindow";
import MessageButton from "./components/MessageButton";

function Chat() {
  return (
    <div className="Chat">
      <div>
        <ChatWindow />
      </div>
      <div>
        <MessageWindow />
      </div>
      <div>
        <MessageButton />
      </div>
    </div>
  );
}

export default Chat;

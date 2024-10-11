import React from "react";
import { useLocation } from "react-router-dom"; // useLocation 추가
import "../css/Chat.css";
import ChatWindow from "../components/ChatWindow";
import ChatWindowCopy from "../components/ChatWindow copy";

const Chat = () => {
  const location = useLocation(); // location 가져오기
  return (
    <>
      {/*<ChatWindow></ChatWindow>*/}
      <ChatWindowCopy></ChatWindowCopy>
      {/*<ChatWindow location={location} /> /!* location prop 전달 *!/*/}
    </>
  );
};

export default Chat;

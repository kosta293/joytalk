import React from "react";
import { useLocation } from "react-router-dom"; // useLocation 추가
import "../css/Chat.css";
import ChatWindow from "../components/ChatWindow";

const Chat = () => {
  const location = useLocation(); // location 가져오기
  return (
    <>
      <ChatWindow location={location} /> {/* location prop 전달 */}
    </>
  );
};

export default Chat;

import React from "react";
import { useLocation, useNavigate } from "react-router-dom"; // useLocation 추가
import ChatWindow from "../components/ChatWindow";

const Chat = () => {
  const location = useLocation(); // location 가져오기
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // 이전 페이지로 돌아가기
  };

  return (
    <>
      <ChatWindow location={location} /> {/* location prop 전달 */}
    </>
  );
};

export default Chat;

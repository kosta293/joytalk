import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import "./ChatWindow.css";

const ChatWindow = ({ selectedUser, location }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const socketRef = useRef(null);

  // 여기 값을 제대로 못가져옴
  const nickname = location.state?.nickname || "익명";

  useEffect(() => {
    console.log("전체 state:", location.state);
    console.log("받은 닉네임:", nickname); // 닉네임 확인
    socketRef.current = new WebSocket("ws://localhost:8079");
    socketRef.current.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        setMessages((prevMessages) => [...prevMessages, data]);
      } catch (error) {
        console.error("JSON 파싱 에러:", error);
      }
    };

    return () => {
      socketRef.current.close();
    };
  }, [nickname]); // 닉네임이 바뀔 때마다 useEffect 실행

  const sendMessage = (e) => {
    e.preventDefault();
    if (!message.trim() || !socketRef.current) return;

    const messageData = {
      from: nickname,
      to: selectedUser,
      message,
    };
    socketRef.current.send(JSON.stringify(messageData));
    setMessages((prevMessages) => [...prevMessages, messageData]);
    setMessage("");
  };

  return (
    <div className="chat-container">
      <div className="chat-window">
        <div className="chat-header">
          <h2>{selectedUser} JOYTALK</h2>
        </div>
        <div className="chat-messages">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message ${
                msg.from === nickname ? "send" : "received"
              }`}
            >
              {msg.from === nickname ? (
                <div className="my-message">
                  <span>{msg.message}</span>
                  <span className="nickname">{nickname}</span>
                </div>
              ) : (
                <div className="received-message">
                  <span className="nickname">{msg.from}</span>
                  <span>{msg.message}</span>
                </div>
              )}
            </div>
          ))}
        </div>
        <form className="chat-input" onSubmit={sendMessage}>
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="메시지 입력"
          />
          <button type="submit">전송</button>
        </form>
      </div>
    </div>
  );
};

export default ChatWindow;

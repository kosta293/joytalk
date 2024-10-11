import React, { useEffect, useState } from "react";
import "./ChatWindow copy.css";

const ChatWindowCopy = ({ selectedUser, userId }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  let socket;

  useEffect(() => {
    socket = new WebSocket("ws://localhost:8079");

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        setMessages((prevMessages) => [...prevMessages, data]);
      } catch (error) {
        console.error("JSON 파싱 에러:", error);
        console.error("받은 데이터:", event.data);
      }
    };

    return () => {
      socket.close();
    };
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const messageData = {
      from: userId,
      to: selectedUser,
      message,
    };
    socket.send(JSON.stringify(messageData));
    setMessages((prevMessages) => [...prevMessages, messageData]);
    setMessage("");
  };

  return (
      <div className="chat-window">
        <div className="chat-header">
          <h2>{selectedUser} JOYTALK</h2>
        </div>
        <div className="chat-messages">
          {/* 배경 비디오 추가 */}
          <video
              className="background-video"
              autoPlay
              loop
              muted
          >
            <source src="/video/sunny.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {messages.map((msg, index) => (
              <div
                  key={index}
                  className={`message ${msg.from === userId ? "send" : "received"}`}
              >
                {msg.message}
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
  );
};

export default ChatWindowCopy;

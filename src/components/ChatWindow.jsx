import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import "./ChatWindow.css";

const ChatWindow = ({ location }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const socketRef = useRef(null);
  const scrollRef = useRef(null); // 스크롤 최신화 상태

  const nickname = location.state?.nickname || "익명";

  useEffect(() => {
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
  }, [nickname]);

  useEffect(() => {
    // 스크롤 맨 밑에
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!message.trim() || !socketRef.current) return;

    const messageData = {
      from: nickname,
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
          <h2> JOYTALK</h2>
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
                <div className="send">
                  <span>{msg.message}</span>
                  <span className="nickname">{nickname}</span>
                </div>
              ) : (
                <div className="received">
                  <span className="nickname">{msg.from}</span>
                  <span>{msg.message}</span>
                </div>
              )}
            </div>
          ))}
          <div ref={scrollRef}></div> {/* 요거요거 메세지 */}
        </div>
        <form className="chat-input" onSubmit={sendMessage}>
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="메시지 입력"
          />
          <button type="submit">전 송</button>
        </form>
      </div>
    </div>
  );
};

export default ChatWindow;

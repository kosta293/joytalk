import React, { useEffect, useState } from "react";
import socket from "../socket";
import "./ChatWindow.css";

const ChatWindow = ({ selectedUser, userId }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, data]);
    };

    return () => {
      socket.onmessage = null;
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
    setMessage("");
  };

  return (
    <div className="chat-window">
      <div className="chat-header">
        <h2>{selectedUser} JOYTALK</h2>
      </div>
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.from === userId ? "sent" : "received"}`}
          >
            <strong>{msg.from}: </strong>
            {msg.message}
          </div>
        ))}
      </div>
      <form className="chat-input" onSubmit={sendMessage}>
        {" "}
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

export default ChatWindow;

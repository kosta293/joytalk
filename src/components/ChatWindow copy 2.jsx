import React, { useState, useRef, useEffect } from "react"; // React 및 훅들 import
import "../css/ChatWindow.css"; // CSS 스타일 임포트
import Weather from "./Weather.jsx"; // 날씨 컴포넌트 임포트
import Picker from "@emoji-mart/react"; // 새로운 패키지의 Picker 임포트
import useScrollToBottom from "./useScrollToBottom"; // 커스텀 훅 임포트

const ChatWindow = ({ location }) => {
  const [message, setMessage] = useState(""); // 현재 입력된 메시지 상태
  const [messages, setMessages] = useState([]); // 수신된 메시지 리스트 상태
  const [showEmojiPicker, setShowEmojiPicker] = useState(false); // 이모지 선택창 표시 상태
  const socketRef = useRef(null); // WebSocket 참조
  const messagesRef = useRef(null); // 메시지 리스트 컨테이너 참조

  const nickname = location.state?.nickname || "익명"; // 닉네임, 기본값은 "익명"
  const imageUrl = location.state?.imageUrl; // 프로필 이미지 URL

  const formatTimestamp = (timestamp) => {
    if (typeof timestamp === "string") {
      const parsedTimestamp = Date.parse(timestamp);
      if (!isNaN(parsedTimestamp)) {
        timestamp = parsedTimestamp; // 밀리초로 변환
      } else {
        return "유효하지 않은 날짜"; // 변환 실패
      }
    }
    if (typeof timestamp !== "number" || isNaN(timestamp)) {
      return "유효하지 않은 날짜";
    }
    const date = new Date(timestamp);
    if (isNaN(date.getTime())) {
      return "유효하지 않은 날짜";
    }
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const amPm = hours >= 12 ? "오후" : "오전";
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes.toString().padStart(2, "0");
    return `${amPm} ${formattedHours}:${formattedMinutes}`;
  };

  useEffect(() => {
    // WebSocket 연결 설정
    socketRef.current = new WebSocket("ws://localhost:8079");
    socketRef.current.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data); // 수신된 데이터 JSON 파싱
        setMessages((prevMessages) => [...prevMessages, data]); // 메시지 리스트 업데이트
      } catch (error) {
        console.error("JSON 파싱 에러:", error); // 파싱 에러 로깅
      }
    };
    return () => {
      socketRef.current.close();
    };
  }, [nickname]); // 닉네임이 변경될 때마다 새로운 소켓 생성

  const sendMessage = (e) => {
    e.preventDefault(); // 폼 제출 기본 동작 방지
    if (!message.trim() || !socketRef.current) return; // 메시지가 비어있거나 소켓이 없으면 종료

    const messageData = {
      from: nickname, // 메시지 발신자
      message, // 메시지 내용
      imageUrl: imageUrl, // 프로필 이미지
      id: Date.now(),
      timestamp: new Date().toISOString(),
    };

    socketRef.current.send(JSON.stringify(messageData)); // 메시지를 소켓으로 전송
    setMessages((prevMessages) => [...prevMessages, messageData]); // 메시지 리스트 업데이트
    setMessage(""); // 입력 필드 초기화
  };

  const addEmoji = (emoji) => {
    setMessage((prevMessage) => prevMessage + emoji.native); // 이모티콘을 메시지에 추가
    setShowEmojiPicker(false); // 이모티콘 선택 후 창 닫기
  };

  // 커스텀 훅 사용 (스크롤 자동 이동)
  useScrollToBottom(messagesRef);

  return (
    <div className="chat-container">
      <div className="chat-window">
        <div className="chat-header">
          {imageUrl && (
            <img
              src={imageUrl}
              alt="업로드된 프로필 이미지"
              className="profile-image1"
            />
          )}
          <span className="header-nickname">{nickname}</span>
        </div>
        <div className="chat-messages">
          <Weather />
          <div className="chat-messages-list" ref={messagesRef}>
            {messages.map((msg, index) => (
              <div key={index} className="message-wrapper">
                {msg.from === nickname ? (
                  <div className="my-message">
                    <span className="time-stamp">
                      {formatTimestamp(msg.timestamp)}
                    </span>
                    <div className="send-message">
                      <span className="text">{msg.message}</span>
                    </div>
                    <div className="profile-section">
                      <img
                        src={imageUrl}
                        alt="내 프로필"
                        className="profile-image"
                      />
                      <span className="nickname">{nickname}</span>
                    </div>
                  </div>
                ) : (
                  <div className="received-message">
                    <div className="profile-section">
                      <img
                        src={msg.imageUrl}
                        alt="상대방 프로필"
                        className="profile-image"
                      />
                      <span className="nickname">{msg.from}</span>
                    </div>
                    <div className="your-message">
                      <span className="text">{msg.message}</span>
                    </div>
                    <span className="time-stamp">
                      {formatTimestamp(msg.timestamp)}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <form className="chat-input" onSubmit={sendMessage}>
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="메시지 입력"
          />
          <span
            className="emoji-button"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          >
            😊
          </span>
          <button type="submit">전 송</button>
        </form>

        {/* 이모지 선택창 팝업 */}
        {showEmojiPicker && (
          <div className="emoji-picker-overlay">
            <div className="emoji-picker">
              <button
                className="close-btn"
                onClick={() => setShowEmojiPicker(false)}
              >
                😊
              </button>
              <Picker onEmojiSelect={addEmoji} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatWindow;

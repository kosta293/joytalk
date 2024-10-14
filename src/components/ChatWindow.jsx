import { useEffect, useState, useRef } from "react"; // 필요한 React 훅들 임포트
import "../css/ChatWindow.css"; // CSS 스타일 임포트
import Weather from "./Weather.jsx"; // 날씨 컴포넌트 임포트

const ChatWindow = ({ selectedUser, location }) => {
  const [message, setMessage] = useState(""); // 현재 입력된 메시지 상태
  const [messages, setMessages] = useState([]); // 수신된 메시지 리스트 상태
  const socketRef = useRef(null); // WebSocket 참조
  const scrollRef = useRef(null); // 스크롤 최신화 상태

  const nickname = location.state?.nickname || "익명"; // 닉네임, 기본값은 "익명"
  const imageUrl = location.state?.imageUrl; // 프로필 이미지 URL

  /* 타임 스탬프 */
  const formatTimestamp = (timestamp) => {
    // 문자열인 경우, Date.parse()로 변환
    if (typeof timestamp === "string") {
      const parsedTimestamp = Date.parse(timestamp);
      if (!isNaN(parsedTimestamp)) {
        timestamp = parsedTimestamp; // 밀리초로 변환
      } else {
        return "유효하지 않은 날짜"; // 변환 실패
      }
    }

    // 숫자 형식인지 확인
    if (typeof timestamp !== "number" || isNaN(timestamp)) {
      return "유효하지 않은 날짜";
    }

    const date = new Date(timestamp);
    if (isNaN(date.getTime())) {
      // date가 유효한지 확인
      return "유효하지 않은 날짜";
    }
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const amPm = hours >= 12 ? "오후" : "오전";
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes.toString().padStart(2, "0");

    return `${amPm} ${formattedHours}:${formattedMinutes}`;
  };

  // 테스트 예제

  /* 여기까지 */

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

    // 컴포넌트 언마운트 시 WebSocket 연결 종료
    return () => {
      socketRef.current.close();
    };
  }, [nickname]); // 닉네임이 변경될 때마다 새로운 소켓 생성

  useEffect(() => {
    // 메시지가 업데이트될 때마다 스크롤을 맨 아래로 이동
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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

  return (
    <div className="chat-container">
      <div className="chat-window">
        <div className="chat-header">
          {imageUrl && (
            <img
              src={imageUrl}
              alt="업로드된 프로필 이미지"
              className="profile-image"
            />
          )}
          <span className="header-nickname">{nickname}</span>{" "}
          {/* 닉네임 표시 */}
        </div>
        <div className="chat-messages">
          <Weather /> {/* 날씨 컴포넌트 */}
          {messages.map((msg, index) => (
            <div key={index} className="message-wrapper">
              {msg.from === nickname ? (
                // 나의 메시지인 경우
                <div className="my-message">
                  <span className="time-stamp">
                    {formatTimestamp(msg.timestamp)}
                  </span>
                  <div className="send-message">
                    <span className="text">{msg.message}</span>{" "}
                    {/* 메시지 내용 */}
                  </div>
                  <div className="profile-section">
                    <img
                      src={imageUrl} // 나의 프로필 이미지
                      alt="내 프로필"
                      className="profile-image"
                    />
                    <span className="nickname">{nickname}</span>{" "}
                    {/* 내 닉네임 */}
                  </div>
                </div>
              ) : (
                // 상대방의 메시지인 경우
                <div className="received-message">
                  <div className="profile-section">
                    <img
                      src={msg.imageUrl} // 상대방 프로필 이미지
                      alt="상대방 프로필"
                      className="profile-image"
                    />
                    <span className="nickname">{msg.from}</span>{" "}
                    {/* 상대방 닉네임 */}
                  </div>
                  <div className="your-message">
                    <span className="text">{msg.message}</span>{" "}
                    {/* 메시지 내용 */}
                  </div>
                  <span className="time-stamp">
                    {formatTimestamp(msg.timestamp)}
                  </span>
                </div>
              )}
            </div>
          ))}
          <div ref={scrollRef}></div> {/* 스크롤을 위한 빈 div */}
        </div>
        <form className="chat-input" onSubmit={sendMessage}>
          <input
            value={message} // 입력 필드의 값
            onChange={(e) => setMessage(e.target.value)} // 입력 시 상태 업데이트
            placeholder="메시지 입력" // 플레이스홀더
          />
          <button type="submit">전 송</button> {/* 메시지 전송 버튼 */}
        </form>
      </div>
    </div>
  );
};

export default ChatWindow; // 컴포넌트 내보내기

import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import BottomNav from "../components/BottomNav";
import "../css/ChatList.css";
import SampleImage from "../images/profile.png"; // 기본 프로필 이미지

const ChatList = () => {
  const location = useLocation();

  // nickname과 imageUrl 상태 관리
  const [nickname, setNickname] = useState("익명");
  const [imageUrl, setImageUrl] = useState(SampleImage);

  // useEffect로 location.state가 변경될 때마다 상태 업데이트
  useEffect(() => {
    if (location.state) {
      setNickname(location.state.nickname || "익명");
      setImageUrl(location.state.imageUrl || SampleImage);
    }
  }, [location.state]);

  // 채팅방 목록 상태 관리
  const [chatRooms, setChatRooms] = useState([
    {
      nickname: "친구1",
      imageUrl: SampleImage,
      lastMessage: "안녕하세요, 오늘은 뭐해요?",
      time: "오후 8:18",
    },
    {
      nickname: "친구2",
      imageUrl: SampleImage,
      lastMessage: "식사는 하셨나요?",
      time: "오후 9:48",
    },
  ]);

  return (
    <div className="chatlist">
      <div className="chatlist-header">
        <img
          src={imageUrl}
          alt="업로드된 프로필 이미지"
          className="profile-image1"
        />
        <span className="header-nickname">{nickname}</span>
      </div>
      <div className="chatlist-body">
        {chatRooms.map((room, index) => (
          <div key={index} className="chatroom-item">
            <img
              src={room.imageUrl}
              alt={room.nickname}
              className="chatroom-profile-image"
            />
            <div className="chatroom-info">
              <span className="chatroom-nickname">{room.nickname}</span>
              <span className="chatroom-last-message">{room.lastMessage}</span>
              <span className="chatroom-time">{room.time}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="chatlist-bottom">
        <BottomNav nickname={nickname} imageUrl={imageUrl} />
      </div>
    </div>
  );
};

export default ChatList;

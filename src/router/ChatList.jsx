import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import BottomNav from "../components/BottomNav";
import "../css/ChatList.css";

import SampleImage1 from "../images/person1.png";
import SampleImage2 from "../images/person2.png";
import SampleImage3 from "../images/person3.png";
import SampleImage4 from "../images/person4.png";
import SampleImage5 from "../images/person5.png";

const ChatList = () => {
  const location = useLocation();

  const [nickname, setNickname] = useState("익명");
  const [imageUrl, setImageUrl] = useState(SampleImage1);

  useEffect(() => {
    if (location.state) {
      setNickname(location.state.nickname || "익명");
      setImageUrl(location.state.imageUrl || SampleImage1);
    }
  }, [location.state]);

  const [chatRooms, setChatRooms] = useState([
    {
      nickname: "홍애리",
      imageUrl: SampleImage5,
      lastMessage: "내일 영화 보실래요??",
      time: "오후 9:15",
    },
    {
      nickname: "지화자",
      imageUrl: SampleImage4,
      lastMessage: "공부는 하셨나요?",
      time: "오후 8:00",
    },
    {
      nickname: "이상민",
      imageUrl: SampleImage3,
      lastMessage: "오늘 과제는 다 하셨나요?",
      time: "오후 7:30",
    },
    {
      nickname: "나미녀",
      imageUrl: SampleImage2,
      lastMessage: "식사는 하셨나요?",
      time: "오후 6:48",
    },
    {
      nickname: "김민규",
      imageUrl: SampleImage1,
      lastMessage: "오늘 스터디 주제가 뭐죠?",
      time: "오후 5:18",
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

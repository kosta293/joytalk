import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import BottomNav from "../components/BottomNav";
import "../css/Friends.css";
import SampleImage from "../images/profile.png"; // 기본 프로필 이미지

const Friends = () => {
  const location = useLocation();

  // nickname과 imageUrl 상태 관리
  const [nickname, setNickname] = useState("익명");
  const [imageUrl, setImageUrl] = useState(SampleImage);

  // useEffect로 location.state가 변경될 때마다 상태 업데이트
  useEffect(() => {
    if (location.state) {
      // location.state가 있을 때만 업데이트
      setNickname(location.state.nickname || "익명");
      setImageUrl(location.state.imageUrl || SampleImage);
    }
  }, [location.state]); // location.state가 변경될 때마다 실행

  // 친구 목록 상태 (여기서는 임시로 더미 데이터 추가)
  const [friends, setFriends] = useState([
    { nickname: "친구1", imageUrl: SampleImage },
    { nickname: "친구2", imageUrl: SampleImage },
    { nickname: "친구3", imageUrl: SampleImage },
  ]);

  // 친구 추가 함수 (예시)
  const handleAddFriend = () => {
    setFriends([
      ...friends,
      {
        nickname: `친구${friends.length + 1}`,
        imageUrl: SampleImage,
      },
    ]);
  };

  // 친구 추가 버튼 클릭시 

  return (
    <div className="friends-list">
      <div className="friends-header">
        {imageUrl && (
          <img
            src={imageUrl}
            alt="업로드된 프로필 이미지"
            className="profile-image1"
          />
        )}
        <div className="header-nickname">{nickname}</div>
        <button className="add-friend-button" onClick={handleAddFriend}>
          친구 추가
        </button>
      </div>
      
      <div className="friends-body">
        <ul className="friends-list">
          {friends.map((friend, index) => (
            <li key={index} className="friend-item">
              <img
                src={friend.imageUrl}
                alt="친구 프로필"
                className="friend-profile-image"
              />
              <div className="friend-nickname">{friend.nickname}</div>
            </li>
          ))}
        </ul>
      </div>
      <div className="friends-bottom">
        <BottomNav nickname={nickname} imageUrl={imageUrl} />
      </div>
    </div>
  );
};

export default Friends;

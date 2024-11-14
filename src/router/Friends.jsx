import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BottomNav from "../components/BottomNav";
import "../css/Friends.css";
import SampleImage from "../images/profile.png"; // 기본 프로필 이미지

const Friends = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [nickname, setNickname] = useState("익명");
  const [imageUrl, setImageUrl] = useState(SampleImage);
  const [friends, setFriends] = useState([
    { nickname: "친구1", imageUrl: SampleImage },
    { nickname: "친구2", imageUrl: SampleImage },
    { nickname: "친구3", imageUrl: SampleImage },
  ]);
  const [selectedFriend, setSelectedFriend] = useState(null); // 선택된 친구 상태 관리

  useEffect(() => {
    if (location.state) {
      setNickname(location.state.nickname || "익명");
      setImageUrl(location.state.imageUrl || SampleImage);
    }
  }, [location.state]);

  const handleAddFriend = () => {
    setFriends([
      ...friends,
      {
        nickname: `친구${friends.length + 1}`,
        imageUrl: SampleImage,
      },
    ]);
  };

  const handleFriendClick = (friend) => {
    if (selectedFriend === friend) {
      setSelectedFriend(null);
    } else {
      setSelectedFriend(friend); // 선택된 친구 저장
    }
  };

  const goToChat = (friend) => {
    navigate('/chat', { state: { nickname: friend.nickname, imageUrl: friend.imageUrl } }); // navigate로 변경
  };


  const closeProfileCard = () => {
    setSelectedFriend(null); // 프로필 카드 닫기
  };

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
            <li key={index} className="friend-item" onClick={() => handleFriendClick(friend)}>
              <img
                src={friend.imageUrl}
                alt="친구 프로필"
                className="friend-profile-image"
              />
              <div className="friend-nickname">{friend.nickname}</div>
              {selectedFriend === friend && (
                <div className="friend-profile-card">
                  <button className="close-button" onClick={closeProfileCard}>✖</button>
                  <img src={friend.imageUrl} alt={friend.nickname} className="friend-profile-card-image" />
                  <div className="friend-profile-card-nickname">{friend.nickname}</div>
                  <button className="chat-button" onClick={() => goToChat(friend)}>
                    채팅하기
                  </button>
                </div>
              )}
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

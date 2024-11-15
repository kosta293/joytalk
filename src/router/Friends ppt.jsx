import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import BottomNav from "../components/BottomNav";
import "../css/Friends.css";
import AddFriendPopup from "../components/AddFriendPopup"; // 친구 추가 팝업 컴포넌트

const Friends = () => {
  const location = useLocation();
  const [nickname, setNickname] = useState("익명");
  const [imageUrl, setImageUrl] = useState("/images/profile.png");
  const [showPopup, setShowPopup] = useState(false); // 팝업 표시 상태

  // 친구 목록 데이터를 추가
  const [friends, setFriends] = useState([
    { nickname: "김민규", imageUrl: "/img/person1.png" },
    { nickname: "나미녀", imageUrl: "/img/person2.png" },
    { nickname: "이상민", imageUrl: "/img/person3.png" },
    { nickname: "지화자", imageUrl: "/img/person4.png" },
    { nickname: "홍애리", imageUrl: "/img/person5.png" },
  ]);

  // location.state가 있을 경우 닉네임, 이미지 URL 설정
  useEffect(() => {
    if (location.state) {
      setNickname(location.state.nickname || "익명");
      setImageUrl(location.state.imageUrl || "/images/profile.png");
    }
  }, [location.state]);

  // 친구 목록 조회
  // const fetchFriendsList = async () => {
  //   try {
  //     const response = await fetchFriends(location.state.memberId);
  //     setFriends(response);
  //   } catch (error) {
  //     console.error("친구 목록 조회 실패:", error);
  //   }
  // };

  // 컴포넌트 로드시 친구 목록 조회
  // useEffect(() => {
  //   fetchFriendsList();
  // }, []);

  return (
    <div className="friends-list">
      <div className="friends-header">
        {imageUrl && (
          <img src={imageUrl} alt="프로필 이미지" className="profile-image1" />
        )}
        <div className="header-nickname">{nickname}</div>
        <button
          onClick={() => setShowPopup(true)}
          className="add-friend-button"
        >
          친구 추가
        </button>
      </div>

      {/* 친구 목록 */}
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

      {/* 팝업 */}
      {showPopup && (
        <AddFriendPopup
          memberId={location.state?.memberId}
          onClose={() => setShowPopup(false)}
          // 친구 추가 후 목록 갱신이 필요하다면 fetchFriendsList 사용
        />
      )}

      <div className="friends-bottom">
        <BottomNav nickname={nickname} imageUrl={imageUrl} />
      </div>
    </div>
  );
};

export default Friends;

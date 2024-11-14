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

  // useEffect로 location.state가 있을 때만 상태 업데이트
  useEffect(() => {
    if (location.state) {
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

  // 친구 추가 팝업 창 관련 상태
  const [showAddFriendPopup, setShowAddFriendPopup] = useState(false);
  const [searchNickname, setSearchNickname] = useState(""); // 검색된 닉네임
  const [searchedFriend, setSearchedFriend] = useState(null); // 검색된 친구 (존재할 경우)

  // 친구 추가 함수
  const handleAddFriend = () => {
    if (searchedFriend) {
      setFriends([
        ...friends,
        {
          nickname: searchedFriend.nickname,
          imageUrl: searchedFriend.imageUrl,
        },
      ]);
      setShowAddFriendPopup(false); // 친구 추가 후 팝업 닫기
    }
  };

  // 친구 검색 함수 (간단히 더미 데이터에서 검색)
  const handleSearchFriend = () => {
    const friend = friends.find((friend) => friend.nickname === searchNickname);
    if (friend) {
      setSearchedFriend(friend);
    } else {
      setSearchedFriend(null); // 검색 결과 없으면 null
    }
  };

  // 친구 추가 버튼 클릭 시 팝업 열기
  const handleAddFriendClick = () => {
    console.log("친구 추가 버튼 클릭됨");
    setShowAddFriendPopup(true);
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
        {/* 친구 추가 버튼 */}
        <button className="add-friend-button" onClick={handleAddFriendClick}>
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

      {/* 친구 추가 팝업 창 */}
      {showAddFriendPopup && (
        <div className="add-friend-popup">
          <div className="popup-content">
            <h3>친구 추가</h3>
            {/* 검색된 친구 정보 */}
            {searchedFriend ? (
              <div className="friend-info">
                <img
                  src={searchedFriend.imageUrl}
                  alt="친구 프로필"
                  className="searched-profile-image"
                />
                <div>{searchedFriend.nickname}</div>
                <button onClick={handleAddFriend} className="add-button">
                  친구 추가
                </button>
              </div>
            ) : (
              <div></div>
            )}

            <input
              type="text"
              value={searchNickname}
              onChange={(e) => setSearchNickname(e.target.value)}
              placeholder="닉네임을 입력하세요"
              className="search-input"
            />
            <button onClick={handleSearchFriend} className="search-button">
              검색
            </button>

            {/* 팝업 닫기 버튼 */}
            <button
              onClick={() => setShowAddFriendPopup(false)}
              className="close-button"
            >
              닫기
            </button>
          </div>
        </div>
      )}

      {/* 하단 네비게이션 */}
      <div className="friends-bottom">
        <BottomNav nickname={nickname} imageUrl={imageUrl} />
      </div>
    </div>
  );
};

export default Friends;

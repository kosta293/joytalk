import React, { useState } from "react";
import { searchFriends, addFriend } from "../api";
import "../css/AddFriendPopup.css";
import SampleImage from "../images/profile.png"; // 샘플 이미지

const AddFriendPopup = ({ memberId, onClose, onFriendAdded }) => {
  const [searchNickname, setSearchNickname] = useState("");
  const [searchResult, setSearchResult] = useState(null);

  // 닉네임으로 친구 검색
  const handleSearch = async () => {
    try {
      const results = await searchFriends(searchNickname);
      setSearchResult(results.length > 0 ? results[0] : null); // 첫 번째 결과만 사용
    } catch (error) {
      console.error("친구 검색 실패:", error);
    }
  };

  // 친구 추가
  const handleAddFriend = async () => {
    try {
      const friendData = {
        memberId: memberId, // 실제 로그인한 사용자의 memberId
        friendId: searchResult.id, // 선택된 친구의 ID
      };
      const result = await addFriend(friendData);
      if (result) {
        console.log("친구 추가 성공");
        if (onFriendAdded) onFriendAdded(); // 친구 추가 후 실행할 콜백
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.log("친구를 찾을 수 없습니다.");
      } else {
        console.log("친구 추가 실패");
      }
    }
  };

  return (
    <div className="popup">
      <div className="popup-content">
        <h3>친구 추가</h3>
        {searchResult ? (
          <div className="search-result">
            <img src={searchResult.imageUrl || SampleImage} alt="친구 프로필" />
            <span>{searchResult.nickname}</span>
            <button onClick={handleAddFriend}>추가</button>
          </div>
        ) : (
          <div></div>
        )}
        <input
          type="text"
          placeholder="친구 닉네임 검색"
          value={searchNickname}
          onChange={(e) => setSearchNickname(e.target.value)}
        />
        <div className="button-group">
          <button onClick={handleSearch}>검색</button>
          <button onClick={onClose} className="close-button">
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddFriendPopup;

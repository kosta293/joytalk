import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BottomNav from "../components/BottomNav";
import "../css/Friends.css";
import SampleImage from "../images/profile.png";
import { fetchFriends } from "../api"; // 친구 목록 조회 API
import AddFriendPopup from "../components/AddFriendPopup"; // 친구 추가 팝업 컴포넌트
import { getTokenInfo } from "../utils/jwtUtils";

const Friends = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [nickname, setNickname] = useState("익명");
  const [imageUrl, setImageUrl] = useState(SampleImage);
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false); // 팝업 표시 상태

  useEffect(() => {
    // URL에서 토큰 파라미터 추출
    const params = new URLSearchParams(location.search);
    const token = params.get("token");

    if (token) {
      // 토큰을 로컬 스토리지에 저장
      localStorage.setItem("jwt_token", token);
      console.log(
        "localStorage.jwt_token : ",
        localStorage.getItem("jwt_token")
      );

      // 토큰 저장 후 사용자 정보 확인
      const tokenInfo = getTokenInfo();
      if (!tokenInfo) {
        setError("유효하지 않은 토큰입니다.");
        navigate("/login");
        return;
      }

      // URL에서 토큰 파라미터 제거
      navigate("/Friends", { replace: true });
    }
  }, [location, navigate]);

  // location.state가 있을 경우 닉네임, 이미지 URL 설정
  useEffect(() => {
    if (location.state) {
      setNickname(location.state.nickname || "익명");
      setImageUrl(location.state.imageUrl || SampleImage);
    }
  }, [location.state]);

  // 친구 목록 조회
  const fetchFriendsList = async () => {
    try {
      setLoading(true);
      const tokenInfo = getTokenInfo();

      if (!tokenInfo || !tokenInfo.memberId) {
        setError("로그인이 필요합니다.");
        navigate("/login");
        return;
      }

      const friendsList = await fetchFriends(tokenInfo.memberId);
      setFriends(friendsList);
    } catch (err) {
      setError("친구 목록을 불러오는데 실패했습니다.");
      console.error("에러 : " + err);

      // 인증 관련 에러 처리
      if (err.response?.status === 401) {
        localStorage.removeItem("jwt_token");
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  // 컴포넌트 Mount 시 친구 목록 조회
  useEffect(() => {
    fetchFriendsList();
  }, []);

  // 로딩 상태 표시
  if (loading) {
    return <div>로딩 중...</div>;
  }

  // 에러 상태 표시
  if (error) {
    return <div>{error}</div>;
  }

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

      <div className="friends-body">
        <ul className="friends-list">
          {friends.map((friend) => (
            <li key={friend.id} className="friend-item">
              <img
                src={friend.profileImage || SampleImage}
                alt="친구 프로필"
                className="friend-profile-image"
              />
              <div className="friend-nickname">{friend.nickName}</div>
            </li>
          ))}
        </ul>
      </div>

      {showPopup && (
        <AddFriendPopup
          memberId={getTokenInfo()?.memberId}
          onClose={() => setShowPopup(false)}
          onFriendAdded={fetchFriendsList}
        />
      )}

      <div className="friends-bottom">
        <BottomNav nickname={nickname} imageUrl={imageUrl} />
      </div>
    </div>
  );
};

export default Friends;

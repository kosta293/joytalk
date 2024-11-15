// MyPage.jsx
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BottomNav from "../components/BottomNav";
import "../css/MyPage.css";
import ProfileImageUploader from "../components/ProfileImageUploader"; // 기존 ProfileImageUploader 임포트
import { fetchUserInfo, updateUserInfo } from "../api";
import { getTokenInfo } from "../utils/jwtUtils";

function MyPage() {
  const location = useLocation(); // 이전에 전달된 state 값 가져오기
  const navigate = useNavigate(); // 페이지 이동을 위한 navigate 함수
  // location.state가 존재하면 닉네임과 이미지 URL을 가져오고, 없으면 기본값을 설정
  const [nickname, setNickname] = useState(location.state?.nickname || "익명");
  const [imageUrl, setImageUrl] = useState(location.state?.imageUrl || ""); // 기본 이미지 URL 설정
  const [isEditing, setIsEditing] = useState(false); // 수정 모드 상태 추가
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 사용자 정보 로드
  useEffect(() => {
    const loadUserInfo = async () => {
      try {
        const tokenInfo = getTokenInfo();
        if (!tokenInfo || !tokenInfo.memberId) {
          navigate("/login");
          return;
        }

        setLoading(true);
        const userInfo = await fetchUserInfo(tokenInfo.memberId);
        setNickname(userInfo.nickName);
        setImageUrl(userInfo.profileImage);
      } catch (err) {
        setError("사용자 정보를 불러오는데 실패했습니다.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadUserInfo();
  }, [navigate]);

  // 이미지 변경 시 호출되는 함수
  const handleImageChange = (newImageUrl) => {
    if (isEditing) {
      // 수정 모드일 때만 이미지 변경 가능
      setImageUrl(newImageUrl); // 업로드된 이미지 URL로 상태 업데이트
    }
  };

  // 수정/완료 버튼 핸들러
  const handleUpdate = async () => {
    if (!isEditing) {
      setIsEditing(true);
      return;
    }

    try {
      const tokenInfo = getTokenInfo();
      if (!tokenInfo || !tokenInfo.memberId) {
        navigate("/LogIn");
        return;
      }

      if (!nickname) {
        alert("닉네임을 입력해주세요.");
        return;
      }

      // updateUserInfo에 전달할 데이터 객체 생성
      const updateData = {
        id: tokenInfo.memberId,
        nickName: nickname,
      };

      // imageUrl이 존재하고 비어있지 않은 경우에만 profileImage 추가
      if (imageUrl && imageUrl.trim() !== "") {
        updateData.profileImage = imageUrl;
      }

      await updateUserInfo(updateData);

      setIsEditing(false);
      navigate("/Friends", {
        state: {
          nickname,
          imageUrl: imageUrl || "", // imageUrl이 없는 경우 빈 문자열 전달
        },
      });
    } catch (err) {
      alert("프로필 수정에 실패했습니다.");
      console.error(err);
    }
  };

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="mypage">
      <div className="mypage-header"></div>
      <div className="mypage-container">
        <div
          className={`profile-image-container ${!isEditing ? "disabled" : ""}`}
        >
          <ProfileImageUploader
            onChangeImage={handleImageChange}
            uploadedImage={imageUrl}
            disabled={!isEditing} // ProfileImageUploader에 disabled prop 전달
          />
        </div>
        <input
          type="text"
          className="nickname-input"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="닉네임을 입력하세요"
          disabled={!isEditing} // 수정 모드가 아닐 때는 비활성화
        />
        <div>
          <button className="register-button" onClick={handleUpdate}>
            {isEditing ? "완료" : "수정"} {/* 버튼 텍스트 변경 */}
          </button>
        </div>
      </div>
      <div className="mypage-bottom">
        <BottomNav nickname={nickname} imageUrl={imageUrl} />
      </div>
    </div>
  );
}

export default MyPage;

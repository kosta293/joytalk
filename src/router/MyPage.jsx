// MyPage.jsx
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BottomNav from "../components/BottomNav";
import "../css/MyPage.css";
import ProfileImageUploader from "../components/ProfileImageUploader"; // 기존 ProfileImageUploader 임포트

function MyPage() {
  const location = useLocation(); // 이전에 전달된 state 값 가져오기
  const navigate = useNavigate(); // 페이지 이동을 위한 navigate 함수

  // location.state가 존재하면 닉네임과 이미지 URL을 가져오고, 없으면 기본값을 설정
  const [nickname, setNickname] = useState(location.state?.nickname || "익명");
  const [imageUrl, setImageUrl] = useState(location.state?.imageUrl || ""); // 기본 이미지 URL 설정

  // 이미지 변경 시 호출되는 함수
  const handleImageChange = (newImageUrl) => {
    setImageUrl(newImageUrl); // 업로드된 이미지 URL로 상태 업데이트
  };

  // 수정 완료 버튼 클릭 시 호출되는 함수
  const handleUpdate = () => {
    if (nickname && imageUrl) {
      navigate("/friends", { state: { nickname, imageUrl } }); // 상태와 함께 Friends 페이지로 이동
    } else {
      alert("닉네임과 프로필 이미지를 확인해 주세요.");
    }
  };

  return (
    <div className="mypage">
      <div className="mypage-header"></div>
      <div className="mypage-container">
        {/* ProfileImageUploader를 사용하여 이미지를 수정 */}
        <ProfileImageUploader
          onChangeImage={handleImageChange} // 이미지가 변경되면 호출될 함수
          uploadedImage={imageUrl} // 업로드된 이미지 URL을 전달
        />
        <input
          type="text"
          className="nickname-input"
          value={nickname} // 닉네임 입력 필드의 상태를 연결
          onChange={(e) => setNickname(e.target.value)} // 닉네임 수정
          placeholder="닉네임을 입력하세요"
        />
        <div>
          <button className="register-button" onClick={handleUpdate}>
            수정
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

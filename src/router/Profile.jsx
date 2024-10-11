// Profile.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // useNavigate를 사용하여 페이지 이동
import "../css/Profile.css"; // CSS 파일 임포트
import profileImg from "../images/profile2.png"; // 기본 프로필 이미지 임포트
import ProfileImageUploader from "../components/ProfileImageUploader"; // 이미지 업로더 컴포넌트 임포트
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
  const [nickname, setNickname] = useState(""); // 닉네임 상태
  const navigate = useNavigate(); // 페이지 이동을 위한 navigate 함수
  const [uploadedImage, setUploadedImage] = useState(null); // 업로드된 이미지 상태

  // 등록 버튼 클릭 시 호출되는 함수
  const handleRegister = () => {
    if (nickname) {
      navigate("/Chat", { state: { nickname } }); // 닉네임과 함께 /Chat 페이지로 이동
    } else {
      toast.error("닉네임을 입력해주세요.");
    }
  };

  // 이미지 변경 시 호출되는 함수
  const handleImageChange = (imageUrl) => {
    setUploadedImage(imageUrl); // 업로드된 이미지 URL로 상태 업데이트
  };

  return (
    <div className="profile-container">
      {/* 이미지 업로더 컴포넌트에 이미지 변경 함수와 업로드된 이미지 전달 */}
      <ProfileImageUploader
        onChangeImage={handleImageChange}
        uploadedImage={uploadedImage}
      />
      <input
        type="text"
        placeholder="닉네임"
        className="nickname-input"
        value={nickname} // 닉네임 입력 필드에 상태 연결
        onChange={(e) => setNickname(e.target.value)} // 입력 변경 시 상태 업데이트
      />
      <button
        className="register-button"
        onClick={handleRegister} // 등록 버튼 클릭 시 함수 호출
      >
        등록
      </button>
    </div>
  );
};

export default Profile; // Profile 컴포넌트 내보내기

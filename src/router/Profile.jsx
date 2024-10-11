import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // useNavigate 임포트
import "../css/Profile.css";

const Profile = () => {
  const [nickname, setNickname] = useState("");
  const navigate = useNavigate();

  const handleRegister = () => {
    if (nickname) {
      navigate("/Chat", { state: { nickname } });
    } else {
      alert("닉네임을 입력해주세요.");
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-icon"></div>
      <input
        type="text"
        placeholder="닉네임"
        className="nickname-input"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
      />
      <button
        className="register-button"
        onClick={handleRegister}
        disabled={!nickname}
      >
        등록
      </button>
    </div>
  );
};

export default Profile;

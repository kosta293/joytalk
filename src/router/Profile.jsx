import React from "react";
import { Link } from "react-router-dom";
import "../css/Profile.css";

const Profile = () => {
  return (
    <div className="profile-container">
      <div className="profile-icon"></div>
      <input type="text" placeholder="닉네임" className="nickname-input" />
      <Link to="/Chat">
        <button className="register-button">등록</button>
      </Link>
    </div>
  );
};

export default Profile;

import React from "react";
import "../css/BottomNav.css";
import "./FontAwesome";
import { Link } from "react-router-dom"; // Link 추가
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const BottomNav = ({ nickname, imageUrl }) => {
  return (
    <nav className="wrapper">
      <div>
        <Link
          to="/friends"
          state={{ nickname, imageUrl }} // state로 프로필 정보 전달
          className="nav-friends"
        >
          <FontAwesomeIcon icon="users" />
        </Link>
      </div>
      <div>
        <Link
          to="/chatlist"
          state={{ nickname, imageUrl }} // state로 프로필 정보 전달
          className="nav-chatlist"
        >
          <FontAwesomeIcon icon="comments" />
        </Link>
      </div>
      <div>
        <Link
          to="/mypage"
          state={{ nickname, imageUrl }} // state로 프로필 정보 전달
          className="nav-mypage"
        >
          <FontAwesomeIcon icon="circle-user" />
        </Link>
      </div>
    </nav>
  );
};

export default BottomNav;

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import axios from "axios";
import "../css/LogIn.css";

const LogIn = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    // Spring Security OAuth2 엔드포인트로 리다이렉트
    window.location.href = "http://localhost:8080/oauth2/authorization/google";
  };

  // URL 파라미터에서 토큰을 확인하는 useEffect 추가
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    console.log("jwt_token : ", token);

    if (token) {
      // 토큰을 로컬 스토리지에 저장
      localStorage.setItem("jwt_token", token);
      console.log("jwt_token : ", token);

      // axios 기본 설정에 Authorization 헤더 추가
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      // Friends 페이지로 리다이렉트
      navigate("/Mypage");

      // URL에서 토큰 파라미터 제거
      window.history.replaceState({}, document.title, "/login");
    }
  }, [navigate]);

  return (
    <GoogleOAuthProvider clientId="496426685229-nni0d8e2ajcfee5dj9f42223mr963kel.apps.googleusercontent.com">
      <div className="login-background">
        <div className="login-box">
          Log In
          <div className="login-google">
            <button onClick={handleGoogleLogin} className="google-login-button">
              Google로 로그인
            </button>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default LogIn;

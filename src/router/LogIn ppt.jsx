import React from "react";
import { Link } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import KakaoLogin from "react-kakao-login";  // KakaoLogin 컴포넌트 가져오기
import "../css/LogIn.css";

const LogIn = () => {
  const handleGoogleLoginSuccess = (response) => {
    console.log("Google login success", response);
    const { credential } = response;
    // 백엔드로 구글 로그인 토큰을 보내기
    axios.post('http://localhost:8080/login/google', { token: credential })
  };

  const handleGoogleLoginFailure = (error) => {
    console.log("Google login failed", error);
  };

  const handleKakaoLoginSuccess = (response) => {
    console.log("Kakao login success", response);
    const { access_token } = response;
    // 백엔드로 카카오 로그인 토큰을 보내기
    axios.post('http://localhost:8080/login/kakao', { token: access_token })
  };

  const handleKakaoLoginFailure = (error) => {
    console.log("Kakao login failed", error);
  };

  return (
    <GoogleOAuthProvider clientId="496426685229-nni0d8e2ajcfee5dj9f42223mr963kel.apps.googleusercontent.com">
      <div className="login-background">
        <div className="login-box">
          Log In
          {/* Google Login Button */}
          <div className="login-google">
            <GoogleLogin
              onSuccess={handleGoogleLoginSuccess}
              onError={handleGoogleLoginFailure}
            />
          </div>

          {/* Kakao Login Button */}
          <div className="login-kakao">
            <KakaoLogin
              token="YOUR_KAKAO_APP_KEY"  // 카카오 앱 키 입력
              onSuccess={handleKakaoLoginSuccess}
              onFailure={handleKakaoLoginFailure}
              render={(props) => (
                <button {...props}>카카오로 로그인</button>
              )}
            />
          </div>

          {/* <Link to="/Profile">
            <button type="loginbutton">로그인</button>
          </Link> */}
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default LogIn;

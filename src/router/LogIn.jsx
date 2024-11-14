import React from "react";
import { Link } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import "../css/LogIn.css";

const LogIn = () => {
  const handleGoogleLoginSuccess = (response) => {
    console.log("Google login success", response);
    // 여기서 토큰을 받아와 서버에 보내거나, 사용자의 정보를 처리할 수 있다.
  };

  const handleGoogleLoginFailure = (error) => {
    console.log("Google login failed", error);
  };

  return (
    <GoogleOAuthProvider clientId="496426685229-nni0d8e2ajcfee5dj9f42223mr963kel.apps.googleusercontent.com">
      <div className="login-background">
        <div className="login-box">
          Log In
          {/*Google Login Button*/}
          <div className="login-google">
            <GoogleLogin
              onSuccess={handleGoogleLoginSuccess}
              onError={handleGoogleLoginFailure}
            />
          </div>
          {/*Kakao Login Button*/}
          <Link to="/Profile">
            <button type="loginbutton">로그인</button>
          </Link>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default LogIn;

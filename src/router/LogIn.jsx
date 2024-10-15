import React from "react";
import {Link} from "react-router-dom"; // Link import
import {GoogleOAuthProvider, GoogleLogin} from '@react-oauth/google';
import "../css/LogIn.css";

const LogIn = () => {
    const handleGoogleLoginSuccess = (response) => {
        console.log('Google login success', response);
        // 여기서 토큰을 받아와 서버에 보내거나, 사용자의 정보를 처리할 수 있다.
    };

    const handleGoogleLoginFailure = (error) => {
        console.log('Google login failed', error);
    };


    return (
        <GoogleOAuthProvider clientId="496426685229-nni0d8e2ajcfee5dj9f42223mr963kel.apps.googleusercontent.com">
            <div>
                <h2>Log In Page</h2>
                <form>
                    <div>
                        email:
                        <input type="email" required/>
                    </div>
                    <div>
                        pw:
                        <input type="password" required/>
                    </div>
                    <Link to="/Profile">
                        <button type="loginbutton">Log In</button>
                    </Link>
                </form>

                {/*Google Login Button*/}
                <GoogleLogin
                    onSuccess={handleGoogleLoginSuccess}
                    onError={handleGoogleLoginFailure}
                />
            </div>
        </GoogleOAuthProvider>
    );
};

export default LogIn;
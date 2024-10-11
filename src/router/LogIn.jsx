import React from "react";
import { Link } from "react-router-dom"; // Link import
import "../css/LogIn.css";

const LogIn = () => {
  return (
    <div>
      <h2>Log In Page</h2>
      <form>
        <div>
          email:
          <input type="email" required />
        </div>
        <div>
          pw:
          <input type="password" required />
        </div>
        <Link to="/Profile">
          <button type="loginbutton">Log In</button>
        </Link>
      </form>
    </div>
  );
};

export default LogIn;
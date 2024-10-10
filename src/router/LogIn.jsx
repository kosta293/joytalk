import React from "react";
import { Link } from "react-router-dom"; // Link import
import "../css/LogIn.css";

const LogIn = () => {
  return (
    <div>
      <h2>Log In Page</h2>
      <form>
        <label>
          email:
          <input type="email" required />
        </label>
        <label>
          pw:
          <input type="password" required />
        </label>
        <Link to="/Profile">
          <button type="loginbutton">Log In</button>
        </Link>
      </form>
    </div>
  );
};

export default LogIn;

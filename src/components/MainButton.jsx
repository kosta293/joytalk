import { Link } from "react-router-dom";
import "../css/MainButton.css";
import LogIn from "../router/LogIn";

const MainButton = () => {
  return (
    <>
      <Link className="link" to="/LogIn">
        <div className="MainButton">
          <button className="SignInButton">Log In</button>
        </div>
      </Link>
    </>
  );
};

export default MainButton;

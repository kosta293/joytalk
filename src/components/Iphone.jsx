import React from "react";
import "../css/Iphone.css";

function Iphone({ children }) {
  return (
    <div className="phone">
      <div className="content">{children}</div>
    </div>
  );
}

export default Iphone;

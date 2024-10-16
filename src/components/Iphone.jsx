import React from "react";
import "../css/Iphone.css";

function Iphone({ children }) {
  return (
    <div className="phone-container">
      
    <div className="volume-buttons"></div> 
    <div className="power-button"></div> 
    <div className="phone-edge">
    <div className="phone">
    <div className="phone-top">
      <div className="phone-speaker"></div>
      <div className="phone-camera"></div>
      <div className="phone-lens"></div>
    </div>
      <div className="content">{children}</div> {/* 컨텐츠는 그대로 유지 */}
    </div>
    </div>
  </div>
  );
}

export default Iphone;

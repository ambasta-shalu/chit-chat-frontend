import React from "react";
import "../css/Logo.css";
import { useNavigate } from "react-router-dom";
import CHAT_IMG from "../assets/chat-img.png";

function Logo() {
  const navigate = useNavigate();

  const handleClick = function () {
    navigate("/");
  };

  return (
    <div className="logo">
      <div className="logo__content">
        <div className="logo__img" onClick={handleClick}>
          <img src={CHAT_IMG} alt="Chat Logo Img" />
        </div>
        <h1 className="nowrap logo__title" onClick={handleClick}>
          CHIT CHAT
        </h1>
      </div>
    </div>
  );
}

export default Logo;

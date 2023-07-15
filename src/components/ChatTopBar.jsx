import React from "react";
import "../css/ChatTopBar.css";
import Logo from "./Logo";
import { useNavigate } from "react-router-dom";

function ChatTopBar() {
  const navigate = useNavigate();

  const handleClick = function () {
    navigate("/");
  };

  return (
    <div className="chat__topbar">
      <Logo />
      <button className="nowrap chat__leave__btn" onClick={handleClick}>
        Leave Room
      </button>
    </div>
  );
}

export default ChatTopBar;

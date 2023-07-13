import React from "react";
import "../css/ChatTopBar.css";
import CHAT_IMG from "../assets/chat-img.png";

function ChatTopBar() {
  return (
    <div className="chat__topbar">
      <div className="chat__logo">
        <div className="chat__logo__img">
          <img src={CHAT_IMG} alt="Chat Logo Img" />
        </div>
        <h1 className="nowrap chat__logo__title">CHIT CHAT</h1>
      </div>
      <button className="chat__leave__btn">Leave Room</button>
    </div>
  );
}

export default ChatTopBar;

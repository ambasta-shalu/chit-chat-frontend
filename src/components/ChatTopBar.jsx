import React from "react";
import "../css/ChatTopBar.css";
import { useNavigate } from "react-router-dom";
import copy from "copy-to-clipboard";
import { toast } from "react-hot-toast";

function ChatTopBar(props) {
  const { ROOM_CODE, typingStatus, isSomeoneTyping } = props;
  const navigate = useNavigate();

  const handleCopy = () => {
    copy(`${ROOM_CODE}`);
    toast.success("Room Code Copied! 📋");
  };

  const handleLeave = function () {
    navigate("/");
  };

  return (
    <div className="chat__topbar">
      <div className="chat__typing">{isSomeoneTyping && typingStatus}</div>
      <div className="chat__btns">
        <button className="nowrap chat__invite__btn" onClick={handleCopy}>
          Invite Other
        </button>
        <button className="nowrap chat__leave__btn" onClick={handleLeave}>
          Leave Room
        </button>
      </div>
    </div>
  );
}

export default ChatTopBar;

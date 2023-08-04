import React from "react";
import "../css/ChatTopBar.css";
import { useNavigate } from "react-router-dom";
import copy from "copy-to-clipboard";
import { toast } from "react-hot-toast";
import { HiShare } from "react-icons/hi";
import { RxExit } from "react-icons/rx";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";

function ChatTopBar(props) {
  const { ROOM_CODE } = props;
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
      <div className="chat__btns">
        <HiShare
          className="chat__icons"
          onClick={handleCopy}
          title="Invite Others"
        />
        <RxExit
          className="chat__icons"
          onClick={handleLeave}
          title="Leave Room"
        />
        <PiDotsThreeOutlineVerticalFill
          className="chat__icons"
          title="More Options"
        />
      </div>
    </div>
  );
}

export default ChatTopBar;

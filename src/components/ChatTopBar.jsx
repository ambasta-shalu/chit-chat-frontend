import React, { useState } from "react";
import "../css/ChatTopBar.css";
import { useNavigate } from "react-router-dom";
import copy from "copy-to-clipboard";
import { toast } from "react-hot-toast";
import { HiShare } from "react-icons/hi";
import { RxExit } from "react-icons/rx";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { IoIosCall } from "react-icons/io";
import { FaVideo } from "react-icons/fa";

function ChatTopBar(props) {
  const { ROOM_CODE } = props;

  const navigate = useNavigate();
  const [isDivVisible, setIsDivVisible] = useState(false);

  const handleCopy = () => {
    copy(`${ROOM_CODE}`);
    toast.success("Room Code Copied! 📋");
  };

  const handleLeave = function () {
    navigate("/");
  };

  const handleOptionsClick = function () {
    // TOGGLE TOPBAR__FLOAT__MENU DIV VISIBILITY
    setIsDivVisible((prevVisibility) => !prevVisibility);
  };

  const handleVoiceCall = function () {
    toast.error(`Voice call feature is in development mode. 😬`);
    setIsDivVisible(false);
  };

  const handleVideoCall = function () {
    toast.error(`Video call feature is in development mode. 😬`);
    setIsDivVisible(false);
  };

  return (
    <div className="chat__topbar">
      <div className="topbar__btns">
        <div>
          <HiShare
            className="topbar__icons"
            onClick={handleCopy}
            title="Share Room Code"
          />
        </div>

        <div>
          <RxExit
            className="topbar__icons"
            onClick={handleLeave}
            title="Leave Room"
          />
        </div>

        <div className="topbar__attachment__menu">
          <PiDotsThreeOutlineVerticalFill
            className="topbar__icons"
            title="More Options"
            onClick={handleOptionsClick}
          />

          {isDivVisible && (
            <div className="topbar__float__menu">
              <p className="nowrap voice__call" onClick={handleVoiceCall}>
                <IoIosCall className="call__icon" />
                Voice Call
              </p>

              <p className="nowrap video__call" onClick={handleVideoCall}>
                <FaVideo className="call__icon" /> Video Call
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChatTopBar;

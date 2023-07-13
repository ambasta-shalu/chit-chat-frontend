import React from "react";
import "../css/RoomDetail.css";
import { AiFillHome } from "react-icons/ai";
import { FaCopy } from "react-icons/fa";
import copy from "copy-to-clipboard";
import { Toaster, toast } from "react-hot-toast";

function RoomDetail(props) {
  const { ROOM_CODE } = props;

  const handleCopy = () => {
    copy(`${ROOM_CODE}`);
    toast.success("Copied to Clipboard! 📋");
  };

  return (
    <div className="room__detail">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="room__header">
        <AiFillHome className="room__icon" />
        <h1 className="nowrap">Room Code</h1>
      </div>
      <div className="room__code">
        <p className="nowrap" onClick={handleCopy}>
          {ROOM_CODE}
        </p>
        {ROOM_CODE && <FaCopy className="copy__icon" onClick={handleCopy} />}
      </div>
    </div>
  );
}

export default RoomDetail;

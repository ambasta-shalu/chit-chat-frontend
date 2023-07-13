import React from "react";
import "../css/RoomDetail.css";
import { AiFillHome } from "react-icons/ai";
import { FaCopy } from "react-icons/fa";

function RoomDetail(props) {
  const { ROOM_CODE } = props;
  return (
    <div className="room__detail">
      <div className="room__header">
        <AiFillHome className="room__icon" />
        <h1 className="nowrap">Room Code</h1>
      </div>
      <div className="room__code">
        <p className="nowrap">{ROOM_CODE}</p>
        {ROOM_CODE && <FaCopy className="copy__icon" />}
      </div>
    </div>
  );
}

export default RoomDetail;

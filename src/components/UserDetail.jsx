import React from "react";
import "../css/UserDetail.css";
import { FaUserSecret } from "react-icons/fa";

function UserDetail() {
  return (
    <div className="user__detail">
      <div className="user__header">
        <FaUserSecret className="user__icon" />
        <h1 className="nowrap">Room Users</h1>
      </div>
      <div className="user__names">
        <p>Lorem Ipsum</p>
        <p>Ipsum Lorem lorem</p>
        <p>Miss Sanyukta Ambastaaaaa</p>
      </div>
    </div>
  );
}

export default UserDetail;

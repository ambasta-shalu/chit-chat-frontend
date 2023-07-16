import React from "react";
import "../css/UserDetail.css";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

function UserDetail(props) {
  const { userList } = props;
  const navigate = useNavigate();

  const handleClick = function () {
    navigate("/");
  };

  return (
    <div className="user__detail">
      <div className="user__header">
        <BiArrowBack className="arrow__icon" onClick={handleClick} />
        <h1 className="nowrap">
          {userList.length > 1
            ? userList.length + " Members"
            : userList.length + " Member"}
        </h1>
      </div>
      <div className="user__names">
        {userList.map((it, index) => (
          <p key={index}>{it}</p>
        ))}
      </div>
    </div>
  );
}

export default UserDetail;

import React from "react";
import "../css/MessageItem.css";

function MessageItem(props) {
  const { isAuthor, data } = props;

  return (
    <div
      className={isAuthor === "you" ? "you message_item" : "other message_item"}
    >
      <div className="item__author">
        {isAuthor === "you" ? "You" : data.USER_NAME}
      </div>
      <div className="item__msg">{data.MESSAGE}</div>
      <div className="item__time">{data.TIME}</div>
    </div>
  );
}

export default MessageItem;

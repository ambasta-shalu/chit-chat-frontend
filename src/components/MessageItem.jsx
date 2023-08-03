import React from "react";
import "../css/MessageItem.css";

function MessageItem(props) {
  const { isAuthor, data } = props;

  return (
    <div
      className={isAuthor === "you" ? "you media__item" : "other media__item"}
    >
      <div className="item__author">
        {isAuthor === "you" ? "You" : data.USER_NAME}
      </div>
      <div className="item__content content">{data.CONTENT}</div>
      <div className="item__time">{data.TIME}</div>
    </div>
  );
}

export default MessageItem;

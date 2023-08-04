import React from "react";
import "../css/MessageItem.css";

function MessageItem(props) {
  const { isAuthor, data } = props;

  return (
    <div className={`media__item ${isAuthor === "you" ? "you" : "other"}`}>
      <div className="item__meta__data">
        <div className="item__author">
          {isAuthor === "you" ? "You" : data.USER_NAME}
        </div>
        <div className="item__time">{data.TIME}</div>
      </div>
      <div className="item__content content">{data.CONTENT}</div>
    </div>
  );
}

export default MessageItem;

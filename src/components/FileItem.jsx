import React from "react";
import "../css/FileItem.css";
import { handleDownloadMedia } from "../helper/HandleDownloadMedia";
import { BsDownload } from "react-icons/bs";

function FileItem(props) {
  const { isAuthor, data } = props;

  return (
    <div
      className={isAuthor === "you" ? "you media__item" : "other media__item"}
    >
      <div className="item__author">
        {isAuthor === "you" ? "You" : data.USER_NAME}
      </div>

      <div className="file__content content">
        <div
          className="download__icon__wrapper"
          onClick={() => handleDownloadMedia(data)}
        >
          <BsDownload className="download__icon" />
        </div>
        <div>
          <div>{data.CONTENT_NAME}</div>
          <div className="file__size">{data.CONTENT_SIZE}</div>
        </div>
      </div>

      <div className="item__time">{data.TIME}</div>
    </div>
  );
}

export default FileItem;

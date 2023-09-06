import React from "react";
import "../css/PictureItem.css";
import { handleDownloadMedia } from "../helper/HandleDownloadMedia";
import { BsDownload } from "react-icons/bs";

function PictureItem(props) {
  const { isAuthor, data } = props;

  return (
    <div className={`media__item ${isAuthor === "you" ? "you" : "other"}`}>
      <div className="item__meta__data">
        <div className="item__author">
          {isAuthor === "you" ? "You" : data.USER_NAME}
        </div>
        <div className="item__time">{data.TIME}</div>
        <div className="file__size">{data.CONTENT_SIZE}</div>
      </div>

      <div className="picture__content">
        <div
          className="download__icon__wrapper "
          onClick={() => handleDownloadMedia(data)}
        >
          <BsDownload className="download__icon" />
        </div>

        <div className="picture">
          <img
            src={`data:image/jpeg;base64,${data.CONTENTBASE64}`} // USE THE BASE64 DATA TO DISPLAY THE IMAGE
            alt={data.CONTENT_NAME}
          />
        </div>
      </div>
    </div>
  );
}

export default PictureItem;

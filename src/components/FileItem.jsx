import React from "react";
import "../css/FileItem.css";
import axios from "axios";
import { SERVER_DOMAIN } from "../utils/Constants";
import { Toaster, toast } from "react-hot-toast";
import { downloadMedia } from "../helper/DownloadMedia";
import { ImArrowDown2 } from "react-icons/im";

function FileItem(props) {
  const { isAuthor, data } = props;

  // Make an Axios GET request to download the file
  const handleDownload = async () => {
    try {
      const response = await axios.get(
        `${SERVER_DOMAIN}/download/${data.UNIQUE_NAME}`,
        { responseType: "blob" }
      );

      // Create a Blob from the response data
      const blob = new Blob([response.data], {
        type: response.headers["content-type"],
      });

      // download media
      downloadMedia(blob, data);
    } catch (error) {
      // handle error
      toast.error(error.message);
      console.error(`${error?.response?.data || error.message}`);
    }
  };

  return (
    <div className={isAuthor === "you" ? "you file__item" : "other file__item"}>
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="item__author">
        {isAuthor === "you" ? "You" : data.USER_NAME}
      </div>

      <div className="file__content">
        <div className="item__download" onClick={handleDownload}>
          <ImArrowDown2 className="download__icon" />
        </div>
        <div>
          <div>{data.CONTENT_NAME}</div>
          <div className="file__size">0 MB</div>
        </div>
      </div>

      <div className="item__time">{data.TIME}</div>
    </div>
  );
}

export default FileItem;

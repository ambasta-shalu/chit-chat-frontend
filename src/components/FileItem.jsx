import React from "react";
import "../css/FileItem.css";
import axios from "axios";
import { SERVER_DOMAIN } from "../utils/Constants";
import { Toaster, toast } from "react-hot-toast";
import { downloadMedia } from "../helper/DownloadMedia";

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
    <div onClick={handleDownload} className="file">
      file item
    </div>
  );
}

export default FileItem;

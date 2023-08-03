import axios from "axios";
import { SERVER_DOMAIN } from "../utils/Constants";
import { toast } from "react-hot-toast";

// Create a download link to save media to device
function saveMediaToDevice(blob, data) {
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.href = url;
  link.download = data.CONTENT_NAME;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// ****************************************************************************************************************

// Make an Axios GET request to download the file
export async function handleDownloadMedia(data) {
  try {
    const response = await axios.get(
      `${SERVER_DOMAIN}/download/${data.UNIQUE_NAME}`,
      { responseType: "blob" }
    );

    // Create a Blob from the response data
    const blob = new Blob([response.data], {
      type: response.headers["content-type"],
    });

    // save media
    saveMediaToDevice(blob, data);
  } catch (error) {
    // handle error
    toast.error(error.message);
    console.error(`${error?.response?.data || error.message}`);
  }
}

import axios from "axios";
import { SERVER_DOMAIN } from "../utils/Constants";
import { toast } from "react-hot-toast";

// CREATE A DOWNLOAD LINK TO SAVE MEDIA TO DEVICE
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

// MAKE AN AXIOS GET REQUEST TO DOWNLOAD THE FILE
export async function handleDownloadMedia(data) {
  try {
    const response = await axios.get(
      `${SERVER_DOMAIN}/download/${data.UNIQUE_NAME}`,
      {
        responseType: "blob",
        params: {
          ROOM_CODE: data.ROOM_CODE,
        },
      }
    );

    // CREATE A BLOB FROM THE RESPONSE DATA
    const blob = new Blob([response.data], {
      type: response.headers["content-type"],
    });

    // SAVE MEDIA
    saveMediaToDevice(blob, data);
  } catch (error) {
    // HANDLE ERROR
    toast.error(error.message);
    console.error(`${error?.response?.data || error.message}`);
  }
}

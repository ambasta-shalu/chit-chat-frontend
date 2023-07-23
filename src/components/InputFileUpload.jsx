import React, { forwardRef } from "react";

// Wrap the component using forwardRef
const InputFileUpload = forwardRef((props, ref) => {
  const {
    handleFileChange,
    handlePictureChange,
    handleVideoChange,
    handleAudioChange,
  } = props;

  const { fileInputRef, pictureInputRef, videoInputRef, audioInputRef } = ref;

  return (
    <div>
      <input
        type="file"
        accept=".doc,.docx,.xml,.txt,.pdf"
        ref={fileInputRef} // Use the forwarded ref
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      <input
        type="file"
        accept="image/*,.gif"
        ref={pictureInputRef} // Use the forwarded ref
        style={{ display: "none" }}
        onChange={handlePictureChange}
      />

      <input
        type="file"
        accept="video/mp4,video/webm,video/ogg,image/gif"
        ref={videoInputRef} // Use the forwarded ref
        style={{ display: "none" }}
        onChange={handleVideoChange}
      />

      <input
        type="file"
        accept="audio/mpeg,audio/ogg,audio/wav,audio/webm"
        ref={audioInputRef} // Use the forwarded ref
        style={{ display: "none" }}
        onChange={handleAudioChange}
      />
    </div>
  );
});

export default InputFileUpload;

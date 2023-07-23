import React, { forwardRef } from "react";

// Wrap the component using forwardRef
const InputFileUpload = forwardRef((props, ref) => {
  const {
    handleFileChange,
    handlePictureChange,
    handleVideoChange,
    handleAudioChange,
  } = props;

  return (
    <div>
      <input
        type="file"
        accept=".doc,.docx,.xml,.txt,.pdf"
        ref={ref.fileInputRef.current} // Use the forwarded ref
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      <input
        type="file"
        accept="image/*,.gif"
        ref={ref.pictureInputRef.current} // Use the forwarded ref
        style={{ display: "none" }}
        onChange={handlePictureChange}
      />

      <input
        type="file"
        accept="video/mp4,video/webm,video/ogg,image/gif"
        ref={ref.videoInputRef.current} // Use the forwarded ref
        style={{ display: "none" }}
        onChange={handleVideoChange}
      />

      <input
        type="file"
        accept="audio/mpeg,audio/ogg,audio/wav,audio/webm"
        ref={ref.audioInputRef.current} // Use the forwarded ref
        style={{ display: "none" }}
        onChange={handleAudioChange}
      />
    </div>
  );
});

export default InputFileUpload;

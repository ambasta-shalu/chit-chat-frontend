import React from "react";

function InputFileUpload(props) {
  const {
    fileInputRef,
    handleFileChange,
    pictureInputRef,
    handlePictureChange,
    videoInputRef,
    handleVideoChange,
    audioInputRef,
    handleAudioChange,
  } = props;

  return (
    <div>
      <input
        type="file"
        accept=".doc,.docx,.xml,.txt,.pdf"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      <input
        type="file"
        accept="image/*,.gif"
        ref={pictureInputRef}
        style={{ display: "none" }}
        onChange={handlePictureChange}
      />

      <input
        type="file"
        accept="video/mp4,video/webm,video/ogg,image/gif"
        ref={videoInputRef}
        style={{ display: "none" }}
        onChange={handleVideoChange}
      />

      <input
        type="file"
        accept="audio/mpeg,audio/ogg,audio/wav,audio/webm"
        ref={audioInputRef}
        style={{ display: "none" }}
        onChange={handleAudioChange}
      />
    </div>
  );
}

export default InputFileUpload;

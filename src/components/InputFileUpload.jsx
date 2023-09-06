import React, { forwardRef } from "react";

// WRAP THE COMPONENT USING FORWARDREF
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
        ref={fileInputRef} // USE THE FORWARDED REF
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      <input
        type="file"
        accept="image/*,.gif"
        ref={pictureInputRef} // USE THE FORWARDED REF
        style={{ display: "none" }}
        onChange={handlePictureChange}
      />

      <input
        type="file"
        accept="video/mp4,video/webm,video/ogg"
        ref={videoInputRef} // USE THE FORWARDED REF
        style={{ display: "none" }}
        onChange={handleVideoChange}
      />

      <input
        type="file"
        accept="audio/mpeg,audio/ogg,audio/wav,audio/webm"
        ref={audioInputRef} // USE THE FORWARDED REF
        style={{ display: "none" }}
        onChange={handleAudioChange}
      />
    </div>
  );
});

export default InputFileUpload;

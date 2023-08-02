import React, { useEffect, useRef, useState } from "react";
import "../css/ChatRoomPage.css";

import ChatTopBar from "../components/ChatTopBar";
import UserDetail from "../components/UserDetail";
import MessageItem from "../components/MessageItem";
import FileItem from "../components/FileItem";
import PictureItem from "../components/PictureItem";
import VideoItem from "../components/VideoItem";
import AudioItem from "../components/AudioItem";
import ShowToast from "../components/ShowToast";
import InputFileUpload from "../components/InputFileUpload";

import { Toaster, toast } from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";

import { socket } from "../socket/ConnectSocket";
import { getTime } from "../helper/GetTime";

import { BiSolidSend } from "react-icons/bi";
import { LuPaperclip } from "react-icons/lu";
import { IoMdDocument, IoMdHeadset } from "react-icons/io";
import { AiFillPicture } from "react-icons/ai";
import { PiPlayFill } from "react-icons/pi";

import {
  onConnectEvent,
  onDisconnectEvent,
  onJoinRoomEvent,
  onToastEvent,
  onErrorEvent,
  onSendMessageEvent,
  onReceiveMessageEvent,
  onGetRoomUsersEvent,
  onReceiveRoomUsersEvent,
  onSendStartTypingEvent,
  onSendStopTypingEvent,
  onGetStartTypingEvent,
  onGetStopTypingEvent,
} from "../socket/SocketEvents";

import {
  allowedFileTypes,
  allowedPictureTypes,
  allowedVideoTypes,
  allowedAudioTypes,
} from "../utils/AllowedInputTypes";
import { getFileSize } from "../helper/CalculateFileSize";

function ChatRoomPage() {
  let IS_NEW_ROOM, USER_NAME, USER_ID, ROOM_CODE;

  const navigate = useNavigate();
  const location = useLocation();

  if (location.state === null) {
    toast.error(`Not a Auth user`);
    navigate("/");
  } else {
    IS_NEW_ROOM = location.state.IS_NEW_ROOM;
    USER_NAME = location.state.USER_NAME;
    USER_ID = location.state.USER_ID;
    ROOM_CODE = location.state.ROOM_CODE;
  }

  const [messageList, setMessageList] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [userList, setUserList] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [typingStatus, setTypingStatus] = useState("");
  const [isSomeoneTyping, setIsSomeoneTyping] = useState(false);
  const [isDivVisible, setIsDivVisible] = useState(false);

  const scrollRef = useRef(null);
  const fileInputRef = useRef(null);
  const pictureInputRef = useRef(null);
  const videoInputRef = useRef(null);
  const audioInputRef = useRef(null);

  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedPicture, setSelectedPicture] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedAudio, setSelectedAudio] = useState(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behaviour: "smooth" });
    }
  }, [messageList]);

  useEffect(() => {
    socket.on("connect", () => onConnectEvent(socket, setIsConnected));
    socket.emit(
      "joinRoomEvent",
      onJoinRoomEvent(IS_NEW_ROOM, USER_NAME, USER_ID, ROOM_CODE)
    );
    socket.on("toastEvent", (msg) => onToastEvent(msg, setMessageList));
    socket.on("errorEvent", (msg) => onErrorEvent(msg, navigate));
    socket.on("receiveMessageEvent", (data) =>
      onReceiveMessageEvent(data, setMessageList)
    );
    socket.emit("getRoomUsersEvent", onGetRoomUsersEvent(ROOM_CODE));
    socket.on("receiveRoomUsersEvent", (data) =>
      onReceiveRoomUsersEvent(data, setUserList)
    );
    socket.on("getStartTypingEvent", (name) =>
      onGetStartTypingEvent(name, setTypingStatus, setIsSomeoneTyping)
    );
    socket.on("getStopTypingEvent", (name) =>
      onGetStopTypingEvent(name, setTypingStatus, setIsSomeoneTyping)
    );
    socket.on("disconnect", () => onDisconnectEvent(socket, setIsConnected));

    return () => {
      // Clean up event listeners when the component unmounts

      socket.off("connect", () => onConnectEvent(socket, setIsConnected));
      socket.off("toastEvent", (msg) => onToastEvent(msg, setMessageList));
      socket.off("errorEvent", (msg) => onErrorEvent(msg, navigate));
      socket.off("receiveMessageEvent", (data) =>
        onReceiveMessageEvent(data, setMessageList)
      );
      socket.off("receiveRoomUsersEvent", (data) =>
        onReceiveRoomUsersEvent(data, setUserList)
      );
      socket.off("getStartTypingEvent", (name) =>
        onGetStartTypingEvent(name, setTypingStatus, setIsSomeoneTyping)
      );
      socket.off("getStopTypingEvent", (name) =>
        onGetStopTypingEvent(name, setTypingStatus, setIsSomeoneTyping)
      );
      socket.off("disconnect", () => onDisconnectEvent(socket, setIsConnected));
    };
  }, []);

  const handleFileIconClick = function () {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && allowedFileTypes.includes(file.type)) {
      setSelectedFile(file);

      const FILE_SIZE = getFileSize(file.size);
      const TIME = getTime(new Date());

      socket.emit(
        "sendMessageEvent",
        onSendMessageEvent(
          "FILE",
          USER_NAME,
          USER_ID,
          ROOM_CODE,
          file,
          file.name,
          FILE_SIZE,
          TIME
        )
      );
      setSelectedFile(null); // Reset the selected file
    } else {
      setSelectedFile(null);
      // Optionally show an error message or provide feedback to the user.
      toast.error(
        `Invalid file type. Please select a .doc, .docx, .xml, .txt, or .pdf file. 😑`
      );
    }
    setIsDivVisible(false);
  };

  const handlePictureIconClick = function () {
    pictureInputRef.current?.click();
  };

  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    if (file && allowedPictureTypes.includes(file.type)) {
      setSelectedPicture(URL.createObjectURL(file));
    } else {
      setSelectedPicture(null);
      // Optionally show an error message or provide feedback to the user.
      toast.error(
        `Invalid file type. Please select an image (JPEG, PNG, SVG) or GIF file. 😑`
      );
    }
    setIsDivVisible(false);
  };

  const handleVideoIconClick = function () {
    videoInputRef.current?.click();
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file && allowedVideoTypes.includes(file.type)) {
      setSelectedVideo(URL.createObjectURL(file));
    } else {
      setSelectedVideo(null);
      // Optionally show an error message or provide feedback to the user.
      toast.error(
        `Invalid file type. Please select a video (MP4, WebM, Ogg) file. 😑`
      );
    }
    setIsDivVisible(false);
  };

  const handleAudioIconClick = function () {
    audioInputRef.current?.click();
  };

  const handleAudioChange = (e) => {
    const file = e.target.files[0];
    if (file && allowedAudioTypes.includes(file.type)) {
      setSelectedAudio(URL.createObjectURL(file));
    } else {
      setSelectedAudio(null);
      // Optionally show an error message or provide feedback to the user.
      toast.error(
        `Invalid file type. Please select an audio file (MP3, Ogg, WAV, WebM) file. 😑`
      );
    }
    setIsDivVisible(false);
  };

  const handleClipClick = function () {
    // toggle chatroom__float__menu div visibility
    setIsDivVisible((prevVisibility) => !prevVisibility);
  };

  const handleInputKeyDown = function (e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  const handleSendMessage = function (e) {
    e.preventDefault();
    if (newMessage.trim() !== "") {
      const TIME = getTime(new Date());

      const data = {
        TYPE: "MESSAGE",
        USER_NAME: USER_NAME,
        USER_ID: USER_ID,
        ROOM_CODE: ROOM_CODE,
        CONTENT: newMessage,
        CONTENT_NAME: "",
        CONTENT_SIZE: "",
        TIME: TIME,
      };

      setMessageList((prevData) => [...prevData, data]);

      socket.emit(
        "sendMessageEvent",
        onSendMessageEvent(
          "MESSAGE",
          USER_NAME,
          USER_ID,
          ROOM_CODE,
          newMessage,
          "",
          "",
          TIME
        )
      );
      setNewMessage("");
      setIsDivVisible(false);
    }
  };

  // Function to emit startTyping event
  const startTyping = () => {
    if (!isTyping) {
      socket.emit(
        "sendStartTypingEvent",
        onSendStartTypingEvent(USER_NAME, ROOM_CODE)
      );
      setIsTyping(true);
    }
  };

  // Function to emit stopTyping event
  const stopTyping = () => {
    if (isTyping) {
      socket.emit(
        "sendStopTypingEvent",
        onSendStopTypingEvent(USER_NAME, ROOM_CODE)
      );
      setIsTyping(false);
    }
  };

  return (
    <div className="chatroom__page">
      <Toaster position="top-center" reverseOrder={false}></Toaster>

      <div className="chatroom__menu">
        <UserDetail userList={userList} USER_ID={USER_ID} />
      </div>

      <div className="chatroom__contents">
        <div>
          <ChatTopBar
            ROOM_CODE={ROOM_CODE}
            typingStatus={typingStatus}
            isSomeoneTyping={isSomeoneTyping}
          />

          <div className="chatroom__box">
            {messageList.map((data, index) =>
              typeof data === "object" ? (
                <div key={index} ref={scrollRef}>
                  {(() => {
                    switch (data.TYPE) {
                      case "MESSAGE":
                        return (
                          <MessageItem
                            isAuthor={
                              USER_ID === data.USER_ID ? "you" : "other"
                            }
                            data={data}
                          />
                        );

                      case "FILE":
                        return (
                          <FileItem
                            isAuthor={
                              USER_ID === data.USER_ID ? "you" : "other"
                            }
                            data={data}
                          />
                        );

                      case "PICTURE":
                        return (
                          <PictureItem
                            isAuthor={
                              USER_ID === data.USER_ID ? "you" : "other"
                            }
                            data={data}
                          />
                        );

                      case "VIDEO":
                        return (
                          <VideoItem
                            isAuthor={
                              USER_ID === data.USER_ID ? "you" : "other"
                            }
                            data={data}
                          />
                        );

                      case "AUDIO":
                        return (
                          <AudioItem
                            isAuthor={
                              USER_ID === data.USER_ID ? "you" : "other"
                            }
                            data={data}
                          />
                        );
                    }
                  })()}
                </div>
              ) : (
                <ShowToast key={index} data={data} />
              )
            )}
          </div>
        </div>

        <div className="chatroom__input">
          <div className="chatroom__attachment__menu">
            {isDivVisible && (
              <div className="chatroom__float__menu">
                <div
                  className="wrapper file__wrapper"
                  title="File"
                  onClick={handleFileIconClick}
                >
                  <IoMdDocument className="icon" />
                </div>
                <div
                  className="wrapper picture__wrapper"
                  title="Picture"
                  onClick={handlePictureIconClick}
                >
                  <AiFillPicture className="icon" />
                </div>
                <div
                  className="wrapper video__wrapper"
                  title="Video"
                  onClick={handleVideoIconClick}
                >
                  <PiPlayFill className="icon" />
                </div>
                <div
                  className="wrapper audio__wrapper"
                  title="Audio"
                  onClick={handleAudioIconClick}
                >
                  <IoMdHeadset className="icon" />
                </div>
              </div>
            )}

            <div className="chatroom__clip" onClick={handleClipClick}>
              <LuPaperclip className="clip__icon" />
            </div>
          </div>
          <textarea
            className="chatroom__textarea"
            placeholder="Type your message here ..."
            type="text"
            autoFocus="Yes"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleInputKeyDown}
            onInput={startTyping}
            onBlur={stopTyping}
          />
          <button className="chatroom__send__btn" onClick={handleSendMessage}>
            <BiSolidSend />
          </button>

          <InputFileUpload
            ref={{
              fileInputRef,
              pictureInputRef,
              videoInputRef,
              audioInputRef,
            }}
            handleFileChange={handleFileChange}
            handlePictureChange={handlePictureChange}
            handleVideoChange={handleVideoChange}
            handleAudioChange={handleAudioChange}
          />
        </div>
      </div>
    </div>
  );
}

export default ChatRoomPage;

import React, { useEffect, useRef, useState } from "react";
import "../css/ChatRoomPage.css";

import ChatTopBar from "../components/ChatTopBar";
import UserDetail from "../components/UserDetail";
import MessageItem from "../components/MessageItem";
import FileItem from "../components/FileItem";
import PictureItem from "../components/PictureItem";
import ShowToast from "../components/ShowToast";
import InputFileUpload from "../components/InputFileUpload";
import ProgressBarComponent from "../components/ProgressBarComponent";

import { Toaster, toast } from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";

import { socket } from "../socket/ConnectSocket";
import { getFileSize } from "../helper/GetFileSize";
import { getTime } from "../helper/GetTime";

import { BiSolidSend, BiSolidMicrophone } from "react-icons/bi";
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
  const [typerID, setTyperId] = useState("");
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

  const [isMediaSending, setIsMediaSending] = useState(false);

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
    socket.on("getStartTypingEvent", (data) =>
      onGetStartTypingEvent(data, setTyperId, setIsSomeoneTyping)
    );
    socket.on("getStopTypingEvent", (data) =>
      onGetStopTypingEvent(data, setTyperId, setIsSomeoneTyping)
    );
    socket.on("disconnect", () => onDisconnectEvent(socket, setIsConnected));

    return () => {
      // CLEAN UP EVENT LISTENERS WHEN THE COMPONENT UNMOUNTS

      socket.off("connect", () => onConnectEvent(socket, setIsConnected));
      socket.off("toastEvent", (msg) => onToastEvent(msg, setMessageList));
      socket.off("errorEvent", (msg) => onErrorEvent(msg, navigate));
      socket.off("receiveMessageEvent", (data) =>
        onReceiveMessageEvent(data, setMessageList)
      );
      socket.off("receiveRoomUsersEvent", (data) =>
        onReceiveRoomUsersEvent(data, setUserList)
      );
      socket.off("getStartTypingEvent", (data) =>
        onGetStartTypingEvent(data, setTyperId, setIsSomeoneTyping)
      );
      socket.off("getStopTypingEvent", (data) =>
        onGetStopTypingEvent(data, setTyperId, setIsSomeoneTyping)
      );
      socket.off("disconnect", () => onDisconnectEvent(socket, setIsConnected));
    };
  }, []);

  const handleFileIconClick = function () {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    setIsMediaSending(true); // SET SENDING STATUS TO TRUE

    const file = e.target.files[0];
    if (file && allowedFileTypes.includes(file.type)) {
      setSelectedFile(file);

      const FILE_SIZE = getFileSize(file.size);
      const sizeDetail = FILE_SIZE.split(" ");
      if (sizeDetail[1] === "MB" && sizeDetail[0] > 50) {
        toast.error(`File size is restricted to a maximum of 50 MB.`);
        return;
      }
      const TIME = getTime(new Date());

      const data = {
        TYPE: "FILE",
        USER_NAME: USER_NAME,
        USER_ID: USER_ID,
        ROOM_CODE: ROOM_CODE,
        CONTENT: file,
        CONTENTBASE64: "",
        CONTENT_NAME: file.name,
        CONTENT_SIZE: FILE_SIZE,
        TIME: TIME,
      };

      setMessageList((prevData) => [...prevData, data]);

      socket.emit(
        "sendMessageEvent",
        onSendMessageEvent(
          "FILE",
          USER_NAME,
          USER_ID,
          ROOM_CODE,
          file,
          "",
          file.name,
          FILE_SIZE,
          TIME
        )
      );

      setSelectedFile(null); // RESET THE SELECTED FILE
    } else {
      setSelectedFile(null);
      // OPTIONALLY SHOW AN ERROR MESSAGE OR PROVIDE FEEDBACK TO THE USER.
      toast.error(
        `Invalid file type. Please select a .doc, .docx, .xml, .txt, or .pdf file. 😑`
      );
    }

    setIsMediaSending(false); // SET SENDING STATUS BACK TO FALSE
    setIsDivVisible(false);
  };

  const handlePictureIconClick = function () {
    pictureInputRef.current?.click();
  };

  const handlePictureChange = (e) => {
    setIsMediaSending(true); // SET SENDING STATUS TO TRUE

    const file = e.target.files[0];
    if (file && allowedPictureTypes.includes(file.type)) {
      const reader = new FileReader();

      reader.onloadend = () => {
        // CONVERT THE PICTURE TO BASE64 DATA BEFORE SENDING
        const base64Data = reader.result.split(",")[1];
        const FILE_SIZE = getFileSize(file.size);
        const sizeDetail = FILE_SIZE.split(" ");
        if (sizeDetail[1] === "MB" && sizeDetail[0] > 20) {
          toast.error(`Picture size is restricted to a maximum of 20 MB.`);
          return;
        }
        const TIME = getTime(new Date());

        const data = {
          TYPE: "PICTURE",
          USER_NAME: USER_NAME,
          USER_ID: USER_ID,
          ROOM_CODE: ROOM_CODE,
          CONTENT: file,
          CONTENTBASE64: base64Data,
          CONTENT_NAME: file.name,
          CONTENT_SIZE: FILE_SIZE,
          TIME: TIME,
        };

        setMessageList((prevData) => [...prevData, data]);

        // EMIT THE "PICTURE" EVENT TO THE SERVER WITH THE PICTURE DATA
        socket.emit(
          "sendMessageEvent",
          onSendMessageEvent(
            "PICTURE",
            USER_NAME,
            USER_ID,
            ROOM_CODE,
            file,
            base64Data, // SENDING THE BASE64 DATA OF THE PICTURE
            file.name,
            FILE_SIZE,
            TIME
          )
        );

        setSelectedPicture(URL.createObjectURL(file)); // RESET THE SELECTED PICTURE
      };

      reader.readAsDataURL(file);
    } else {
      setSelectedPicture(null);
      // OPTIONALLY SHOW AN ERROR MESSAGE OR PROVIDE FEEDBACK TO THE USER.
      toast.error(
        `Invalid file type. Please select an image (JPEG, PNG, SVG) or GIF file. 😑`
      );
    }

    setIsMediaSending(false); // SET SENDING STATUS BACK TO FALSE
    setIsDivVisible(false);
  };

  const handleVideoIconClick = function () {
    videoInputRef.current?.click();
  };

  const handleVideoChange = (e) => {
    setIsMediaSending(true); // SET SENDING STATUS TO TRUE

    const file = e.target.files[0];
    if (file && allowedVideoTypes.includes(file.type)) {
      setSelectedVideo(URL.createObjectURL(file));

      const FILE_SIZE = getFileSize(file.size);
      const sizeDetail = FILE_SIZE.split(" ");
      if (sizeDetail[1] === "MB" && sizeDetail[0] > 100) {
        toast.error(`Video size is restricted to a maximum of 100 MB.`);
        return;
      }
      const TIME = getTime(new Date());

      const data = {
        TYPE: "VIDEO",
        USER_NAME: USER_NAME,
        USER_ID: USER_ID,
        ROOM_CODE: ROOM_CODE,
        CONTENT: file,
        CONTENTBASE64: "",
        CONTENT_NAME: file.name,
        CONTENT_SIZE: FILE_SIZE,
        TIME: TIME,
      };

      setMessageList((prevData) => [...prevData, data]);

      socket.emit(
        "sendMessageEvent",
        onSendMessageEvent(
          "VIDEO",
          USER_NAME,
          USER_ID,
          ROOM_CODE,
          file,
          "",
          file.name,
          FILE_SIZE,
          TIME
        )
      );

      setSelectedVideo(null); // RESET THE SELECTED VIDEO
    } else {
      setSelectedVideo(null);
      // OPTIONALLY SHOW AN ERROR MESSAGE OR PROVIDE FEEDBACK TO THE USER.
      toast.error(
        `Invalid file type. Please select a video (MP4, WebM, Ogg) file. 😑`
      );
    }

    setIsMediaSending(false); // SET SENDING STATUS BACK TO FALSE
    setIsDivVisible(false);
  };

  const handleAudioIconClick = function () {
    audioInputRef.current?.click();
  };

  const handleAudioChange = (e) => {
    setIsMediaSending(true); // SET SENDING STATUS TO TRUE

    const file = e.target.files[0];
    if (file && allowedAudioTypes.includes(file.type)) {
      setSelectedAudio(URL.createObjectURL(file));

      const FILE_SIZE = getFileSize(file.size);
      const sizeDetail = FILE_SIZE.split(" ");
      if (sizeDetail[1] === "MB" && sizeDetail[0] > 50) {
        toast.error(`Audio size is restricted to a maximum of 50 MB.`);
        return;
      }
      const TIME = getTime(new Date());

      const data = {
        TYPE: "AUDIO",
        USER_NAME: USER_NAME,
        USER_ID: USER_ID,
        ROOM_CODE: ROOM_CODE,
        CONTENT: file,
        CONTENTBASE64: "",
        CONTENT_NAME: file.name,
        CONTENT_SIZE: FILE_SIZE,
        TIME: TIME,
      };

      setMessageList((prevData) => [...prevData, data]);

      socket.emit(
        "sendMessageEvent",
        onSendMessageEvent(
          "AUDIO",
          USER_NAME,
          USER_ID,
          ROOM_CODE,
          file,
          "",
          file.name,
          FILE_SIZE,
          TIME
        )
      );

      setSelectedAudio(null); // RESET THE SELECTED AUDIO
    } else {
      setSelectedAudio(null);
      // OPTIONALLY SHOW AN ERROR MESSAGE OR PROVIDE FEEDBACK TO THE USER.
      toast.error(
        `Invalid file type. Please select an audio file (MP3, Ogg, WAV, WebM) file. 😑`
      );
    }

    setIsMediaSending(false); // SET SENDING STATUS BACK TO FALSE
    setIsDivVisible(false);
  };

  const handleClipClick = function () {
    // TOGGLE CHATROOM__FLOAT__MENU DIV VISIBILITY
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
        CONTENTBASE64: "",
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
          "",
          TIME
        )
      );
      setNewMessage("");
      setIsDivVisible(false);
    }
  };

  // FUNCTION TO EMIT STARTTYPING EVENT
  const startTyping = () => {
    if (!isTyping) {
      socket.emit(
        "sendStartTypingEvent",
        onSendStartTypingEvent(USER_NAME, USER_ID, ROOM_CODE)
      );
      setIsTyping(true);
    }
  };

  // FUNCTION TO EMIT STOPTYPING EVENT
  const stopTyping = () => {
    if (isTyping) {
      socket.emit(
        "sendStopTypingEvent",
        onSendStopTypingEvent(USER_NAME, USER_ID, ROOM_CODE)
      );
      setIsTyping(false);
    }
  };

  return (
    <div className="chatroom__page">
      <Toaster position="top-center" reverseOrder={false}></Toaster>

      <div className="chatroom__menu">
        <UserDetail
          userList={userList}
          USER_ID={USER_ID}
          typerID={typerID}
          isSomeoneTyping={isSomeoneTyping}
        />
      </div>

      <div className="chatroom__contents">
        <div>
          <ChatTopBar ROOM_CODE={ROOM_CODE} />

          <div className="chatroom__box">
            {/* RENDER PROGRESS BAR WHEN SENDING MEDIA */}
            {isMediaSending && <ProgressBarComponent />}

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
                          <FileItem
                            isAuthor={
                              USER_ID === data.USER_ID ? "you" : "other"
                            }
                            data={data}
                          />
                        );

                      case "AUDIO":
                        return (
                          <FileItem
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

            <div className="chatroom__clip">
              <LuPaperclip className="clip__icon" onClick={handleClipClick} />
            </div>
          </div>

          <div className="chatroom__textarea__div">
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
          </div>

          <div className="chatroom__send">
            <BiSolidSend className="send__icon" onClick={handleSendMessage} />
          </div>

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

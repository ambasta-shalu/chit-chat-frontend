import React, { useEffect, useRef, useState } from "react";
import "../css/ChatRoomPage.css";
import ChatTopBar from "../components/ChatTopBar";
import UserDetail from "../components/UserDetail";
import MessageItem from "../components/MessageItem";
import ShowToast from "../components/ShowToast";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";
import { socket } from "../socket/ConnectSocket";
import { getTime } from "../helper/GetTime";
import { BiSolidSend } from "react-icons/bi";
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
  const scrollRef = useRef();
  const [isTyping, setIsTyping] = useState(false);
  const [typingStatus, setTypingStatus] = useState("");
  const [isSomeoneTyping, setIsSomeoneTyping] = useState(false);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
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

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() !== "") {
      socket.emit(
        "sendMessageEvent",
        onSendMessageEvent(
          USER_NAME,
          USER_ID,
          ROOM_CODE,
          newMessage,
          getTime(new Date())
        )
      );
      setNewMessage("");
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
                  <MessageItem
                    isAuthor={USER_ID === data.USER_ID ? "you" : "other"}
                    data={data}
                  />
                </div>
              ) : (
                <ShowToast key={index} data={data} />
              )
            )}
          </div>
        </div>
        <div className="chatroom__input">
          <textarea
            className="chatroom__textarea"
            placeholder="Type your message here..."
            type="text"
            autoFocus="Yes"
            wrap="hard"
            cols="50"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSendMessage(e);
              }
            }}
            onInput={startTyping}
            onBlur={stopTyping}
          />
          <button className="chatroom__send__btn" onClick={handleSendMessage}>
            <BiSolidSend />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatRoomPage;

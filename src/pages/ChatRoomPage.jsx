import React, { useEffect, useState } from "react";
import "../css/ChatRoomPage.css";
import ChatTopBar from "../components/ChatTopBar";
import RoomDetail from "../components/RoomDetail";
import UserDetail from "../components/UserDetail";
import MessageItem from "../components/MessageItem";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";
import { socket } from "../socket/ConnectSocket";
import {
  onConnectEvent,
  onDisconnectEvent,
  onJoinRoomEvent,
  onSendMessageEvent,
  onReceiveMessageEvent,
} from "../socket/SocketEvents";

function ChatRoomPage() {
  let IS_NEW_ROOM, USER_NAME, ROOM_CODE;

  const navigate = useNavigate();
  const location = useLocation();

  if (location.state === null) {
    toast.error(`Not a Auth user`);
    navigate("/");
  } else {
    IS_NEW_ROOM = location.state.IS_NEW_ROOM;
    USER_NAME = location.state.USER_NAME;
    ROOM_CODE = location.state.ROOM_CODE;
  }

  const [messageList, setMessageList] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    socket.on("connect", () => onConnectEvent(socket, setIsConnected));
    socket.emit(
      "joinRoomEvent",
      onJoinRoomEvent(IS_NEW_ROOM, USER_NAME, ROOM_CODE)
    );
    socket.on("receiveMessageEvent", () =>
      onReceiveMessageEvent(data, setMessageList)
    );
    socket.on("disconnect", () => onDisconnectEvent(socket, setIsConnected));

    return () => {
      // Clean up event listeners when the component unmounts

      socket.off("connect", () => onConnectEvent(socket, setIsConnected));
      socket.off("receiveMessageEvent", () =>
        onReceiveMessageEvent(data, setMessageList)
      );
      socket.off("disconnect", () => onDisconnectEvent(socket, setIsConnected));
    };
  }, []);

  const getTime = (date) => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    const time = hours + ":" + minutes + " " + ampm;
    return time;
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() !== "") {
      socket.emit(
        "sendMessageEvent",
        onSendMessageEvent(
          USER_NAME,
          ROOM_CODE,
          newMessage,
          getTime(new Date())
        )
      );
      setNewMessage("");
    }
  };

  return (
    <div className="chatroom__page">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <ChatTopBar />
      <div className="chatroom__contents">
        <div className="chatroom__menu">
          <RoomDetail ROOM_CODE={ROOM_CODE} />
          <UserDetail />
        </div>
        <div className="chatroom__box">
          <div className="chatroom__box__top">
            <MessageItem />
            <MessageItem />
            <MessageItem />
          </div>
          <div className="chatroom__box__bottom">
            <form onSubmit={handleSendMessage}>
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <button type="submit">Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatRoomPage;

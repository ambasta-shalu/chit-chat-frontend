import { toast } from "react-hot-toast";

export function onConnectEvent(socket, setIsConnected) {
  console.log(`a user connected having id ${socket.id}`);
  setIsConnected(true);
}

export function onDisconnectEvent(socket, setIsConnected) {
  console.log(`a user disconnected having id ${socket.id}`);
  setIsConnected(false);
}

export function onJoinRoomEvent(IS_NEW_ROOM, USER_NAME, USER_ID, ROOM_CODE) {
  return {
    IS_NEW_ROOM: IS_NEW_ROOM,
    USER_NAME: USER_NAME,
    USER_ID: USER_ID,
    ROOM_CODE: ROOM_CODE,
  };
}

export function onToastEvent(msg, setMessageList) {
  setMessageList((prevData) => [...prevData, msg]);
}

export function onErrorEvent(msg, navigate) {
  toast.error(msg);
  navigate("/");
}

export function onSendMessageEvent(
  TYPE,
  USER_NAME,
  USER_ID,
  ROOM_CODE,
  MESSAGE,
  TIME
) {
  return {
    TYPE: TYPE,
    USER_NAME: USER_NAME,
    USER_ID: USER_ID,
    ROOM_CODE: ROOM_CODE,
    MESSAGE: MESSAGE,
    TIME: TIME,
  };
}

export function onReceiveMessageEvent(data, setMessageList) {
  setMessageList((prevData) => [...prevData, data]);
}

export function onGetRoomUsersEvent(ROOM_CODE) {
  return { ROOM_CODE: ROOM_CODE };
}

export function onReceiveRoomUsersEvent(data, setUserList) {
  setUserList(data);
}

export function onSendStartTypingEvent(USER_NAME, ROOM_CODE) {
  return {
    USER_NAME: USER_NAME,
    ROOM_CODE: ROOM_CODE,
  };
}

export function onSendStopTypingEvent(USER_NAME, ROOM_CODE) {
  return {
    USER_NAME: USER_NAME,
    ROOM_CODE: ROOM_CODE,
  };
}

export function onGetStartTypingEvent(
  name,
  setTypingStatus,
  setIsSomeoneTyping
) {
  setTypingStatus(`${name} is typing ...`);
  setIsSomeoneTyping(true);
}

export function onGetStopTypingEvent(
  name,
  setTypingStatus,
  setIsSomeoneTyping
) {
  setTypingStatus(`${name} stopped typing ...`);
  setIsSomeoneTyping(false);
}

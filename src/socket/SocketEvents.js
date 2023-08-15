import { toast } from "react-hot-toast";

export function onConnectEvent(socket, setIsConnected) {
  setIsConnected(true);
}

export function onDisconnectEvent(socket, setIsConnected) {
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
  CONTENT,
  CONTENTBASE64 = "",
  CONTENT_NAME = "",
  CONTENT_SIZE = "",
  TIME
) {
  return {
    TYPE: TYPE,
    USER_NAME: USER_NAME,
    USER_ID: USER_ID,
    ROOM_CODE: ROOM_CODE,
    CONTENT: CONTENT,
    CONTENTBASE64: CONTENTBASE64,
    CONTENT_NAME: CONTENT_NAME,
    CONTENT_SIZE: CONTENT_SIZE,
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

export function onSendStartTypingEvent(USER_NAME, USER_ID, ROOM_CODE) {
  return {
    USER_NAME: USER_NAME,
    USER_ID: USER_ID,
    ROOM_CODE: ROOM_CODE,
  };
}

export function onSendStopTypingEvent(USER_NAME, USER_ID, ROOM_CODE) {
  return {
    USER_NAME: USER_NAME,
    USER_ID: USER_ID,
    ROOM_CODE: ROOM_CODE,
  };
}

export function onGetStartTypingEvent(data, setTyperId, setIsSomeoneTyping) {
  setTyperId(data.USER_ID);
  setIsSomeoneTyping(true);
}

export function onGetStopTypingEvent(data, setTyperId, setIsSomeoneTyping) {
  setTyperId(data.USER_ID);
  setIsSomeoneTyping(false);
}

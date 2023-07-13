export function onConnectEvent(socket, setIsConnected) {
  console.log(`a user connected having id ${socket.id}`);
  setIsConnected(true);
}

export function onDisconnectEvent(socket, setIsConnected) {
  console.log(`a user disconnected having id ${socket.id}`);
  setIsConnected(false);
}

export function onJoinRoomEvent(IS_NEW_ROOM, USER_NAME, ROOM_CODE) {
  return {
    IS_NEW_ROOM: IS_NEW_ROOM,
    USER_NAME: USER_NAME,
    ROOM_CODE: ROOM_CODE,
  };
}

export function onSendMessageEvent(USER_NAME, ROOM_CODE, MESSAGE, TIME) {
  return {
    USER_NAME: USER_NAME,
    ROOM_CODE: ROOM_CODE,
    MESSAGE: MESSAGE,
    TIME: TIME,
  };
}

export function onReceiveMessageEvent(data, setMessageList) {
  console.log(`${data.author} sent message ${data.message}`);
  setMessageList((prevData) => [...prevData, data]);
}

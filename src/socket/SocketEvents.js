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

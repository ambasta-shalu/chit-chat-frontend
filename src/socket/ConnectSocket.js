import { io } from "socket.io-client";
import { SERVER_DOMAIN } from "../utils/Constants";

export const socket = io(SERVER_DOMAIN);

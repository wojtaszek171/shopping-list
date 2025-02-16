import { io } from "socket.io-client";

const API_HOST = import.meta.env.VITE_API_HOST.replace(/^http/, "ws");
const socket = io(API_HOST, {
  withCredentials: true,
  transports: ["websocket"],
  autoConnect: true,
});

export default socket;

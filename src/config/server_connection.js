import { io } from "socket.io-client";
import { getApi, getNhlSocket } from "./environment";

export function socket() {
  const _socket = io(getApi(), {
    transports: ["websocket"],
    reconnection: true,
    upgrade: false,
  });
  return _socket;
}

export function socketNHL() {
  const _socket = io(getNhlSocket(), {
    transports: ["websocket"],
    reconnection: true,
    upgrade: false,
  });
  return _socket;
}

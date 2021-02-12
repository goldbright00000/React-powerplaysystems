import { io } from 'socket.io-client';
import { getApi } from './environment';

export function socket() {
    const _socket = io(getApi(), {transports: ['websocket'], reconnection: true, upgrade: false})
    return _socket
}
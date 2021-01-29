import { io } from 'socket.io-client';
import { getApi } from './environment';

export function socket() {
    const _socket = io(getApi(), {transports: ['websocket'], reconnection: true})
    return _socket
}
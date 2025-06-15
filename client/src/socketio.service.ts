import type { Socket } from 'socket.io-client'
import { io } from 'socket.io-client'
import type { ClientToServerEvents, ServerToClientEvents } from '@/types/Socketio.interface'

class SocketIOService {
  socket: Socket<ServerToClientEvents, ClientToServerEvents>
  constructor() {
    this.socket = io(import.meta.env.VITE_SOCKET_ENDPOINT || 'http://localhost:3000', {
      autoConnect: false,
    })
  }
}

export const socket = new SocketIOService().socket

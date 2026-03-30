import io from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';

export const createSocket = () => {
  const socket = io(SOCKET_URL, {
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    reconnectionAttempts: 5
  });

  return socket;
};

export const socketEvents = {
  CONNECT: 'connect',
  DISCONNECT: 'disconnect',
  GRID_SYNC: 'grid:sync',
  TILE_CLAIM: 'tile:claim',
  USER_JOIN: 'user:join',
  USER_LEAVE: 'user:leave',
  GRID_UPDATE: 'grid:update',
  STATS_UPDATE: 'stats:update',
  ERROR: 'error'
};

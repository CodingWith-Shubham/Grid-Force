import { useEffect, useRef, useCallback } from 'react';
import { createSocket, socketEvents } from '../utils/socketClient';

export const useSocket = () => {
  const socketRef = useRef(null);
  const listenerRef = useRef({});

  useEffect(() => {
    socketRef.current = createSocket();
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  const on = useCallback((event, callback) => {
    if (!socketRef.current) return;

    if (!listenerRef.current[event]) {
      listenerRef.current[event] = [];
    }
    listenerRef.current[event].push(callback);
    socketRef.current.on(event, callback);
  }, []);

  const off = useCallback((event, callback) => {
    if (!socketRef.current) return;

    socketRef.current.off(event, callback);
    if (listenerRef.current[event]) {
      listenerRef.current[event] = listenerRef.current[event].filter(
        cb => cb !== callback
      );
    }
  }, []);

  const emit = useCallback((event, data) => {
    if (!socketRef.current) return;
    socketRef.current.emit(event, data);
  }, []);

  const isConnected = () => {
    return socketRef.current && socketRef.current.connected;
  };

  return { on, off, emit, isConnected, socket: socketRef.current };
};

import { useEffect } from 'react';

/**
 * Custom hook to keep the backend alive by pinging health endpoint periodically.
 * Prevents Render/similar platforms from putting the backend to sleep due to inactivity.
 *
 * Default: pings every 10 minutes (600000ms)
 */
export const useKeepAlive = (intervalMs = 600000) => {
  useEffect(() => {
    const backendUrl = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';

    const pingBackend = async () => {
      try {
        const response = await fetch(`${backendUrl}/health`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log('[KeepAlive] Backend pinged successfully:', {
            status: data.status,
            timestamp: data.timestamp,
            connectedUsers: data.connectedUsers
          });
        } else {
          console.warn('[KeepAlive] Backend health check failed:', response.status);
        }
      } catch (error) {
        console.error('[KeepAlive] Failed to ping backend:', error.message);
      }
    };

    // Initial ping after 5 seconds (let app fully connect first)
    const timeoutId = setTimeout(() => {
      pingBackend();
    }, 5000);

    // Set up interval for periodic pings
    const intervalId = setInterval(pingBackend, intervalMs);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [intervalMs]);
};

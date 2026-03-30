import { useState, useEffect } from 'react';
import { Grid } from './components/Grid';
import { Leaderboard } from './components/Leaderboard';
import { Stats } from './components/Stats';
import { useSocket } from './hooks/useSocket';
import { useKeepAlive } from './hooks/useKeepAlive';
import { generateUserId, generateUserColor } from './utils/colors';
import { socketEvents } from './utils/socketClient';
import './styles/index.css';

const GRID_SIZE = 20;

function App() {
  const [userId, setUserId] = useState(null);
  const [userColor, setUserColor] = useState(null);
  const [gridState, setGridState] = useState([]);
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({
    onlineUsers: 0,
    totalTilesClaimed: 0
  });
  const [connectionStatus, setConnectionStatus] = useState('connecting');
  const { on, off, emit, isConnected } = useSocket();

  // Keep backend alive by pinging health endpoint every 10 minutes
  useKeepAlive(600000);

  // Initialize user
  useEffect(() => {
    const id = generateUserId();
    const color = generateUserColor(id);
    setUserId(id);
    setUserColor(color);
  }, []);

  // Set up socket event listeners
  useEffect(() => {
    if (!userId || !userColor) return;

    const handleGridSync = (data) => {
      setGridState(data.grid);
      setUsers(data.users);
      setStats({
        onlineUsers: data.users.length,
        totalTilesClaimed: data.totalTilesClaimed
      });
      setConnectionStatus('connected');
    };

    const handleGridUpdate = (data) => {
      setGridState(data.grid);
      setUsers(data.users);
      setStats({
        onlineUsers: data.users.length,
        totalTilesClaimed: data.totalTilesClaimed
      });
    };

    const handleConnect = () => {
      setConnectionStatus('connected');
      emit('user:join', { userId, userColor });
    };

    const handleDisconnect = () => {
      setConnectionStatus('disconnected');
    };

    const handleError = (error) => {
      console.error('Socket error:', error);
    };

    // Register event listeners
    on(socketEvents.GRID_SYNC, handleGridSync);
    on(socketEvents.GRID_UPDATE, handleGridUpdate);
    on(socketEvents.CONNECT, handleConnect);
    on(socketEvents.DISCONNECT, handleDisconnect);
    on(socketEvents.ERROR, handleError);

    return () => {
      off(socketEvents.GRID_SYNC, handleGridSync);
      off(socketEvents.GRID_UPDATE, handleGridUpdate);
      off(socketEvents.CONNECT, handleConnect);
      off(socketEvents.DISCONNECT, handleDisconnect);
      off(socketEvents.ERROR, handleError);
    };
  }, [userId, userColor, on, off, emit]);

  const handleTileClaim = ({ row, col }) => {
    emit(socketEvents.TILE_CLAIM, {
      userId,
      row,
      col,
      userColor
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Real-Time Collaborative Grid
              </h1>
              <p className="text-gray-600 text-sm mt-1">
                Click blocks to claim them. Multiple players can interact simultaneously.
              </p>
            </div>

            {/* Connection Status */}
            <div className="flex items-center gap-2">
              <div
                className={`w-3 h-3 rounded-full ${
                  connectionStatus === 'connected'
                    ? 'bg-green-500'
                    : connectionStatus === 'connecting'
                      ? 'bg-yellow-500'
                      : 'bg-red-500'
                }`}
              />
              <span className="text-sm font-medium text-gray-700 capitalize">
                {connectionStatus}
              </span>
            </div>
          </div>

          {/* Your Info */}
          {userId && userColor && (
            <div className="bg-white border border-gray-200 rounded-lg p-3 flex items-center gap-3">
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: userColor }}
              />
              <span className="text-sm font-medium text-gray-700">
                Your ID: {userId.substring(0, 20)}...
              </span>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="mb-6">
          <Stats
            onlineUsers={stats.onlineUsers}
            totalTilesClaimed={stats.totalTilesClaimed}
            gridSize={GRID_SIZE}
          />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Grid */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-96 flex items-center justify-center">
              {gridState.length > 0 ? (
                <Grid
                  gridState={gridState}
                  gridSize={GRID_SIZE}
                  userId={userId}
                  userColor={userColor}
                  onTileClaim={handleTileClaim}
                  scale={1}
                />
              ) : (
                <div className="text-center text-gray-500">
                  <p className="font-medium">Loading grid...</p>
                  <p className="text-sm mt-1">
                    {connectionStatus === 'connected'
                      ? 'Syncing with server...'
                      : `Status: ${connectionStatus}`}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Leaderboard
              users={users}
              currentUserId={userId}
              userColor={userColor}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

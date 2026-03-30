import { useState, useEffect } from 'react';
import { Grid } from './components/Grid';
import { Leaderboard } from './components/Leaderboard';
import { Stats } from './components/Stats';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ActivityPanel from './components/ActivityPanel';
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
  const [activities, setActivities] = useState([]);
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
      
      // Track activity
      if (data.lastActivity) {
        setActivities(prev => [
          {
            type: 'claim',
            message: 'claimed a territory',
            user: data.lastActivity.userId,
            timestamp: Date.now()
          },
          ...prev
        ].slice(0, 20));
      }
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
    <div className="min-h-screen bg-gradient-to-b from-gaming-dark via-gaming-darker to-gaming-dark overflow-x-hidden">
      {/* Navbar */}
      <Navbar
        gridSize={GRID_SIZE}
        totalBlocks={GRID_SIZE * GRID_SIZE}
        claimedBlocks={stats.totalTilesClaimed}
      />

      {/* Hero Section */}
      <Hero />

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16">
        {/* User Info & Status Bar */}
        {userId && userColor && (
          <div className="mb-8 glass rounded-lg p-4 border border-gaming-border flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div
                className="w-6 h-6 rounded-full shadow-lg"
                style={{
                  backgroundColor: userColor,
                  boxShadow: `0 0 15px ${userColor}`
                }}
              />
              <div>
                <p className="text-xs uppercase tracking-widest text-gaming-fire font-gaming">Your Identity</p>
                <p className="text-sm font-bold text-gaming-cyan font-gaming">{userId.substring(0, 16)}...</p>
              </div>
            </div>

            {/* Connection Status */}
            <div className="flex items-center gap-3">
              <div
                className={`w-2.5 h-2.5 rounded-full ${
                  connectionStatus === 'connected'
                    ? 'bg-gaming-neon animate-pulse'
                    : connectionStatus === 'connecting'
                      ? 'bg-gaming-fireAlt animate-pulse'
                      : 'bg-gaming-red'
                }`}
              />
              <span className="text-sm font-bold uppercase tracking-widest text-gaming-fire font-gaming">
                {connectionStatus === 'connected'
                  ? 'Connected'
                  : connectionStatus === 'connecting'
                    ? 'Connecting...'
                    : 'Disconnected'}
              </span>
            </div>
          </div>
        )}

        {/* Stats Section */}
        <div className="mb-8">
          <Stats
            onlineUsers={stats.onlineUsers}
            totalTilesClaimed={stats.totalTilesClaimed}
            gridSize={GRID_SIZE}
          />
        </div>

        {/* Main Grid Section */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Grid Container - 3 columns */}
          <div className="lg:col-span-3">
            <div className="glass rounded-lg border border-gaming-border overflow-hidden" style={{ height: '600px' }}>
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
                <div className="h-full flex items-center justify-center text-center">
                  <div>
                    <p className="text-gaming-fire font-gaming text-sm uppercase tracking-widest mb-2">Loading Arena...</p>
                    <p className="text-gaming-cyan text-xs">
                      {connectionStatus === 'connected'
                        ? 'Syncing battlefield...'
                        : `Status: ${connectionStatus}`}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar - 2 columns */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Leaderboard */}
            <div className="flex-1">
              <Leaderboard
                users={users}
                currentUserId={userId}
                userColor={userColor}
              />
            </div>

            {/* Activity Panel */}
            <div className="flex-1 max-h-64">
              <ActivityPanel activities={activities} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

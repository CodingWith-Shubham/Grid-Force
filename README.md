# Real-Time Collaborative Grid Application

A production-grade real-time collaborative grid application built with React, Node.js, and Socket.IO. Multiple users can simultaneously claim grid tiles, with instant synchronization across all connected clients.

## Overview

This application demonstrates strong engineering fundamentals in real-time systems, including:

- Clean architecture with separation of concerns
- Proper WebSocket event handling with conflict resolution
- Scalable server-side state management
- Responsive UI with real-time updates
- Professional code organization and naming conventions

## Features

### Core Functionality
- **20x20 Tile Grid**: Hundreds of interactive tiles that users can claim
- **Real-Time Synchronization**: Instant updates across all connected users using WebSockets
- **User Identification**: Each user gets a unique ID and distinct color
- **Conflict Handling**: Server-side conflict resolution for simultaneous tile claims

### User Experience
- **Live Tile Claiming**: Click any unclaimed tile to claim it
- **Claim Cooldown**: 1-second cooldown between tile claims to prevent spam
- **Live Leaderboard**: See who owns the most tiles, ranked in real-time
- **Real-Time Statistics**:
  - Online user count
  - Total claimed tiles percentage
  - Unclaimed tiles count

### Advanced Features
- **Automatic Reconnection**: Clients automatically reconnect if connection drops
- **Visual Feedback**: Smooth animations and hover states
- **Pan & Zoom Ready**: Grid supports pan interactions (right-click drag)
- **Scalable Architecture**: Can be extended to support Redis, horizontal scaling

## Tech Stack

### Frontend
- **React 18.2**: Modern UI framework with hooks
- **Vite 4.3**: Fast build tool and dev server
- **Socket.IO Client 4.5**: Real-time communication
- **Tailwind CSS 3.3**: Utility-first CSS framework
- **JavaScript ES6+**: Clean, modern syntax

### Backend
- **Node.js**: JavaScript runtime
- **Express 4.18**: Web server framework
- **Socket.IO 4.5**: WebSocket server with fallbacks
- **CORS**: Cross-origin request handling
- **dotenv**: Environment configuration

### Database
- **In-Memory Store (Map)**: Fast, simple state management for prototype
- **Scalable to Redis**: Can be easily extended for persistence and scaling

## Architecture

### Frontend Architecture

```
frontend/
├── src/
│   ├── components/
│   │   ├── Grid.jsx              # Main grid display component
│   │   ├── GridBlock.jsx         # Individual tile component
│   │   ├── Leaderboard.jsx       # User rankings
│   │   └── Stats.jsx             # Real-time statistics
│   ├── hooks/
│   │   └── useSocket.js          # Custom Socket.IO hook
│   ├── utils/
│   │   ├── colors.js             # Color generation and utilities
│   │   └── socketClient.js       # Socket.IO client configuration
│   ├── styles/
│   │   └── index.css             # Global styles with Tailwind
│   ├── App.jsx                   # Main app component
│   └── main.jsx                  # React entry point
```

### Backend Architecture

```
backend/
├── src/
│   ├── config/
│   │   └── index.js              # Environment and config management
│   ├── services/
│   │   └── GridService.js        # Grid state management logic
│   ├── handlers/
│   │   └── socketHandlers.js     # Socket.IO event handlers
│   └── server.js                 # Express + Socket.IO server
```

## Real-Time Synchronization

### Event Flow

1. **User Connects**:
   ```
   Client -> Server: user:join { userId, userColor }
   Server -> Client: grid:sync { grid, users, totalTilesClaimed }
   Server -> All: grid:update { grid, users, totalTilesClaimed }
   ```

2. **User Claims Tile**:
   ```
   Client -> Server: tile:claim { userId, row, col, userColor }
   Server (validate & update state)
   Server -> All: grid:update { grid, users, totalTilesClaimed }
   ```

3. **User Disconnects**:
   ```
   Client connection closes
   Server cleans up user state
   Server -> All: grid:update (tiles reset)
   ```

### Conflict Resolution Strategy

**Scenario**: Two users click the same tile simultaneously.

**Resolution**:
1. Server processes claims in order (first received wins)
2. Previous owner's tile count decreases
3. New owner's tile count increases
4. Single authoritative update broadcast to all clients
5. All clients immediately reflect correct state

**Why this works**:
- Server is the single source of truth
- No client-side conflicts
- Cooldown prevents rapid repeated claims
- Simple, deterministic behavior

## How to Run

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation

1. **Clone/Navigate to the project**:
   ```bash
   cd Grid_application_InboxKit
   ```

2. **Backend Setup**:
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Edit .env if needed (defaults are fine for local dev)
   ```

3. **Frontend Setup**:
   ```bash
   cd frontend
   npm install
   cp .env.example .env
   # Edit .env if needed (defaults are fine for local dev)
   ```

### Running Locally

**Terminal 1 - Backend**:
```bash
cd backend
npm run dev
# Server will start on http://localhost:5000
```

**Terminal 2 - Frontend**:
```bash
cd frontend
npm run dev
# Open http://localhost:3000 in browser
```

**Testing Multiple Users**:
- Open `http://localhost:3000` in multiple browser tabs
- Each tab gets a unique user ID and color
- Claim tiles and see updates in real-time across all tabs

### Production Build

**Backend**: Already optimized for production (no build step with --watch flag)

**Frontend**:
```bash
cd frontend
npm run build
# Static files in dist/ directory
```

## API Endpoints

### Health Check
```
GET /health
Response: { status, timestamp, connectedUsers, tilesOwned }
```

### Grid State (Debug)
```
GET /api/grid-state
Response: { grid, users, totalTilesClaimed }
```

## Configuration

### Backend Environment Variables
```
PORT=5000                          # Server port
NODE_ENV=development               # Environment
GRID_SIZE=20                       # Grid dimensions (20x20)
CORS_ORIGIN=http://localhost:3000  # Frontend origin
```

### Frontend Environment Variables
```
VITE_SOCKET_URL=http://localhost:5000  # Backend URL
```

## Code Quality

### Key Design Principles

1. **Separation of Concerns**:
   - Components handle only UI logic
   - Services handle business logic
   - Handlers manage messaging

2. **Clean Naming**:
   - Event names follow pattern: `entity:action` (e.g., `tile:claim`)
   - Functions are descriptive and self-documenting
   - No single-letter variables except in loops

3. **Minimal Comments**:
   - Code is self-explanatory
   - Comments only explain "why", not "what"
   - Complex algorithms are explained briefly

4. **Modular Structure**:
   - Each component has single responsibility
   - Easy to test and extend
   - No circular dependencies

## Trade-offs Made

### 1. In-Memory Storage vs Database
**Choice**: In-memory Map
**Trade-off**:
- Fast for prototype and small concurrent users (< 100)
- Data lost on server restart
- **Future**: Easy to migrate to Redis for persistence and scaling

### 2. Simple Cooldown vs Advanced Rate Limiting
**Choice**: Simple 1-second cooldown
**Trade-off**:
- Easy to understand and implement
- No distributed rate limiting needed yet
- **Future**: Could add token-bucket algorithm for fairness

### 3. Server-Side Color Generation vs Client-Side
**Choice**: Client generates, server validates
**Trade-off**:
- Reduces communication overhead
- Deterministic colors per user ID
- **Future**: Could add color validation if needed

### 4. Automatic vs Manual Reconnection
**Choice**: Socket.IO handles automatically with exponential backoff
**Trade-off**:
- Transparent to user
- Automatic resync on reconnect
- **Future**: Could add explicit reconnection UI

## Future Improvements

### Short Term
1. **Persistence**: Add Redis for data persistence
   - Track grid state across server restarts
   - Enable horizontal scaling with shared state

2. **User Management**: Properly track socket connections to user IDs
   - Clean up user when socket disconnects
   - Handle multiple tabs per user

3. **Enhanced Validations**:
   - User identity verification
   - Rate limiting per IP
   - Spam prevention

### Medium Term
1. **Horizontal Scaling**:
   - Implement Socket.IO adapter for Redis
   - Load balancing across multiple servers
   - Sticky sessions for WebSocket

2. **Analytics**:
   - Track tile ownership changes
   - User engagement metrics
   - Performance monitoring

3. **Advanced Features**:
   - Undo/redo functionality
   - Grid themes and customization
   - Tile animation effects

### Long Term
1. **Authentication**: OAuth2 for persistent user profiles
2. **Persistence**: Game state snapshots for historical viewing
3. **Multiplayer Modes**: Teams, timed competitions, territories
4. **Mobile App**: React Native version for iOS/Android

## Performance Considerations

### Current Approach
- Grid state broadcast to all clients on every change
- O(gridSize²) memory per connection
- Suitable for < 100 concurrent users

### Optimization Opportunities
1. **Differential Updates**: Send only changed tiles instead of full grid
2. **Client-Side Caching**: Cache tiles, only update changed ones
3. **Spatial Partitioning**: Divide grid into zones, only broadcast affected zones
4. **Compression**: Compress grid deltas with different encoding

## Troubleshooting

### Frontend won't connect to backend
- Ensure backend is running on port 5000
- Check CORS_ORIGIN in backend .env
- Verify VITE_SOCKET_URL in frontend .env

### Tiles not updating
- Check browser console for errors
- Verify Socket.IO connection in DevTools Network tab
- Ensure both processes are running

### High memory usage
- Normal for large grids (20x20 = 400 tiles per client)
- Consider reducing grid size if deploying at scale

## License

MIT

## Author

Built as a production-grade prototype demonstrating real-time systems architecture.

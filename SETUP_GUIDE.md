# Setup Guide - Real-Time Collaborative Grid

This guide will walk you through setting up and running the application on your local machine.

## Prerequisites

Before you start, make sure you have the following installed:

- **Node.js 16 or higher**: [Download here](https://nodejs.org/)
  - Verify installation: `node --version` and `npm --version`

## Quick Start (Easiest)

### Windows Users

1. Open Command Prompt in the project directory
2. Double-click `start.bat`
3. Two terminal windows will open automatically
4. Open your browser to `http://localhost:3000`

### macOS/Linux Users

1. Open Terminal in the project directory
2. Run: `chmod +x start.sh && ./start.sh`
3. Open your browser to `http://localhost:3000`

## Manual Setup (Step-by-Step)

If the automated scripts don't work, follow these steps:

### Step 1: Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file (optional, defaults work fine)
cp .env.example .env

# Start the backend server
npm run dev
```

You should see:
```
Server running on http://localhost:5000
Environment: development
Grid size: 20x20
CORS origin: http://localhost:3000
```

Leave this terminal running.

### Step 2: Frontend Setup

Open a **new terminal window** in the project directory:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create environment file (optional, defaults work fine)
cp .env.example .env

# Start the frontend dev server
npm run dev
```

You should see:
```
VITE v4.3.x ready in ... ms
Local: http://localhost:3000/
```

### Step 3: Open the Application

Open your browser and go to: **`http://localhost:3000`**

You should see the Real-Time Collaborative Grid application loaded.

## Testing Multiplayer

To test real-time collaboration:

1. Open `http://localhost:3000` in multiple browser tabs or windows
2. Each tab has a unique user ID (shown at the top)
3. Each user has a distinct color
4. Click tiles to claim them
5. Watch updates appear in real-time across all tabs

### Test Scenarios

1. **Simultaneous Claiming**: Two users click the same tile at the same time
   - Result: One user's claim wins, both see the update instantly

2. **Rapid Claims**: Click multiple tiles quickly
   - Result: 1-second cooldown prevents spam, then next claim proceeds

3. **Leaderboard**: See ranking update as tiles are claimed
   - Result: Leaderboard sorts by tiles owned in real-time

4. **Connection Loss**: Close browser tab while claiming
   - Result: Tiles reset when user leaves (in this version)

## Environment Configuration

### Backend (.env)

```
PORT=5000                          # Server port
NODE_ENV=development               # development or production
GRID_SIZE=20                       # Grid size (20x20 = 400 tiles)
CORS_ORIGIN=http://localhost:3000  # Frontend URL
```

### Frontend (.env)

```
VITE_SOCKET_URL=http://localhost:5000  # Backend URL
```

## Troubleshooting

### Issue: Port Already in Use

**Backend**: `Error: listen EADDRINUSE: address already in use :::5000`

**Solution**: Either:
- Kill the process using port 5000:
  ```bash
  # Windows
  netstat -ano | findstr :5000
  taskkill /PID <PID> /F

  # macOS/Linux
  lsof -i :5000
  kill -9 <PID>
  ```
- Or change PORT in `.env`

**Frontend**: `Port 3000 is in use`

**Solution**: Run with different port:
```bash
npm run dev -- --port 3001
```

### Issue: Frontend Can't Connect to Backend

**Error**: "Disconnected" status in UI

**Solution**:
1. Ensure backend is running: Check `http://localhost:5000/health`
2. Check CORS settings in `backend/.env` (should be `http://localhost:3000`)
3. Check VITE_SOCKET_URL in `frontend/.env` (should be `http://localhost:5000`)
4. Both must be running on the correct ports

### Issue: "Module not found" Error

**Solution**: Reinstall dependencies:
```bash
# For backend
cd backend && rm -rf node_modules && npm install

# For frontend
cd frontend && rm -rf node_modules && npm install
```

### Issue: Dependencies Won't Install

**Solution**: Clear npm cache:
```bash
npm cache clean --force
npm install
```

## Monitoring

### Backend Health Check

To verify backend is running, visit:
```
http://localhost:5000/health
```

Expected response:
```json
{
  "status": "ok",
  "timestamp": "2026-03-29T...",
  "connectedUsers": 0,
  "tilesOwned": 0
}
```

### Grid State (Debug)

To see current grid state:
```
http://localhost:5000/api/grid-state
```

This returns the complete grid, all users, and stats.

## Development Commands

### Backend

```bash
cd backend

# Development with auto-reload
npm run dev

# Production (no watch)
npm start
```

### Frontend

```bash
cd frontend

# Development server (with hot reload)
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

## Production Deployment

### Build Frontend
```bash
cd frontend
npm run build
```
- Output in `frontend/dist/` directory
- Deploy these files to your web server

### Backend
```bash
cd backend
NODE_ENV=production npm start
```

### Environment for Production
Set production environment variables:
```
PORT=5000
NODE_ENV=production
CORS_ORIGIN=https://yourdomain.com
GRID_SIZE=32  # Larger grid if desired
```

## Next Steps

After successfully running the application:

1. **Explore the Code**: Check the architecture documentation in `README.md`
2. **Modify Grid Size**: Change `GRID_SIZE` in backend `.env` (requires restart)
3. **Customize Colors**: Edit `frontend/src/utils/colors.js`
4. **Add Features**: See "Future Improvements" in `README.md`

## Support

If you encounter any issues:

1. Check this troubleshooting guide
2. Review the README.md for architecture details
3. Check browser console for errors (F12 in browser)
4. Check terminal output for backend errors

## Important Files

- `README.md` - Full project documentation and architecture
- `backend/src/server.js` - Main backend entry point
- `backend/src/services/GridService.js` - Grid state management
- `frontend/src/App.jsx` - Main React component
- `frontend/src/components/Grid.jsx` - Grid display component

Good luck, and enjoy building!

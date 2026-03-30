import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { config } from './config/index.js';
import GridService from './services/GridService.js';
import { registerSocketHandlers } from './handlers/socketHandlers.js';

const app = express();
const httpServer = createServer(app);

// CORS configuration for Socket.IO
const io = new Server(httpServer, {
  cors: {
    origin: config.corsOrigin,
    methods: ['GET', 'POST']
  }
});

// Middleware
// app.use(cors({ origin: config.corsOrigin }));
app.use(cors({
  origin: "*"
}));
app.use(express.json());
// const cors = require("cors");

// Initialize Grid Service
const gridService = new GridService(config.gridSize);

// Register Socket.IO handlers
registerSocketHandlers(io, gridService);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    connectedUsers: gridService.users.size,
    tilesOwned: gridService.getTotalTilesClaimed()
  });
});

// Grid state endpoint (for debugging)
app.get('/api/grid-state', (req, res) => {
  res.json(gridService.getBroadcastState());
});

// Start server
const PORT = config.port;
httpServer.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Environment: ${config.nodeEnv}`);
  console.log(`Grid size: ${config.gridSize}x${config.gridSize}`);
  console.log(`CORS origin: ${config.corsOrigin}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('Shutting down server...');
  httpServer.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

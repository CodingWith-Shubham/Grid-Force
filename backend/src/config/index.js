import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  gridSize: parseInt(process.env.GRID_SIZE || '20', 10),
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  tileClaimCooldown: 1000 // milliseconds
};

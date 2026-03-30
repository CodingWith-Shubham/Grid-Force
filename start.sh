#!/bin/bash

# Real-Time Collaborative Grid - Local Development Startup Script

echo "Real-Time Collaborative Grid"
echo "============================="
echo ""

# Check if Node is installed
if ! command -v node &> /dev/null; then
    echo "ERROR: Node.js is not installed"
    exit 1
fi

echo "Starting backend and frontend..."
echo ""
echo "Backend will run on: http://localhost:5000"
echo "Frontend will run on: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop both processes"
echo ""

# Start backend in background
cd "$(dirname "$0")"
cd backend
npm run dev &
BACKEND_PID=$!

# Wait for backend to start
sleep 2

# Start frontend
cd ..
cd frontend
npm run dev &
FRONTEND_PID=$!

# Wait for both processes
wait $BACKEND_PID $FRONTEND_PID

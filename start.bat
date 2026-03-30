@echo off
REM Real-Time Collaborative Grid - Local Development Startup Script

echo Real-Time Collaborative Grid
echo =============================
echo.

REM Check if Node is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Node.js is not installed or not in PATH
    pause
    exit /b 1
)

echo Starting backend and frontend...
echo.
echo Backend will run on: http://localhost:5000
echo Frontend will run on: http://localhost:3000
echo.
echo Press Ctrl+C to stop both processes
echo.

REM Start backend in a new window
start "Grid App - Backend" cmd /k "cd backend && npm run dev"

REM Wait a moment for backend to start
timeout /t 2 /nobreak

REM Start frontend in a new window
start "Grid App - Frontend" cmd /k "cd frontend && npm run dev"

echo Both processes started. Check the new terminal windows.
echo.
pause

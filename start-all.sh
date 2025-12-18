#!/bin/bash

# Frontend and Backend Quick Start Script

echo ""
echo "========================================"
echo "Greetins - Frontend & Backend Startup"
echo "========================================"
echo ""

# Start Backend
echo ""
echo "Starting Backend (FastAPI) on port 8000..."
echo ""
cd fastapi_app
uvicorn app.main:app --reload --port 8000 &
BACKEND_PID=$!

# Wait a moment for backend to start
sleep 3

# Start Frontend
echo ""
echo "Starting Frontend (React) on port 3000..."
echo ""
cd ../frontend
npm start &
FRONTEND_PID=$!

echo ""
echo "========================================"
echo "Both services are starting..."
echo "Backend: http://localhost:8000"
echo "Frontend: http://localhost:3000"
echo "========================================"
echo ""

# Keep the script running
wait

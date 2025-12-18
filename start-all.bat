@echo off
REM Frontend and Backend Quick Start Script

echo.
echo ========================================
echo Greetins - Frontend & Backend Startup
echo ========================================
echo.

REM Check if required ports are available
echo Checking prerequisites...

REM Start Backend
echo.
echo Starting Backend (FastAPI) on port 8000...
echo.
cd fastapi_app
start cmd /k "python -m uvicorn app.main:app --reload --host 127.0.0.1 --port 8000"

REM Wait a moment for backend to start
timeout /t 3 /nobreak

REM Start Frontend
echo.
echo Starting Frontend (React) on port 3000...
echo.
cd ..\frontend
start cmd /k "npm start"

echo.
echo ========================================
echo Both services are starting...
echo Backend: http://localhost:8000
echo Frontend: http://localhost:3000
echo ========================================
echo.

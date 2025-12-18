@echo off
REM Start FastAPI Backend
title FastAPI Backend - Port 8000
cd /d "%~dp0fastapi_app"
echo.
echo ====================================================
echo Starting FastAPI Backend...
echo Port: 8000
echo Frontend Port: 5176 (allowed)
echo Database: PostgreSQL (Neon)
echo ====================================================
echo.
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
echo.
echo Press CTRL+C to stop the backend
pause

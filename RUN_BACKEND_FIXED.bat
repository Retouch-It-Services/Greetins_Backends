@echo off
title Greetins Backend - Port 8000
cd /d "%~dp0fastapi_app"

echo.
echo ========================================
echo GREETINS BACKEND STARTER
echo ========================================
echo Port: 8000
echo Using: app_simple.py (in-memory database)
echo.
echo Starting backend...
echo.

:restart
python -m uvicorn app_simple:app --host 0.0.0.0 --port 8000 --reload
timeout /t 2
goto restart

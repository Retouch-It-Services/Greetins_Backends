@echo off
title Greetins Backend Server
cd /d "%~dp0fastapi_app"

cls
echo.
echo ===============================================
echo   GREETINS BACKEND SERVER
echo ===============================================
echo   Backend Port: 8000
echo   Frontend Port: 3000
echo.
echo   Starting...
echo ===============================================
echo.

python simple_server.py
pause

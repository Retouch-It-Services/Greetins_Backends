@echo off
title Greetins Backend - Port 8001
cd /d "%~dp0fastapi_app"

echo.
echo ========================================
echo GREETINS BACKEND
echo ========================================
echo.
echo Starting on PORT: 8001
echo (Frontend configured for: localhost:3000)
echo.

python simple_server.py

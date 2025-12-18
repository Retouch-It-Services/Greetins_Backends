@echo off
echo Starting Greetins Backend Server...
echo.
cd /d "%~dp0fastapi_app"
echo Installing dependencies...
pip install -r ../requirements.txt
echo.
echo Starting server on http://localhost:8000...
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
pause

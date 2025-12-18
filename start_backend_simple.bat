@echo off
cd /d "c:\Users\user\Documents\GitHub\Greetins_Backends\fastapi_app"
echo Starting FastAPI Backend on Port 8000...
echo.
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload

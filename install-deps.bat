@echo off
echo Installing Python dependencies...
echo.
pip install fastapi uvicorn sqlalchemy pydantic python-dotenv google-generativeai pyyaml requests beautifulsoup4 psycopg2-binary alembic
echo.
echo Dependencies installed successfully!
pause

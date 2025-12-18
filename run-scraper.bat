@echo off
REM ============================================
REM Zedge Image Scraper Runner for Windows
REM ============================================

echo.
echo ===================================================
echo 🎨  Zedge Image Scraper for Greetins
echo ===================================================
echo.

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Python is not installed or not in PATH
    echo Please install Python first
    pause
    exit /b 1
)

echo ✅ Python found

REM Change to fastapi_app directory
cd /d "%~dp0\fastapi_app"

echo.
echo 📦 Installing/updating required packages...
pip install requests beautifulsoup4 -q

echo.
echo 🚀 Starting image scraper...
echo.

REM Run the scraper
python run_scraper.py

echo.
echo ===================================================
if errorlevel 1 (
    echo ❌ Scraper encountered an error
    echo Please check the output above
) else (
    echo ✅ Scraper completed successfully!
    echo 🎨 Check your frontend to see the new images
)
echo ===================================================
echo.

pause

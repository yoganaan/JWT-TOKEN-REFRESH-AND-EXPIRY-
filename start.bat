@echo off
echo ========================================
echo JWT Authentication MERN Stack App
echo ========================================
echo.

echo Checking MongoDB...
sc query MongoDB >nul 2>&1
if %errorlevel% equ 0 (
    echo ✓ MongoDB is installed
    sc query MongoDB | find "RUNNING" >nul
    if %errorlevel% equ 0 (
        echo ✓ MongoDB is running
    ) else (
        echo ! MongoDB is not running
        echo Starting MongoDB...
        net start MongoDB
    )
) else (
    echo X MongoDB is not installed
    echo.
    echo Please install MongoDB from:
    echo https://www.mongodb.com/try/download/community
    echo.
    echo Or use MongoDB Atlas (cloud):
    echo See MONGODB_SETUP.md for instructions
    echo.
)

echo.
echo ========================================
echo Starting Application...
echo ========================================
echo.

echo Starting Backend Server...
start "Backend Server" cmd /k "cd /d "%~dp0backend" && npm run dev"

timeout /t 3 /nobreak >nul

echo Starting Frontend Server...
start "Frontend Server" cmd /k "cd /d "%~dp0frontend" && npm run dev"

timeout /t 5 /nobreak >nul

echo.
echo ========================================
echo Application Started!
echo ========================================
echo.
echo Backend:  http://localhost:5000
echo Frontend: http://localhost:5173
echo.
echo Opening browser...
timeout /t 2 /nobreak >nul
start http://localhost:5173
echo.
echo You can close this window now.
echo The servers are running in separate windows.
echo.
pause

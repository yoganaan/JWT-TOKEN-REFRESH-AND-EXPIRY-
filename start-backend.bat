@echo off
echo ========================================
echo Starting Backend Server
echo ========================================
echo.

cd backend
echo Current directory: %CD%
echo.

if not exist node_modules (
    echo Installing dependencies...
    call npm install
    echo.
)

echo Starting server with nodemon...
call npm run dev

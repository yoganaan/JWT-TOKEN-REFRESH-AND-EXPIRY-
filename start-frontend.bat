@echo off
echo ========================================
echo Starting Frontend Server
echo ========================================
echo.

cd frontend
echo Current directory: %CD%
echo.

if not exist node_modules (
    echo Installing dependencies...
    call npm install
    echo.
)

echo Starting Vite dev server...
call npm run dev

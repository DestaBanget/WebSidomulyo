@echo off
echo Testing Struktur Organisasi API after update...
echo.

REM Check if Node.js is available
node --version >nul 2>&1
if errorlevel 1 (
    echo Error: Node.js not found in PATH
    echo Please make sure Node.js is installed
    pause
    exit /b 1
)

REM Check if axios is installed
node -e "require('axios')" >nul 2>&1
if errorlevel 1 (
    echo Installing axios...
    npm install axios
)

REM Run the test
echo Running test...
node test-struktur-updated.js

echo.
echo Test completed!
pause 
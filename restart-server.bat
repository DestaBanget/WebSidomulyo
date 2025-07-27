@echo off
echo ========================================
echo    WebSidomulyo Server Restart
echo ========================================
echo.

echo [1/4] Stopping existing server...
taskkill /f /im node.exe 2>nul
timeout /t 2 /nobreak >nul

echo [2/4] Clearing Node.js cache...
cd backend
if exist node_modules\.cache rmdir /s /q node_modules\.cache

echo [3/4] Starting server with new configuration...
set NODE_OPTIONS=--max-old-space-size=4096
start "WebSidomulyo Backend" cmd /k "npm start"

echo [4/4] Waiting for server to start...
timeout /t 5 /nobreak >nul

echo.
echo ========================================
echo    Server restarted successfully!
echo ========================================
echo.
echo New configuration applied:
echo - Request size limit: 500MB
echo - File upload limit: 500MB per file
echo - Max files: 50 files
echo - Timeout: 15 minutes for uploads
echo.
echo Server should be running on: http://localhost:5000
echo Health check: http://localhost:5000/api/health
echo.
pause 
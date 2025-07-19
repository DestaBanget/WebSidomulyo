@echo off
echo Clearing localStorage and restarting application...

echo.
echo Step 1: Clear localStorage in browser
echo Please open browser developer tools (F12) and run:
echo localStorage.clear();
echo.
echo Step 2: Restart backend server
cd backend
taskkill /f /im node.exe 2>nul
npm start
echo.
echo Step 3: Restart frontend server
cd ../frontend
taskkill /f /im node.exe 2>nul
npm run dev
echo.
echo Application restarted! Please refresh your browser.
pause 
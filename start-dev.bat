@echo off
echo ====================================================
echo    Starting WebSidomulyo Development Server
echo ====================================================
echo.

echo [1/4] Setting up environment...
if not exist "backend\.env" (
    echo Creating backend .env file...
    copy "backend\env.default" "backend\.env"
    echo ✓ Backend .env file created
) else (
    echo ✓ Backend .env file already exists
)

if not exist "frontend\.env" (
    echo Creating frontend .env file...
    echo VITE_API_BASE_URL=http://localhost:5000/api > frontend\.env
    echo VITE_APP_NAME=WebSidomulyo >> frontend\.env
    echo ✓ Frontend .env file created
) else (
    echo ✓ Frontend .env file already exists
)

echo.
echo [2/4] Creating uploads directory...
if not exist "backend\uploads" (
    mkdir "backend\uploads"
    echo ✓ Uploads directory created
) else (
    echo ✓ Uploads directory already exists
)

echo.
echo [3/4] Checking database connection...
echo ⚠️  Make sure MySQL is running and database is set up
echo    You can run database_setup.sql in MySQL to create the database

echo.
echo [4/4] Starting development servers...
echo.
echo Starting backend and frontend simultaneously...
echo Backend will run on: http://localhost:5000
echo Frontend will run on: http://localhost:5173
echo.
echo Press Ctrl+C to stop both servers
echo.

npm run dev 
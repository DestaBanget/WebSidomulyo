@echo off
echo ====================================================
echo    Setup WebSidomulyo - Website Desa Sidomulyo
echo ====================================================
echo.

echo [1/6] Checking Node.js installation...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js tidak ditemukan!
    echo Silakan install Node.js dari https://nodejs.org/
    pause
    exit /b 1
)
echo ✓ Node.js terinstall

echo.
echo [2/6] Checking MySQL installation...
mysql --version >nul 2>&1
if %errorlevel% neq 0 (
    echo WARNING: MySQL tidak ditemukan di PATH!
    echo Pastikan MySQL sudah terinstall dan berjalan
    echo Anda bisa skip ini jika MySQL sudah terinstall
)

echo.
echo [3/6] Installing dependencies...
echo Installing root dependencies...
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Gagal install root dependencies
    pause
    exit /b 1
)

echo Installing backend dependencies...
cd backend
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Gagal install backend dependencies
    pause
    exit /b 1
)
cd ..

echo Installing frontend dependencies...
cd frontend
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Gagal install frontend dependencies
    pause
    exit /b 1
)
cd ..

echo.
echo [4/6] Setting up environment files...
if not exist "backend\.env" (
    echo Creating backend .env file...
    copy "backend\env.example" "backend\.env"
    echo ✓ Backend .env file created
    echo ⚠️  Please edit backend\.env with your database credentials
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
echo [5/6] Creating uploads directory...
if not exist "backend\uploads" (
    mkdir "backend\uploads"
    echo ✓ Uploads directory created
) else (
    echo ✓ Uploads directory already exists
)

echo.
echo [6/6] Setup completed!
echo.
echo ====================================================
echo    NEXT STEPS:
echo ====================================================
echo.
echo 1. Setup Database:
echo    - Buka MySQL dan jalankan file database_setup.sql
echo    - Atau copy isi file database_setup.sql ke MySQL client
echo.
echo 2. Configure Environment:
echo    - Edit backend\.env dengan kredensial database Anda
echo    - Pastikan MySQL berjalan
echo.
echo 3. Run Application:
echo    - Untuk development: npm run dev
echo    - Untuk backend saja: npm run dev:backend
echo    - Untuk frontend saja: npm run dev:frontend
echo.
echo 4. Access Application:
echo    - Frontend: http://localhost:5173
echo    - Backend API: http://localhost:5000/api
echo.
echo 5. Default Login:
echo    - Admin: username=admin, password=password
echo.
echo ====================================================
echo.
pause 
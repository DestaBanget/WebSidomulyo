@echo off
echo ====================================================
echo    Setup Database WebSidomulyo
echo ====================================================
echo.

echo [1/3] Checking MySQL installation...
mysql --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: MySQL tidak ditemukan!
    echo Silakan install MySQL terlebih dahulu
    echo Download dari: https://dev.mysql.com/downloads/mysql/
    pause
    exit /b 1
)
echo ✓ MySQL terinstall

echo.
echo [2/3] Creating database and tables...
echo ⚠️  Masukkan password MySQL root Anda (jika ada)
echo    Jika tidak ada password, tekan Enter saja
echo.

mysql -u root -p < database_simple.sql
if %errorlevel% neq 0 (
    echo.
    echo ERROR: Gagal membuat database!
    echo.
    echo Kemungkinan penyebab:
    echo 1. Password MySQL salah
    echo 2. MySQL tidak berjalan
    echo 3. User root tidak memiliki privilege
    echo.
    echo Solusi:
    echo 1. Pastikan MySQL berjalan
    echo 2. Coba tanpa password: mysql -u root < database_simple.sql
    echo 3. Atau buat user baru dengan privilege penuh
    pause
    exit /b 1
)

echo.
echo [3/3] Database setup completed!
echo.
echo ====================================================
echo    DATABASE READY!
echo ====================================================
echo.
echo Database: websidomulyo
echo Admin user: admin
echo Admin password: password
echo.
echo Next steps:
echo 1. Edit backend\.env dengan kredensial database
echo 2. Jalankan: npm run dev
echo.
pause 
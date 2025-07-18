@echo off
echo ====================================================
echo    Reset Database WebSidomulyo
echo ====================================================
echo.

echo ⚠️  PERINGATAN: Script ini akan menghapus database websidomulyo
echo    dan membuat ulang dari awal. Semua data akan hilang!
echo.
set /p confirm="Apakah Anda yakin ingin melanjutkan? (y/N): "

if /i not "%confirm%"=="y" (
    echo.
    echo Operasi dibatalkan.
    pause
    exit /b 0
)

echo.
echo [1/3] Dropping existing database...
mysql -u root -p -e "DROP DATABASE IF EXISTS websidomulyo;"
if %errorlevel% neq 0 (
    echo ERROR: Gagal menghapus database!
    echo Pastikan MySQL berjalan dan kredensial benar.
    pause
    exit /b 1
)
echo ✓ Database lama berhasil dihapus

echo.
echo [2/3] Creating new database with fixed schema...
mysql -u root -p < database_fixed.sql
if %errorlevel% neq 0 (
    echo ERROR: Gagal membuat database baru!
    pause
    exit /b 1
)
echo ✓ Database baru berhasil dibuat

echo.
echo [3/3] Verifying database setup...
mysql -u root -p -e "USE websidomulyo; SHOW TABLES; SELECT COUNT(*) as total_users FROM users; SELECT COUNT(*) as total_statistik FROM statistik;"
if %errorlevel% neq 0 (
    echo ERROR: Gagal verifikasi database!
    pause
    exit /b 1
)

echo.
echo ====================================================
echo    DATABASE RESET BERHASIL!
echo ====================================================
echo.
echo Database: websidomulyo
echo Admin user: admin
echo Admin password: password
echo.
echo Next steps:
echo 1. Jalankan: npm run dev
echo 2. Test login dengan admin/password
echo.
pause 